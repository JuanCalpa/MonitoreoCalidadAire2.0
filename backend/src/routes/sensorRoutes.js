const express = require("express");
const router = express.Router();
const sensorController = require('../controllers/sensor/sensorController');

router.get("/datos", sensorController.getDatos);
router.get("/ultimo", sensorController.getUltimoDato); 
router.get("/ultimos-pm1", sensorController.getUltimosPM1);
router.get("/ultimasTemperaturas", sensorController.getUltimasTemperaturas)

module.exports = router;
