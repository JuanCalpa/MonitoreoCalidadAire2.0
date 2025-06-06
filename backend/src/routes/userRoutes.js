const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarios/userController');

//rutas
router.post("/usuarios/crear", userController.crearUsuario);
router.post("/usuarios/login", userController.login);
router.post("/usuarios/logout", userController.logout);

module.exports = router;