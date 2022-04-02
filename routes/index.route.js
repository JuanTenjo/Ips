const router = require('express').Router();
const AuthRoutes = require('./auth.route');
const UserRoutes = require('./user.route');
const CompetitionRoutes = require('./competition.route');

router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/competition', CompetitionRoutes);

module.exports = router;