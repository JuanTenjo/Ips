const {registerUser, updateUser, deleteUser, users, roles} = require('../controllers/user.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar Usuario 
router.post('/register', registerUser);

//Actualizar Usuarrio
router.put('/update', passport.authenticate('jwt', { session: false }), updateUser);

//Eliminar Usuario
router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteUser);

//Traer Usuarios
router.get('/', passport.authenticate('jwt', { session: false }), users);

//Traer Roles
router.get('/roles', passport.authenticate('jwt', { session: false }), roles);

module.exports = router;