const mysql = require("mysql");
const { promisify } = require("util"); //Requerimos solo el objeto promisify de la libreria util
const { database } = require("./keys"); //Traemos informacion de la base de datos de la carpeta keys

const pool = mysql.createPool(database); //Crea la conexion

pool.getConnection((err, connection) => { //Comprueba errores

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSE');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUCED');
        }
    }
    if (connection) {
        connection.release(); //Conexion exitosa
        console.log("Conectada");
    }
    return;
});
pool.query = promisify(pool.query); //NIDIA

module.exports = pool