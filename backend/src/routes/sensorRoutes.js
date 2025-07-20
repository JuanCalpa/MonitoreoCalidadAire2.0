const express = require("express");
const router = express.Router();
const sensorController = require('../controllers/sensor/sensorController');

router.get("/datos", sensorController.getDatos);
router.get("/ultimo", sensorController.getUltimoDato); 
router.get("/ultimosPM1", sensorController.getUltimosPM1);
router.get("/ultimosPM25", sensorController.getUltimosPM25);
router.get("/ultimosPM10", sensorController.getUltimosPM10);
router.get("/ultimosCO", sensorController.getUltimosCO);
router.get("/ultimasTemperaturas", sensorController.getUltimasTemperaturas);
router.get("/ultimasPresiones", sensorController.getUltimasPresiones);

module.exports = router;
