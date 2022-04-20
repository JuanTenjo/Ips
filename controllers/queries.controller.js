const {showQueriesUsers,queriesUsers, updateQueriesUser, traerUltimoId, registrarPago, registerQueriesUser} = require('../models/queries.model')
const {validarNulo, patternString} = require('../utils/validationPatters')


const controller = {};


controller.registerQueriesUser = async function (req, res) {

    const params = req.body;
    const ErroresValidacion = [];

    await validarNulo(params.idTipo) ?  ErroresValidacion.push('El Tipo consulta del usuario no puede estar vacio') : true;  
    await validarNulo(params.idPaciente) ?  ErroresValidacion.push('El paciente del usuario no puede estar vacio') : true;  
    await validarNulo(params.idUsuario) ? ErroresValidacion.push(`El usuario no puede ir vacio`) : true;
    await validarNulo(params.idTipoformula) ? ErroresValidacion.push(`El  tipo de formula del usuario no puede estar vacio`) : true;
    await validarNulo(params.horaIngreso) ? ErroresValidacion.push(`La hora de ingreso es requeridad`) : true;
    await validarNulo(params.horaSalida) ? ErroresValidacion.push(`La hora de salida es requeridad`) : true;
    await validarNulo(params.peso) ? ErroresValidacion.push(`El peso es requerido`) : true;
    await validarNulo(params.estatura) ? ErroresValidacion.push(`La estatura es requerida`) : true;
    await validarNulo(params.sintomas) ? ErroresValidacion.push(`El sintoma es requeridad`) : true;
    await validarNulo(params.descripcion) ? ErroresValidacion.push(`La descripcion es requeridad`) : true;
    await validarNulo(params.asistio) ? ErroresValidacion.push(`La asistencia es requeridad`) : true;
    await validarNulo(params.fechaconsulta) ? ErroresValidacion.push(`La Fecha consulta es requerida`) : true;
    await validarNulo(params.valor) ? ErroresValidacion.push(`El valor de la consulta es requerida`) : true;
    await params.examen1 ? ErroresValidacion.push(`La Fecha consulta es requeridad`) : true;
    await params.examen2 ? ErroresValidacion.push(`La Fecha consulta es requeridad`) : true;
    await params.examen3 ? ErroresValidacion.push(`La Fecha consulta es requeridad`) : true;

    if (ErroresValidacion.length != 0){  
        res.status(400).json({"message": ErroresValidacion});
    }else{
        const estado = await registerQueriesUser(params);
        if(estado.error || estado === false){
            res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se registro la consulta del  usuario" });
            return;
        }

        const ultiId = await traerUltimoId();

        if(ultiId == null || undefined){
            return;
        }

        const estadoPago = await registrarPago(ultiId, params.valor);

        if(estadoPago.error || estadoPago === false){
            res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se registro la consulta del  usuario" });
            return;
        }

        res.status(200).json({"message": "Registro Exitoso"});  
        
    
    }
};

controller.updateQueriesUser = async function(req, res) {

    const params = req.body;   
    const ErroresValidacion = [];
    (params.descripcion.length > 45 || params.descripcion.length < 5) ? ErroresValidacion.push("El campo descripcio es mayor a 8 caracteres o menor a 5 caracteres") : true;
    
    await validarNulo(params.idTipo) ?  ErroresValidacion.push('El Tipo consulta del usuario no puede estar vacio') : true;  
    await validarNulo(params.idPaciente) ?  ErroresValidacion.push('El paciente del usuario no puede estar vacio') : true;  
    await validarNulo(params.idUsuario) ? ErroresValidacion.push(`El usuario no puede ir vacio`) : true;
    await validarNulo(params.idTipoformula) ? ErroresValidacion.push(`El  tipo de formula del usuario no puede estar vacio`) : true;
    await validarNulo(params.horaIngreso) ? ErroresValidacion.push(`La hora de ingreso es requeridad`) : true;
    await validarNulo(params.horaSalida) ? ErroresValidacion.push(`La hora de salida es requeridad`) : true;
    await validarNulo(params.peso) ? ErroresValidacion.push(`El peso es requerido`) : true;
    await validarNulo(params.estatura) ? ErroresValidacion.push(`La estatura es requerida`) : true;
    await validarNulo(params.sintomas) ? ErroresValidacion.push(`El sintoma es requeridad`) : true;
    await validarNulo(params.descripcion) ? ErroresValidacion.push(`La descripcion es requeridad`) : true;
    await validarNulo(params.asistio) ? ErroresValidacion.push(`La asistencia es requeridad`) : true;
    await validarNulo(params.fechaconsulta) ? ErroresValidacion.push(`La Fecha consulta es requeridad`) : true;
    await params.examen1 ? ErroresValidacion.push(`La Fecha x es requeridad`) : true;
    await params.examen2 ? ErroresValidacion.push(`La Fecha s es requeridad`) : true;
    await params.examen3 ? ErroresValidacion.push(`La Fecha u es requeridad`) : true;
    await validarNulo(params.idConsulta) ? ErroresValidacion.push(`La Id consulta es requeridad`) : true;
    if (ErroresValidacion.length != 0){
        res.status(400).json({"message": ErroresValidacion});
    }else{
        const estado = await updateQueriesUser(params);
        if(estado.error || estado === false){
            res.status(400).json({"message": estado.mensaje ? estado.mensaje : "No se actualizo" });
        }else{
            res.status(200).json({"message": "Actualización Exitosa"});
        }
    }
};
controller.queriesUsers = async function(req, res) {

    const params = req.body;  
    const estado = await queriesUsers(params.idUsuario);

    if(estado.error || estado === false){
        res.status(400).json(estado);
    }else{
        res.status(200).json(estado);   
    }    

};
controller.showQueriesUsers = async function(req, res) {

   
    const params = req.body;  
    const estado = await showQueriesUsers(params.idConsulta);

    if(estado.error || estado === false){
        res.status(400).json(estado);
    }else{
        res.status(200).json(estado);   
    }    


};

module.exports = controller;