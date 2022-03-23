const passport = require("passport");

const passportConfig = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());
    

    require('./local.js')(passport);

    //Serializacion, guarda solo el el id y cuando necesita los Deserealizas para que vote el objeto con el usuario

    //Serializacion
    passport.serializeUser(function (user, done) {
        done(null, user);

    });

    //Deseralizacion
    passport.deserializeUser(function (user, done) {
        done(null, user)
    });

};

module.exports = passportConfig;