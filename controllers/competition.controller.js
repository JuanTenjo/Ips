const { ValidaIDLiga, ValidaIDTeam, ValidaNameTeam } = require('../models/validation.models')
const { competition,detallecompetition, register, update, erase, deshabilitar, teams, validarCompetition, traerUltimoID, registerEstrategias, deleteEstrategias } = require('../models/competition.model')
const { validarNulo } = require('../utils/validationPatters')
const controller = {};


controller.register = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

        const params = req.body;

        const ErroresValidacion = [];

        await validarNulo(params.idLigaLocal) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        await validarNulo(params.idLigaVisitante) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        await validarNulo(params.idEquipoLocal) ? ErroresValidacion.push("No se selecciono un equipo local") : true;    
        await validarNulo(params.idEquipoVisitante) ? ErroresValidacion.push("No se selecciono un equipo visitante") : true;   
        await validarNulo(params.horaCompeticion) ? ErroresValidacion.push("No se ingreso la hora de la competicion") : true;      
        await validarNulo(params.fechaCompeticion) ? ErroresValidacion.push("No se ingreso la fecha de la competicion") : true;     
        await ValidaIDLiga(params.idLigaLocal) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        await ValidaIDLiga(params.idLigaVisitante) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        await ValidaIDTeam(params.idEquipoLocal) == false ? ErroresValidacion.push(`El equipo local ingresado ya no existe o esta desabilitado`) : true;
        await ValidaIDTeam(params.idEquipoVisitante) == false ? ErroresValidacion.push(`El equipo visitante ingresado ya no existe o esta desabilitado`) : true;
        await validarCompetition(params) ? ErroresValidacion.push(`Esta competición ya existe`) : true;
        params.estrategias.length <= 0 ? ErroresValidacion.push(`La competencia ingresada no tiene estrategias, agregale para poder registrar`) : true;
        params.idEquipoLocal === params.idEquipoVisitante ?  ErroresValidacion.push(`No puede registrar una competición con el mismo equipo`) : true;
        const hoy = new Date();      
        hoy.setUTCHours(0,0,0,0);
        let fechaCompeticion = new Date(params.fechaCompeticion); // 2020/2/29 / 2021-08-18 / 18-08-2021
        if(isNaN(fechaCompeticion)){
            ErroresValidacion.push("Fecha de la competicion no tiene un formato valido por favor ingrese yyyy-MM-dd")
        }
        fechaCompeticion < hoy ?  ErroresValidacion.push(`No puede registrar una competicion con una fecha anterior a hoy`) : true;

        
        // const horaHoy = new Date();    
        // horaHoy.setMinutes(horaHoy.getMinutes() - 90);     
        // const horaActMenos90 = horaHoy.getHours() + ':' + horaHoy.getMinutes() + ':' + horaHoy.getSeconds();
        // console.log(horaActMenos90);


        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await register(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": [estado.mensaje ? estado.mensaje : "No se registro la competición"] });

            } else {
         
                const IDCompeticion = await traerUltimoID();

                if(IDCompeticion){

                    if(params.estrategias){


                        const estadoDetalle = await registerDetalle(params.estrategias,IDCompeticion)
 
                        if(estadoDetalle.error){

                            res.status(403).json({ "message": [`Se registro la competencia pero quedo sin estrategias. Motivo:${estadoDetalle.error}`] });
                            
                        }else{
        
                            res.status(200).json({ "message": "Registro Exitoso" });
        
                        }
                    }else{
                        res.status(200).json({ "message": "Registro exitoso" });
                    }
                }

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }
};

const registerDetalle = async function (estrategias, IDCompeticion) {

    //Acepta idLigas, idEquipoLocal, idEquipoVisitante, fe

    const ErroresValidacion = [];

    let estrategiasRepetidas = false;

    estrategias.forEach(estrategiasRow => {

        let ValidaEstrategia = estrategias.filter(estrategias => estrategias.idEstrategia === estrategiasRow.idEstrategia);

        if(ValidaEstrategia.length > 1){

            estrategiasRepetidas = true;

        }

        estrategiasRow.PorceLocal.toString().length > 2 || estrategiasRow.PorceVisitante.toString().length > 2 || estrategiasRow.PorceEmpate.toString().length > 2  ? ErroresValidacion.push(" Se espera un numero entero de dos digitos") : false;
        estrategiasRow.idEstrategia == null ? ErroresValidacion.push(" Una de las estrategias esta vacia") : false;
        estrategiasRow.PorceLocal == null || estrategiasRow.PorceLocal == "" ? ErroresValidacion.push(" Uno de las porcentajes del local esta vacio") : false;
        estrategiasRow.PorceEmpate == null || estrategiasRow.PorceEmpate == "" ? ErroresValidacion.push("Uno de las porcentajes de empate esta vacio") : false  ;

        if(estrategiasRow.cuotaLocal){
            estrategiasRow.cuotaLocal.length > 4 ? ErroresValidacion.push("Una o algunas de las cuotas de mercado locales tiene mas de 4 caracteres") : false;
        }
        if(estrategiasRow.cuotaVisitante){
            estrategiasRow.cuotaVisitante.length > 4 ? ErroresValidacion.push("Una o algunas de las cuotas de mercado visitantes tiene mas de 4 caracteres") : false;
        }
        if(estrategiasRow.cuotaEmpate){
            estrategiasRow.cuotaEmpate.length > 4 ? ErroresValidacion.push("Una o algunas de las cuotas de mercado de empate tiene mas de 4 caracteres") : false;
        }


        estrategiasRow.PorceVisitante == null || estrategiasRow.PorceVisitante == "" ? ErroresValidacion.push(" Una de las porcentajes del visitante esta vacio") : false;

        // Number.isFloat(estrategiasRow.PorceVisitante) == false ? ErroresValidacion.push(" Se esperara un numero entero en porce visitante") : false;
        // Number.isInteger(estrategiasRow.PorceLocal) == false ? ErroresValidacion.push(" Se esperara un numero entero en porce local") : false;
        // Number.isInteger(estrategiasRow.PorceEmpate) == false ? ErroresValidacion.push(" Se esperara un numero entero en porce empate") : false;

    });

    estrategiasRepetidas ? ErroresValidacion.push(" Ha introducido dos o mas veces la misma estrategia") : false;

    if (ErroresValidacion.length != 0) {

        return {"error": ErroresValidacion};

    } else {

        let estado = false;

        estrategias.forEach(estrategiasRow => {

            estado = registerEstrategias(estrategiasRow,IDCompeticion);

        });

        estado = await estado;

        if (estado.error || estado === false) {

            return {"error": estado.mensaje ? estado.mensaje : " No se registro el detalle de la competencia"}


        } else {

            return true

        }

    }
};

controller.update = async function (req, res) {

    if (req.user[0].idRol === 3) {

        //Acepta idCompeticion, idLigaLocal,idLigaVisitante, idEquipoLocal, idEquipoVisitante, fechaCompeticion, hora competicion

        const params = req.body;

        const ErroresValidacion = [];

   
        await validarNulo(params.idCompeticiones) ? ErroresValidacion.push("Codigo de la competicion no puede estar vacio") : true; 
        await validarNulo(params.idLigaLocal) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        await validarNulo(params.idLigaVisitante) ? ErroresValidacion.push("Codigo de la liga no puede estar vacio") : true; 
        await validarNulo(params.idEquipoLocal) ? ErroresValidacion.push("No se selecciono un equipo local") : true;    
        await validarNulo(params.idEquipoVisitante) ? ErroresValidacion.push("No se selecciono un equipo visitante") : true;   
        await validarNulo(params.horaCompeticion) ? ErroresValidacion.push("No se ingreso la hora de la competicion") : true;      
        await validarNulo(params.fechaCompeticion) ? ErroresValidacion.push("No se ingreso la fecha de la competicion") : true;     
        await ValidaIDLiga(params.idLigaLocal) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        await ValidaIDLiga(params.idLigaVisitante) == false ? ErroresValidacion.push(`La liga ingresada es invalida o esta desabilitada`) : true;
        await ValidaIDTeam(params.idEquipoLocal) == false ? ErroresValidacion.push(`El equipo local ingresado ya no existe o esta desabilitado`) : true;
        await ValidaIDTeam(params.idEquipoVisitante) == false ? ErroresValidacion.push(`El equipo visitante ingresado ya no existe o esta desabilitado`) : true;
        params.estrategias.length <= 0 ? ErroresValidacion.push(`La competencia ingresada no tiene estrategias, agregale para poder registrar`) : true;
 
        if(params.golesLocal){
            params.golesLocal = parseInt(params.golesLocal);
            params.golesVisitante = parseInt(params.golesVisitante);        
            params.golesLocal.toString().length > 2 ? ErroresValidacion.push("Se esperaba un marcador de uno o maximo dos digitos del local") : false;
            params.golesLocal < 0 ? ErroresValidacion.push("Se esperaba un marcador del local mayor o igual a 0") : false;
        }
        if(params.golesVisitante){
            params.golesVisitante = parseInt(params.golesVisitante);
            params.golesVisitante.toString().length > 2 ? ErroresValidacion.push("Se esperaba un marcador de uno o maximo dos del visitante") : false;
            params.golesVisitante < 0 ? ErroresValidacion.push("Se esperaba un marcador del visitante mayor o igual a 0") : false;
        }

        params.idEquipoLocal === params.idEquipoVisitante ?  ErroresValidacion.push(`No puede actualizar una competición con el mismo equipo`) : true;

        const hoy = new Date();      

        hoy.setUTCHours(0,0,0,0);

        let fechaCompeticion = new Date(params.fechaCompeticion); // 2020/2/29 / 2021-08-18 / 18-08-2021

        if(isNaN(fechaCompeticion)){
            ErroresValidacion.push("Fecha de la competicion no tiene un formato valido por favor ingrese yyyy-MM-dd")
        }

        fechaCompeticion < hoy ?  ErroresValidacion.push(`No puede actualizar la competicion con una fecha anterior a hoy`) : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await update(params);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se actualizo la competición" });

            } else {


                if(params.estrategias){
                    
                    const stateDeleteStrategy = await deleteEstrategias(params.idCompeticiones);

                    if(!stateDeleteStrategy.error){
                    
                        const estadoDetalle = await registerDetalle(params.estrategias,params.idCompeticiones)
    
                        if(estadoDetalle.error){
        
                            res.status(400).json({ "message": `Se actualizo la competencia pero quedo sin estrategias. Motivo:${estadoDetalle.error}`});
                            
                        }else{
        
                            res.status(200).json({ "message": "Actualizacion Exitosa" });
        
                        }
                        
                    }

                }else{
                    res.status(200).json({ "message": "Actualizacion Exitosa" });
                }



            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta peticion" });
    }

};

controller.erase = async function (req, res) {

    if (req.user[0].idRol === 3) {

        const idCompeticiones = req.body.idCompeticiones;

        const ErroresValidacion = [];

        await validarNulo(idCompeticiones) ? ErroresValidacion.push('El ID de la competicion no puede estar vacio') : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await erase(idCompeticiones);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se elimino" });

            } else {

                res.status(200).json({ "message": `Se elimino la competicion` });

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};

controller.deshabilitar = async function (req, res) {

    if (req.user[0].idRol === 3) {

        const idCompeticiones = req.body.idCompeticiones;

        const ErroresValidacion = [];

        await validarNulo(idCompeticiones) ? ErroresValidacion.push('El ID de la competicion no puede estar vacio') : true;

        if (ErroresValidacion.length != 0) {

            res.status(400).json({ "message": ErroresValidacion });

        } else {

            const estado = await deshabilitar(idCompeticiones);

            if (estado.error || estado === false) {

                res.status(400).json({ "message": estado.mensaje ? estado.mensaje : "No se deshabilito" });

            } else {

                res.status(200).json({ "message": `Se deshabilitado la competicion` });

            }

        }

    } else {
        res.status(403).json({ "message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion" });
    }

};
controller.competition = async function(req, res) {

    if(req.user[0].idRol === 3){

        const estado = await competition();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    }else{
        res.status(403).json({"message": "Lo siento pero no tiene los permisos necesarios para hacer esta operacion"});
    }

};

controller.Detallecompetition = async function(req, res) {

    if(req.user[0].idRol === 3){

        let idCompetition = req.params.IdCompetition;

        const estado = await detallecompetition(idCompetition);

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
