const {registerPaciente,getPaciente,updatePaciente,updateStatePaciente} = require('../controllers/paciente.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar Paciente
router.post('/register_paciente', passport.authenticate('jwt', { session: false }), registerPaciente);

router.get('/', passport.authenticate('jwt', { session: false }), getPaciente);
//Actualizar Paciente
router.post('/update_paciente', passport.authenticate('jwt', { session: false }), updatePaciente);
router.post('/update_state_paciente', passport.authenticate('jwt', { session: false }), updateStatePaciente);
/* 
//Eliminar Usuario
router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteUser);

//Traer Usuarios
router.get('/', passport.authenticate('jwt', { session: false }), users);

//Traer Roles
router.get('/roles', passport.authenticate('jwt', { session: false }), roles); */

module.exports = router;