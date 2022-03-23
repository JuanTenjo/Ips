
const { Strategy, ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('../config/keyJWT');
const {findUserById} = require('../models/validation.models')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

module.exports = new Strategy(options, async (payload, done) => {
    try {
        //console.log(payload);
        const user = await findUserById(payload);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log("Passport" + error);
    }
});