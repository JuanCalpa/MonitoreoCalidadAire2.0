const userSql = require('./userSql')

async function crearUsuario(req, res) {
  try {
    const datosUsuario = req.body;
    const resultado = await userSql.insertarUsuario(datosUsuario);
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      id: resultado.insertId
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({
      mensaje: 'Error al crear el usuario',
    });
  }
}

module.exports = {
  crearUsuario
};
