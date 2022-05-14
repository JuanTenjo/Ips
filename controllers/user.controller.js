const validator = require("email-validator");
const {ValidarCorreo, ValidarPais, findUserById} = require('../models/validation.models')
const {registerUser,updateUser, deleteUser, users, roles,registerFactura,traerUltimoIDFactura,registerMembresia,NivelObte,traerUltimoIDUsuario} = require('../models/user.model')
const {validarNulo, patternString, patternPassword} = require('../utils/validationPatters')
const {encrypt} = require("../utils/bcrypt");

const controller = {};


controller.registerUser = async function (req, res) {


        const params = req.body;
        
        let espacios = false;
        let cont = 0;
    
        const ErroresValidacion = [];

        await validarNulo(params.idRol) ?  ErroresValidacion.push('El Rol del usuario no puede estar vacio') : true;  
        await validarNulo(params.username) ?  ErroresValidacion.push('El username del usuario no puede estar vacio') : true;  
        await ValidarCorreo(params.email) ? ErroresValidacion.push(`El correo ${params.email} ya esta registrado`) : true;
        //await patternPassword(params.password) == false ? ErroresValidacion.push("El campo contraseña necesita Mayusculas, minusculas y numeros") : true;

        !validator.validate(params.email) ? ErroresValidacion.push('Email invalido') : true;
      
  /*       if(params.password){        
            (params.password.length > 20 || params.password.length < 6) ? ErroresValidacion.push("La contraseña que ingreso es mayor a 20 caracteres o menor a 6 caracteres") : true;
    
            while (!espacios && (cont < params.password.length)) {
                if (params.password.charAt(cont) == " ")
                    espacios = true;
                cont++;
            }

            espacios ? ErroresValidacion.push("La contraseña no puede contener espacios en blanco") : true;
        } 
     */
        if (ErroresValidacion.length != 0){
            
            res.status(400).json({"message": ErroresValidacion});

        }else{
            
            params.password = await encrypt(params.password);;

            const estado = await registerUser(params);

            if(estado.error || estado === false){
                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se registro el usuario" });
                return;
            }

            res.status(200).json({"message": "Registro Exitoso"});  

        }
};

controller.updateUser = async function(req, res) {

    if(req.user[0].tipoRol === "Admin"){

        const params = req.body;   
    
        const ErroresValidacion = [];

        
        if (ErroresValidacion.length != 0){
            
            res.status(400).json({"message": ErroresValidacion});

        }else{
        
            const estado = await updateUser(params);

            if(estado.error || estado === false){

                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se actualizo" });

            }else{

                res.status(200).json({"message": "Actualización Exitosa"});

            }

        }
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};

controller.deleteUser = async function(req, res) {

    if(req.user[0].idRol === 3){

        const idUser = req.body.idUsuarios; 
    
        const ErroresValidacion = [];

        await validarNulo(idUser) ?  ErroresValidacion.push('El ID del usuario no puede estar vacio') : true;  

        if (ErroresValidacion.length != 0){
            
            res.status(400).json({"message": ErroresValidacion});

        }else{
        
            const estado = await deleteUser(idUser);

            if(estado.error || estado === false){

                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se desabilito"});

            }else{

                res.status(200).json({"message": "Proceso Exitoso"});

            }

        }
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};

controller.users = async function(req, res) {

    if(req.user[0].tipoRol === 'Admin'){

        const estado = await users();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};

controller.roles = async function(req, res) {

    if(req.user[0].idRol === 3){

        const estado = await roles();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};

module.exports = controller;
