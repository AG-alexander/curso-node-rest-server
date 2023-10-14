const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        //  verificar email existe
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //  si el usuario esta activo
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //  verificar contrase;a
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - contrasenna'
            });
        }
        //generar jwt
        const token = await generarJWT(user.id);
        // const {_id:uid, ...userAux} = user.toJSON();
        // const userResponse = {uid, ...userAux};
        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json('Algo salio mal');
    }
}

const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, picture, email } = await googleVerify(id_token);

        let user = await User.findOne({email});

        if (!user) {
            //  Crear Usuario
            const data = {
                name,
                img: picture,
                email,
                password: ':p',
                role: 'USER_ROLE',
                google: true
            }
            user = new User(data);
            await user.save();
        }

        if (!user.state) {
            //  Usuario bloqueado
            return res.status(401).json({
                msg: 'El usuario esta bloqueado'
            });
        }

        //  generar JWT
        const token = await generarJWT(user.id);

        res.json({
           user,
           token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'El token no se pudo verificar'
        });
    }




}

module.exports = { login, googleSignIn }