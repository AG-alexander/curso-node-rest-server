const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '360000'

        }, (err, token) => {
            if (err) {
                reject(err);
            }

            resolve(token);
        });
    });

}

module.exports = {
    generarJWT
}