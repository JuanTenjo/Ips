const pool = require('../config/database')

const model = {};

model.registerPaciente = async (params) => {
    try {
        const {tipoDocumento,numeroDocumento,nombre,apellido,fechaNacimiento,edad,estado}=params;
        let query = `INSERT INTO paciente(tipoDocumento,numeroDocumento,nombre,apellido,fechaNacimiento,edad,estado) Values('${tipoDocumento}','${numeroDocumento}','${nombre}','${apellido}','${fechaNacimiento}','${edad}','${estado}')`

        const InsertUser = await pool.query(query);

        let state = InsertUser.affectedRows > 0 ?  true : false
        
        return state;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el usuario en el Model: user.model, en la funcion: registerUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.getPaciente = async () => {
    try {

        let query = `SELECT * FROM paciente`

        const result = await pool.query(query);
    
        return result;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer los pacientes el Model: paciente.model, en la funcion: getpaciente. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.updatePaciente = async (params) => {
    try {
        const {idPaciente,tipoDocumento,numeroDocumento,nombre,apellido,fechaNacimiento,edad,estado}=params;
        let query = `UPDATE paciente SET tipoDocumento='${tipoDocumento}',numeroDocumento=${numeroDocumento},nombre='${nombre}',apellido='${apellido}',fechaNacimiento='${fechaNacimiento}',edad=${edad},estado='${estado}' WHERE idPaciente=${idPaciente}`

        const UpdateUser = await pool.query(query);

        let state = UpdateUser.affectedRows > 0 ?  true : false
        
        return state;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar el usuario en el Model: user.model, en la funcion: updateUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.updateStatePaciente = async (params) => {
    try {
        const {idPaciente,estado}=params;
        let query = `UPDATE paciente SET estado=${estado} WHERE idPaciente=${idPaciente}`

        const UpdateUser = await pool.query(query);

        let state = UpdateUser.affectedRows > 0 ?  true : false
        
        return state;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar el usuario en el Model: user.model, en la funcion: updateUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
module.exports = model;