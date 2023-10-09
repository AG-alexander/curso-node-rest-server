const Role = require("../models/role")

const validateRole = async(role) => {
    const roleExists = await Role.findOne({role: role});
    if(!roleExists) {
        throw new Error(`Role ${role} does not exists`);
    }
}

module.exports = {
    validateRole
}