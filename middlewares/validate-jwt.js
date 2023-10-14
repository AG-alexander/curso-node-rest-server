const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');



const validateJWT = async(req = request, res = response, next) => {
    const { atoken } = req.headers;


    if (!atoken) {
        throw new Error(`Token no presente en los headers`);
    }
    
    try {

        //  validar token
        const validToken = jwt.verify(atoken, process.env.SECRETORPUBLICKEY);

        //  buscar usuario del token
        const user = await User.findOne({_id:validToken.uid});

        //  validar usuario
        if(!user) {
            return res.status(401).json({
                msg: 'token no valido'
            })
        }
        //  usuario activo
        if(!user.state) {
            return res.status(401).json({
                msg: 'usuario no activo'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }

}

module.exports = {
    validateJWT
}