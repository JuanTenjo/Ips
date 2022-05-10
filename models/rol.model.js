const pool = require('../config/database')

const model = {};

model.getRol = async () => {
    try {

        let query = `SELECT * FROM rol`

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

module.exports = model;