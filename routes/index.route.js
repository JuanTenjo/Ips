const router = require('express').Router();
const AuthRoutes = require('./auth.route');
const UserRoutes = require('./user.route');
const LeagueRoutes = require('./league.route');
const TeamRoutes = require('./team.route');
const CompetitionRoutes = require('./competition.route');
const parleyRoutes = require('./parley.route');
const CountryRoutes = require('./country.route');
const strategiesRoutes = require('./strategies.route');

router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/league', LeagueRoutes);
router.use('/team', TeamRoutes);
router.use('/competition', CompetitionRoutes);
router.use('/parley', parleyRoutes);
router.use('/country', CountryRoutes);
router.use('/strategies', strategiesRoutes);

module.exports = router;