const { response, request } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const userGet = (req, res = response) => {
    const { p, name, galleta = 'vainilla' } = req.query;
    res.json({
        ok: true,
        p,
        name,
        galleta
    });
}

const usersGet = async (req, res = response) => {
    const { limit = 5, since = 0 } = req.query;

    const [users, total] = await Promise.all([
        User.find({ state: true }).skip(Number(since)).limit(Number(limit)),
        User.countDocuments({ state: true })
    ]);
    res.json({
        total,
        users
    });
}

const userPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;

    const newUser = new User({
        name, email, password, role
    });

    //  validar email


    //  encriptar password

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    res.json({
        ok: true,
        user: newUser
    });
}

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { password, google, _id, ...rest } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });
    console.log(user);
    res.json({
        ok: true,
        user
    });
}

const userDelete = async(req, res = response) => {
    const { id } = req.params;

    //  Delete: phisic deleted from db

    // const deletedUser = await User.findByIdAndDelete(id);

     //  Delete: logical deteled from db
    const deletedUser = await User.findByIdAndUpdate(id, {state: false}, { new: true });

    res.json({deletedUser});
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch,
    usersGet
}