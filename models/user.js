// {
//     name: '',
//     email: '',
//     password: '',
//     img: '',
//     rol: '',
//     state: true/false,
//     google: true/false
// }

const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required:[true, 'Name is required']
        },
        email: {
            type: String,
            required:[true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required:[true, 'Password is required']
        },
        img: String,
        role: {
            type: String,
            required:true,
            emun: ['ADMIN_ROLE', 'USER_ROLE']
        },
        state: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        }
    }
);

UserSchema.methods.toJSON = function () {
    const {__v, password, ...user} = this.toObject();
    return user;
}
const User = model('User', UserSchema);

module.exports = User;