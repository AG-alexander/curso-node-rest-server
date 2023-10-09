const Role = require("../models/role")
const User = require('../models/user');

const validateRole = async(role) => {
    const roleExists = await Role.findOne({role: role});
    if(!roleExists) {
        throw new Error(`Role ${role} does not exist`);
    }
}

const validateEmail = async(email) => {
    const emailExist = await User.findOne({email});

    if(emailExist) {
        throw new Error('Email is already registered');
    }
}

const userByIdExists = async(id) => {
    const userExist = await User.findById(id);

    if(!userExist) {
        throw new Error('User does not exist');
    }
}
module.exports = {
    validateRole,
    validateEmail,
    userByIdExists,
}