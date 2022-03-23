const bcrypt  = require('bcrypt');

module.exports = {
    encrypt : async function (password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    
    comparePassword : async function (password, passwordBd) {
        return password && passwordBd ? await bcrypt.compare(password, passwordBd) : false;
    }
}


