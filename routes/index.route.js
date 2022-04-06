const router = require('express').Router();
const AuthRoutes = require('./auth.route');
const UserRoutes = require('./user.route');
const PacienteRoutes = require('./paciente.route');
const CompetitionRoutes = require('./competition.route');
const queries = require('./queries.route');

router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/paciente', PacienteRoutes);
router.use('/competition', CompetitionRoutes);
router.use('/queries', queries)
 
module.exports = router;