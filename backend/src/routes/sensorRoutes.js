const express = require("express");
const router = express.Router();
const sensorController = require('../controllers/sensor/sensorController');

router.get("/datos", sensorController.getDatos);
router.get("/ultimo", sensorController.getUltimoDato); 
//Rutas para la pagina Variables de entorno
router.get("/ultimosPM1", sensorController.getUltimosPM1);
router.get("/ultimosPM25", sensorController.getUltimosPM25);
router.get("/ultimosPM10", sensorController.getUltimosPM10);
router.get("/ultimosCO", sensorController.getUltimosCO);
router.get("/ultimasTemperaturas", sensorController.getUltimasTemperaturas);
router.get("/ultimasPresiones", sensorController.getUltimasPresiones);
//Rutas para la pagina Comparar datos
router.get("/promedios", sensorController.getPromediosPorDia);
router.get("/diasVariable", sensorController.obtenerDiasPorVariable);

router.get("/datosDia", sensorController.getDatosPorDia);



module.exports = router;
