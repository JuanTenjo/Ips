const {login,register,getinfotoken} = require('../controllers/auth.controller');
const passport  = require('passport');


const router = require('express').Router();

// Inciar Sesion
router.post('/login', login);
       
//Traer Usuario
router.get('/getinfotoken',
    passport.authenticate('jwt', { session: false }),
    getinfotoken);


module.exports = router;