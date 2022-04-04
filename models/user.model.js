const pool = require('../config/database')

const model = {};

model.registerUser = async (params) => {
    try {

        let query = `INSERT INTO usuario(idRol,username,email,password) Values('${params.idRol}','${params.username}','${params.email}','${params.password}')`

        const InsertUser = await pool.query(query);

        let estado = InsertUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar el usuario en el Model: user.model, en la funcion: registerUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.registerFactura = async (producto, valor) => {
    try {

        let query = `INSERT INTO factura(producto,valor) Values('${producto}',${valor})`

        const InsertFactura = await pool.query(query);

        let estado = InsertFactura.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar la factura en el Model: user.model, en la funcion: registerFactura. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.NivelObte = async (idNivel) => {
    try {

        let query = `SELECT * FROM niveles where idniveles = ${idNivel}`

        const result = await pool.query(query);
    
        return result[0];

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer los dias del nivel en el Model: user.model, en la funcion: diasNivel. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.registerMembresia = async (idUsuarios,idFactura,idNivel,fechaInicial,fechaCorte,estadoUser) => {
    try {

        let query = `INSERT INTO membresia(idUsuarios,idFactura,idNivel,fechaInicial,fechaCorte,estado) Values(${idUsuarios},${idFactura},${idNivel},'${fechaInicial}','${fechaCorte}',${estadoUser})`

        const InserMembre = await pool.query(query);

        let estado = InserMembre.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al insertar la membresia en el Model: user.model, en la funcion: registerMembresia. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.traerUltimoIDFactura = async () => {
    try {

        let query = `SELECT MAX(idFactura) AS idFactura FROM factura`

        const result = await pool.query(query);
    
        return result[0].idFactura;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer el ultimo id del la facturas el Model: user.model, en la funcion: traerUltimoIDFactura. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.traerUltimoIDUsuario = async () => {
    try {

        let query = `SELECT MAX(idUsuarios) AS idUsuarios FROM usuarios`

        const result = await pool.query(query);
    
        return result[0].idUsuarios;

    } catch (err) {
        return {
            error: true,
            mensaje:[ `Hubo un error al traer el ultimo id del los usuarios el Model: user.model, en la funcion: traerUltimoIDUsuario. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}


model.updateUser = async (params) => {
    try {

        let query = `UPDATE usuarios SET codiPais = '${params.codiPais}', idRol = '${params.idRol}', nombre = '${params.nombre}', email = '${params.email}', apellidos = '${params.apellidos}'
        , genero = '${params.genero}', celular = '${params.celular}' WHERE idUsuarios = ${params.idUsuarios}`

        const UpdateUser = await pool.query(query);

        let estado = UpdateUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al actualizar el usuario en el Model: user.model, en la funcion: updateUser. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

model.deleteUser = async (ID) => {
    try {

        let query = `UPDATE usuarios SET habilitado = !habilitado WHERE idUsuarios = ${ID}`

        const DeleteUser = await pool.query(query);

        let estado = DeleteUser.affectedRows > 0 ?  true : false
        
        return estado;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al desabilitar el usuario en el Model: user.model, en la funcion: deleteUser. ERROR: ${err.sqlMessage}`],
            respuesta: false
        };
    }
}

model.users = async (ID) => {
    try {

        let query = `SELECT idUsuarios, usuarios.idRol, roles.Nombre as NombreRol, usuarios.CodiPais, paises.nombrePais, usuarios.nombre, apellidos, email, genero, usuario, celular, usuarios.habilitado 
		FROM usuarios inner join roles on usuarios.idRol = roles.idRol inner join paises on paises.codiPais = usuarios.CodiPais  `

        const Users = await pool.query(query);

        return Users;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer los usuarios en el Model: user.model, en la funcion: users. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}


model.roles = async (ID) => {
    try {

        let query = `SELECT * FROM roles`

        const Roles = await pool.query(query);

        return Roles;

    } catch (err) {
        return {
            error: true,
            mensaje: [`Hubo un error al traer los roles en el Model: user.model, en la funcion: users. ERROR: ${err.sqlMessage} `],
            respuesta: false
        };
    }
}

module.exports = model;