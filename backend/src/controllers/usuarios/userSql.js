const database = require("../../sqlConnection/connection");

async function insertarUsuario({ nombre, apellido, institucion, cargo, biografia, correo, contrasena, telefono }) {
  const query = `
    INSERT INTO usuarios (nombre, apellido, institucion, cargo, biografia, correo, contrasena, telefono)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await database.query(query, [
    nombre,
    apellido,
    institucion,
    cargo,
    biografia,
    correo,
    contrasena,
    telefono
  ]);

  return result;
}

module.exports = { insertarUsuario };