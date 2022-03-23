const localStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcrypt');
const {findOne} = require('../../controllers/auth.controller');

const local =  async function(passport) {

    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        },
        async function(username,password,done){

            const user = await findOne(username);

            if(user.error) throw user.error;

            if(!user) return done(null,false);

            let compare = bcryptjs.compareSync(password, user.password);

            if(compare){
                return done(null,user);
            }else{
                return done(null,false);
            }

        }
    ));
};

module.exports = local;