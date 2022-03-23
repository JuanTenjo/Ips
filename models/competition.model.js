const pool = require('../config/database')

const model = {};


model.validarCompetition = async (params) => {
    try {

        let query = `SELECT * FROM competencias WHERE (idLigaLocal = '${params.idLigaLocal}' and idLigaVisitante = '${params.idLigaVisitante}' and idEquipoLocal = '${params.idEquipoLocal}' and idEquipoVisitante = '${params.idEquipoVisitante}'
        and fechaCompeticion = '${params.fechaCompeticion}' and horaCompeticion = '${params.horaCompeticion}')`

        const validar = await pool.query(query);

        return validar[0];

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el quipo en el Model: comptetition.model, en la funcion: register. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.register = async (params) => {
    try {

        let query = `INSERT INTO competencias(idLigaLocal,idLigaVisitante,idEquipoLocal,idEquipoVisitante,fechaCompeticion,horaCompeticion,habiliParley)
        Values(${params.idLigaLocal},${params.idLigaVisitante},${params.idEquipoLocal},${params.idEquipoVisitante},'${params.fechaCompeticion}','${params.horaCompeticion}',${params.habiliParley})`

        const InsertCompetition = await pool.query(query);

        let estado = InsertCompetition.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el quipo en el Model: comptetition.model, en la funcion: register. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.traerUltimoID = async () => {
    try {

        let query = `SELECT MAX(idCompeticiones) AS MaxID FROM competencias`

        const result = await pool.query(query);
    
        return result[0].MaxID;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer el ultimo id del la competicion el Model: comptetition.model, en la funcion: traerUltimoID. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.registerEstrategias = async (estrategias,IDCompeticion) => {
    try {

        let query = `INSERT INTO detallecompentencia(idCompeticion,idEstrategia,PorceLocal,PorceVisitante,PorceEmpate,cuotaLocal,cuotaVisitante,cuotaEmpate)
        Values('${IDCompeticion}','${estrategias.idEstrategia}','${estrategias.PorceLocal}','${estrategias.PorceVisitante}','${estrategias.PorceEmpate}','${estrategias.cuotaLocal}','${estrategias.cuotaVisitante}','${estrategias.cuotaEmpate}')`

        const InsertDetail = await pool.query(query);

        let estado = InsertDetail.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el detalle de la competicion en el Model: comptetition.model, en la funcion: registerEstrategias. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.deleteEstrategias = async (idCompeticiones) => {
    try {

        let query = `DELETE FROM detallecompentencia WHERE idCompeticion =  ${idCompeticiones}`

        const deleteDetail = await pool.query(query);

        //let estado = deleteDetail.affectedRows > 0 ?  true : false
        
        return deleteDetail;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar el detalle de la competicion en el Model: comptetition.model, en la funcion: deleteEstrategias. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.update = async (params) => {
    try {

        let query = `UPDATE competencias SET idLigaLocal = ${params.idLigaLocal}, idLigaVisitante = ${params.idLigaVisitante}, idEquipoLocal = ${params.idEquipoLocal}, idEquipoVisitante = ${params.idEquipoVisitante}, golesLocal = '${params.golesLocal}', golesVisitante = '${params.golesVisitante}',
        fechaCompeticion = '${params.fechaCompeticion}', horaCompeticion = '${params.horaCompeticion}', habiliParley = ${params.habiliParley} WHERE idCompeticiones = ${params.idCompeticiones}`
   
        const UpdateCompeticion = await pool.query(query);

        let estado = UpdateCompeticion.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje:[`Hubo un error al actualizar el enfrentamiento, en el Model: competition.model, en la funcion: update. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.erase = async (idCompeticiones) => {
    try {

        let query = `update FROM competencias WHERE idCompeticiones = ${idCompeticiones}`

        const DeleteCompe = await pool.query(query);

        let estado = DeleteCompe.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al eliminar la competencia en el Model: competition.model, en la funcion: erase. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.deshabilitar = async (idCompeticiones) => {
    try {

        let query = `update FROM competencias SET habilitado = !habilitado WHERE idCompeticiones = ${idCompeticiones}`

        const DesaCompe = await pool.query(query);

        let estado = DesaCompe.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al deshabilitar la competition en el Model: competition.model, en la funcion: deshabilitar. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.teams = async () => {
    try {

        let query = `SELECT * FROM equipos`

        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer las ligas en el Model: league.model, en la funcion: leagues. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.competition = async () => {
    try {

        let query = `SELECT comp.idCompeticiones, 
        l1.codiPais as codiPaisLocal, comp.idLigaLocal, l1.nombreLiga as ligaLocal,
        l2.codiPais as codiPaisVisi, comp.idLigaVisitante, l2.nombreLiga as ligaVisitante, 
        comp.idEquipoLocal, e1.nombreEquipo as equipoLocal,
        comp.idEquipoVisitante, e2.nombreEquipo as equipoVisitante,  
        DATE_FORMAT(comp.fechaCompeticion, "%Y-%m-%d") as fechaCompeticion, comp.horaCompeticion, comp.golesLocal,
         comp.golesVisitante, comp.habiliParley, comp.habilitado
        FROM competencias as comp 
        INNER JOIN ligas l1 ON comp.idLigaLocal = l1.idLigas 
        INNER JOIN ligas l2 ON comp.idLigaVisitante = l2.idLigas 
        INNER JOIN equipos e1 ON comp.idEquipoLocal = e1.idEquipos 	
        INNER JOIN equipos e2 ON comp.idEquipoVisitante = e2.idEquipos
        order by comp.fechaCompeticion, comp.horaCompeticion`

        const Competition = await pool.query(query);

        return Competition;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer las competiciones en el Model: comptetition.model, en la funcion: competition. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.detallecompetition = async (IdCompetition) => {
    try {

        let query = `SELECT detallecompentencia.*, estrategias.nombreEstrategia FROM detallecompentencia, estrategias WHERE detallecompentencia.idEstrategia = estrategias.idEstrategia and idCompeticion = ${IdCompetition}`

        const detalleCompetition = await pool.query(query);

        return detalleCompetition;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer las deralle de la competicion en el Model: comptetition.model, en la funcion: detallecompetition. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

module.exports = model;