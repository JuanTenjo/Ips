const {getRol} = require('../models/rol.model')


const controller = {};


controller.getRol = async function(req, res) {

        const estado = await getRol();

        if(estado.error || estado === false){

            res.status(400).json(estado);

        }else{

            res.status(200).json(estado);
            
        }    
    
    

};

module.exports = controller;