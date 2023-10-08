const {response, request} = require('express');

const userGet = (req, res = response) => {
    const {p, name, galleta='vainilla'} = req.query;
    res.json({
        ok: true,
        p,
        name,
        galleta
    });
}

const userPost = (req = request, res = response) => {
    const {msg} = req.body;
    res.json({
        ok: true,
        msg: `post: data from bady is ${msg}`
    });
}

const userPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        ok: true,
        msg: id
    });
}

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete'
    });
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
    userPatch
}