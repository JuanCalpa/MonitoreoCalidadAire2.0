const database = require("../../sqlConnection/connection");

async function insertarUsuario({ nombre, apellido, institucion, cargo, biografia, correo, contrasena, telefono }) {
  const query = `
    INSERT INTO usuarios (nombre, apellido, institucion, cargo, biografia, correo, contrasena, telefono)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await database.query(query, [
    nombre, apellido, institucion, cargo, biografia, correo, contrasena, telefono
  ]);
  return result;
}

async function autenticarUsuario(correo, contrasena){
    const query = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
    const resultado = await database.query(query, [correo, contrasena]);
    let rows = []
    if (Array.isArray(resultado)){
        rows = resultado[0] || resultado;
    } else if (resultado && Array.isArray(resultado.rows)) {
        rows = resultado.rows;
    }
    return rows && rows.length > 0 ? rows [0] : null
}

module.exports = { 
    insertarUsuario,
    autenticarUsuario
 };