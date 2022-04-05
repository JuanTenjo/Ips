const {registerPaciente,getPaciente,updatePaciente,updateStatePaciente} = require('../models/paciente.model')
const {validarNulo} = require('../utils/validationPatters')

const controller = {};


controller.registerPaciente = async function (req, res) {

        const params = req.body;  
        const ErroresValidacion = [];
        for (const e of Object.keys(params)) {
            await validarNulo(params[e]) ?  ErroresValidacion.push(`El campo ${e} no puede estar vacio`) : true;      
        }
    
        if (ErroresValidacion.length != 0){    
            res.status(400).json({"message": ErroresValidacion});
        }else{
            const estado = await registerPaciente(params);
            if(estado.error || estado === false){
                res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se registro el paciente" });
                return;
            }

            res.status(200).json({"message": "Registro Exitoso"});  

        }
};

controller.getPaciente = async function(req, res) {



        const estado = await getPaciente();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    

};

controller.updatePaciente = async function(req, res) {

    const params = req.body;   

    const ErroresValidacion = [];
    for (const e of Object.keys(params)) {
        await validarNulo(params[e]) ?  ErroresValidacion.push(`El campo ${e} no puede estar vacio`) : true;      
    }
    if (ErroresValidacion.length != 0){    
        res.status(400).json({"message": ErroresValidacion});
    }else{
        const estado = await updatePaciente(params);
        if(estado.error || estado === false){
            res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se actualizo el paciente" });
            return;
        }

        res.status(200).json({"message": "El paciente ha sido actualizado exitosamente"});  

    }
    

};

controller.updateStatePaciente = async function(req, res) {

    const params = req.body;   

    const ErroresValidacion = [];
    for (const e of Object.keys(params)) {
        await validarNulo(params[e]) ?  ErroresValidacion.push(`El campo ${e} no puede estar vacio`) : true;      
    }
    if (ErroresValidacion.length != 0){    
        res.status(400).json({"message": ErroresValidacion});
    }else{
        const estado = await updateStatePaciente(params);
        if(estado.error || estado === false){
            res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se actualizo el paciente" });
            return;
        }

        res.status(200).json({"message": "El paciente ha sido actualizado exitosamente"});  

    }
    

};
/* 
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

    if(req.user[0].idRol === 3){

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

}; */

module.exports = controller;
