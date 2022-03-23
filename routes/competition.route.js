const {register, update, erase, competition, Detallecompetition} = require('../controllers/competition.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar  
router.post('/register',passport.authenticate('jwt', { session: false }), register);

//Actualizar 
router.put('/update', passport.authenticate('jwt', { session: false }), update);

//Eliminar 
router.delete('/delete', passport.authenticate('jwt', { session: false }), erase);


//Traer 
router.get('/', passport.authenticate('jwt', { session: false }), competition);

//Traer Detalle Strategia
router.get('/detalleCompetencia/:IdCompetition', passport.authenticate('jwt', { session: false }), Detallecompetition);



module.exports = router;