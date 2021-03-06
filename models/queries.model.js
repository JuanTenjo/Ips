const pool = require('../config/database')

const model = {};



model.registerQueriesUser = async (params) => {
    try {
        let query = `INSERT INTO consulta (idTipo,idPaciente,idUsuario,idTipoformula,horaIngreso,horaSalida,peso,estatura,sintomas,descripcion,asistio,fechaconsulta,examen1,examen2,examen3)VALUES('${params.idTipo}','${params.idPaciente}','${params.idUsuario}','${params.idTipoformula}','${params.horaIngreso}','${params.horaSalida}','${params.peso}','${params.estatura}','${params.sintomas}','${params.descripcion}','${params.asistio}','${params.fechaconsulta}','${params.examen1}','${params.examen2}','${params.examen3}')`;
        const InserQueriesUser = await pool.query(query);
        let estado = InserQueriesUser.affectedRows > 0 ?  true : false
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar la consulta de usuario en el Model: queries.model, en la funcion: registerQueriesUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}


model.traerUltimoId = async () => {
    try {

        let query = `SELECT MAX(idConsulta) AS MaxID FROM consulta`

        const result = await pool.query(query);
    
        return result[0].MaxID;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer el ultimo id del la consulta el Model: comptetition.model, en la funcion: traerUltimoID. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.registrarPago = async (ultiId, valor) => {
    try {

        let query = `INSERT INTO pago(idConsulta,valor) VALUES(${ultiId}, ${valor})`

        const result = await pool.query(query);
    
        return result;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer el ultimo id del la consulta el Model: queries.model, en la funcion: registrarPago. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}



model.updateQueriesUser = async (params) => {
    try {

        let query = `UPDATE consulta SET idTipo = ${params.idTipo}, idPaciente = ${params.idPaciente}, idUsuario = ${params.idUsuario}, idTipoformula = ${params.idTipoformula}, horaIngreso = '${params.horaIngreso}',   horaSalida = '${params.horaSalida}', peso = '${params.peso}', estatura = '${params.estatura}', sintomas = '${params.sintomas}',descripcion = '${params.descripcion}',asistio = '${params.asistio}',fechaconsulta = '${params.fechaconsulta}', examen1 = '${params.examen1}', examen2 = '${params.examen2}', examen3 = '${params.examen3}' WHERE consulta.idConsulta = ${params.idConsulta}`;

        const UpdateQueriesUser = await pool.query(query);

        let estado = UpdateQueriesUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar  la consulta del usuario en el Model: queries.model, en la funcion: updateQueriesUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.queriesUsers = async (idUsuario) => {
    try {

        let query = `select pago.valor,consulta.idConsulta,consulta.idTipo,consulta.idPaciente,consulta.idUsuario,consulta.idTipoformula,consulta.horaIngreso,consulta.horaSalida,consulta.peso,consulta.estatura,consulta.sintomas,consulta.descripcion,consulta.asistio,DATE_FORMAT(consulta.fechaconsulta, "%Y-%m-%d")  as fechaconsulta,consulta.examen1,consulta.examen2,consulta.examen3,tipoconsulta.*,tipoformula.*,paciente.*,usuario.* from consulta inner join tipoconsulta on consulta.idTipo = tipoconsulta.idTipoConsulta inner join tipoformula on consulta.idTipoformula = tipoformula.idTipoformula inner join paciente on consulta.idPaciente = paciente.idPaciente inner join usuario on consulta.idUsuario = usuario.idUsuario inner join pago on pago.idConsulta = consulta.idConsulta `;

        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer las consultas de usuario en el Model: queries.model, en la funcion: queriesUsers. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.showQueriesUsers = async (idConsulta) => {
    try {

        let query =   `select consulta.idTipo,consulta.idPaciente,consulta.idUsuario,consulta.idTipoformula,consulta.horaIngreso,consulta.horaSalida,consulta.peso,consulta.estatura,consulta.sintomas,consulta.descripcion,consulta.asistio,consulta.fechaconsulta,consulta.examen1,consulta.examen2,consulta.examen3 from consulta inner join tipoconsulta on consulta.idTipo = tipoconsulta.idTipoConsulta inner join tipoformula on consulta.idTipoformula = tipoformula.idTipoformula inner join paciente on consulta.idPaciente = paciente.idPaciente inner join usuario on consulta.idUsuario = usuario.idUsuario where consulta.idConsulta = ${idConsulta} `
        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer las consultas de usuario en el Model: queries.model, en la funcion: queriesUsers. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.getTipoConsulta = async () => {
    try {

        let query = `SELECT * FROM tipoconsulta`

        const result = await pool.query(query);
    
        return result;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer los tipo consulta el Model: queries.model, en la funcion: getTipoConsulta. ERROR: ${err.sqlMessage} `],
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
            mensaje:[ `Hubo un error al traer los pacientes el Model: queries.model, en la funcion: getpaciente. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.getUsuario = async () => {
    try {

        let query = `SELECT usuario.idUsuario,usuario.idRol,usuario.username,usuario.email,usuario.password,rol.tipoRol FROM usuario inner join rol on usuario.idRol=rol.idRol`

        const result = await pool.query(query);
    
        return result;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer los usuarios el Model: queries.model, en la funcion: getUsuario. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.getFormula = async () => {
    try {

        let query = `SELECT * FROM tipoformula`

        const result = await pool.query(query);
    
        return result;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer los Formula el Model: queries.model, en la funcion: getFormula. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
model.getExamens = async () => {
    try {

        let query = `SELECT * FROM examen`

        const result = await pool.query(query);
    
        return result;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer los examenes el Model: queries.model, en la funcion: getExamens. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}
module.exports = model;