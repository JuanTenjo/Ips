const {registerQueriesUser, updateQueriesUser, queriesUsers, showQueriesUsers,getTipoConsulta,getPaciente,getUsuario,getFormula,getExamens} = require('../controllers/queries.controller');
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
//Obtener los Roles
router.get('/get_tipo_consulta',getTipoConsulta);
//Obtener los Roles
router.get('/get_paciente',getPaciente);
//Obtener los Roles
router.get('/get_usuario',getUsuario);
//Obtener los Roles
router.get('/get_formula',getFormula);
//Obtener examenes
router.get('/get_examen', getExamens);
module.exports = router;