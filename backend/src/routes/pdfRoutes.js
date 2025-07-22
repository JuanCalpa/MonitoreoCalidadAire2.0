const { Router } = require("express");
const { generarPDF } = require("../controllers/pdf/pdfController");

const router = Router();

router.get("/pdf", generarPDF);

module.exports = router;