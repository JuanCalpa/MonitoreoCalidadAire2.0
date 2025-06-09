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
};

async function login (req, res){
  const { correo, contrasena} = req.body;

  try {
    const usuario = await userSql.autenticarUsuario(correo, contrasena);
    if(usuario){
      req.session.usuario ={
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        institucion: usuario.institucion,
        cargo: usuario.cargo,
        biografia: usuario.biografia,
        correo: usuario.correo,
        telefono: usuario.telefono
      };
      console.log('Sesion: ', req.session);
      return res.status(200).json({
        success: true, 
        mensaje: 'Se inicio sesion exitosamente', 
        user: req.session.usuario
      });
    }

    res.status(401).json({
      success: false, 
      mensaje: 'Credenciales incorrectas'
    });

  } catch (error){
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({
      success: false,
      error: 'Error del servidor'
      })
  }
};

async function logout(req, res){
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({mensaje: 'Error al cerrar sesión', error: err});
    }
    res.clearCookie('connect.sid');
    res.status(200).json({mensaje: 'Sesión cerrada exitosamente'});
    console.log('Sesión cerrada exitosamente');
  });
};



module.exports = {
  crearUsuario,
  login,
  logout
};
