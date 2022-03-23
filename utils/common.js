
const jwt  = require('jsonwebtoken');
const { jwtSecret } = require('../config/keyJWT');

module.exports = {
    createToken : function (user) {
        return jwt.sign({ id: user.id, username: user.usuario, email: user.email }, jwtSecret);
    }
}