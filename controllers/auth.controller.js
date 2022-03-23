const {ValidarUser} = require('../models/validation.models')
const { comparePassword, encrypt } = require("../utils/bcrypt");
const { createToken } = require("../utils/common");

const controller = {};

controller.login = async function (req, res) {

    const { email, password } = req.body;
    const userFinded = await ValidarUser(email);
    if (userFinded && userFinded[0]) {
      const user = userFinded[0];
      const validarContrasena = await comparePassword(password, user.password);
      if (validarContrasena) {
        res.status(200).json({     
          msg: "Inicio sessión correctamente",
          rol: user.idRol,
          token : createToken({id: user.idUsuarios, username: user.usuario, email: user.email }),
          });
      } else {

        //res.status(403).json({ msg: "La contraseña es incorrecta" });
        res.status(403).json({ "message":["La contraseña es incorrecta"]});

        //res.sendStatus(403, {error: error});
      }
    } else {

        res.status(403).json({ "message": ["No se ha encontrado ninguna cuenta asociada a ese correo"] });

    }
    
  };

  controller.getinfotoken = async function (req, res) {
    const user = req.user;
    res.json(user);
  };



module.exports = controller;
