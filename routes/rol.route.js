const {getRol} = require('../controllers/rol.controller');

const router = require('express').Router();

//Obtener los Roles
router.get('/get_roles',getRol);

module.exports = router;