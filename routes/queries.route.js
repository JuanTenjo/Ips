const {registerQueriesUser, updateQueriesUser, queriesUsers, showQueriesUsers} = require('../controllers/queries.controller');
const passport  = require('passport');

const router = require('express').Router();

//Registrar Consulta de Usuario 
router.post('/register',passport.authenticate('jwt', { session: false }), registerQueriesUser);

//Actualizar Consulta de Usuarrio
router.put('/update', passport.authenticate('jwt', { session: false }), updateQueriesUser);

//Traer las consultas de usuario
router.get('/', passport.authenticate('jwt', { session: false }), queriesUsers);

//Traer la consulta seleccionado del usuario
router.get('/edit', passport.authenticate('jwt', { session: false }), showQueriesUsers);

module.exports = router;