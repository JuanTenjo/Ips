const pool = require("../config/database");

const model = {};


model.ValidarPais = async (CodiPais) => {
  
  const sql = `Select count(codiPais) as Existe FROM paises WHERE codiPais = '${CodiPais}'`;
  const result = await pool.query(sql);

  if (result[0].Existe > 0) {
    return true;
  } else {
    return false;
  }
};

model.ValidarCorreo = async function (correo) {
  const sql = `Select count(email) as Existe FROM usuario WHERE email = '${correo}'`;
  const result = await pool.query(sql);
  if (result[0].Existe > 0) {
    return true;
  } else {
    return false;
  }
};

model.ValidarUser = async function (email) {
  try {
    const sql = `SELECT idUsuario,idRol,username,email,password FROM usuario where email = '${email}'`;

    const result = await pool.query(sql);

    return result;
  } catch (err) {
    return {
      error: true,
      message: [`Hubo un error al validar el usuario en el Model: ModelLogin, en la funcion: ValidaUser. ERROR: ${err.sqlMessage} `],
    };
  }
};

model.findUserById = async function (data) {
  const sql = `SELECT * FROM usuarios where idUsuarios = ${data.id}`;
  const result = pool.query(sql);
  return result;
};

model.ValidaLiga = async function (params) {
  try {

    const sql = `Select count(idLigas) as Existe FROM ligas WHERE nombreLiga = '${params.nombreLiga}' and codiPais = '${params.codiPais}'`;

    const result = await pool.query(sql);

    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaLiga. ERROR: ${err.sqlMessage} `],
    };
  }
};

model.ValidaIDLiga = async function (IdLiga) {
  try {

    const sql = `Select count(idLigas) as Existe FROM ligas WHERE idLigas = '${IdLiga}' and habilitada = 1`;

    const result = await pool.query(sql);

    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaIDLiga. ERROR: ${err.sqlMessage} `],
    };
  }
};

model.ValidaNombreLiga = async function (params) {
  try {

    const sql = `Select count(idLigas) as Existe FROM ligas WHERE nombreLiga = '${params.nombreLiga}' and idLigas <> ${params.idLigas} and habilitada = 1`;

    const result = await pool.query(sql);

    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaNombreLiga. ERROR: ${err.sqlMessage} `],
    };
  }
};

model.ValidaTeam = async function (params) {

  try {
    const sql = `Select count(idEquipos) as Existe FROM equipos WHERE nombreEquipo = '${params.nombreEquipo}' and idLigas = ${params.idLigas} and habilitado = 1`;

    const result = await pool.query(sql);

    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaTeam. ERROR: ${err.sqlMessage} `],
    };
  }
};

model.ValidaNameTeam = async function (params) {
  try {

    const sql = `Select count(idEquipos) as Existe FROM equipos WHERE idEquipos <> '${params.idEquipos}' and nombreEquipo = '${params.nombreEquipo}' and habilitado = 1`;

    const result = await pool.query(sql);
    
    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaNameTeam. ERROR: ${err.sqlMessage} `],
    };
  }
};

model.ValidaIDTeam = async function (idEquipo) {
  try {

    const sql = `Select count(idEquipos) as Existe FROM ligas WHERE idEquipos = '${idEquipo}' and habilitado = 1`;

    const result = await pool.query(sql);

    if (result[0].Existe > 0) {
      return true;
    } else {
      return false;
    }

  } catch (err) {
    return {
      error: true,
      mensaje: [`Hubo un error al validar la liga en el Model: Validation Model, en la funcion: ValidaIDTeam. ERROR: ${err.sqlMessage} `],
    };
  }
};


module.exports = model;
