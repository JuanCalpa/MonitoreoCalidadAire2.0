const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarios/userController');

//rutas
router.post("/usuarios", userController.crearUsuario);

module.exports = router;