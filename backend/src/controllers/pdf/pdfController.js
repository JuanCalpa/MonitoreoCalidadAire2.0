const PDFDocument = require("pdfkit-table");
const { mean, std } = require("mathjs");
const db = require("../../../firebase");
const path = require("path");

const generarPDF = async (req, res) => {
    try {
        const ref = db.ref("/historial");
        ref.once("value", async (snapshot) => {
            const historial = snapshot.val();
            if (!historial) return res.status(404).json({ error: "No se encontró historial" });

            const dias = Object.keys(historial).sort();
            const ultimoDia = dias[dias.length - 1];
            const horas = Object.keys(historial[ultimoDia]).sort();

            let datos = [];
            for (const hora of horas) {
                const mediciones = historial[ultimoDia][hora];
                for (const medicion of Object.values(mediciones)) {
                    datos.push({
                        pm1: medicion.pm1 ?? null,
                        pm2_5: medicion.pm2_5 ?? null,
                        pm10: medicion.pm10 ?? null,
                        co: medicion.co ?? null,
                        humedad: medicion.humedad ?? null
                    });
                }
            }

            const getStats = arr => ({
                promedio: arr.length ? mean(arr) : 0,
                desviacion: arr.length ? std(arr) : 0
            });

            const pm25Arr = datos.map(d => d.pm2_5).filter(Number.isFinite);
            const pm1Arr = datos.map(d => d.pm1).filter(Number.isFinite);
            const pm10Arr = datos.map(d => d.pm10).filter(Number.isFinite);
            const coArr = datos.map(d => d.co).filter(Number.isFinite);
            const humedadArr = datos.map(d => d.humedad).filter(Number.isFinite);

            const stats = {
                pm2_5: getStats(pm25Arr),
                pm1: getStats(pm1Arr),
                pm10: getStats(pm10Arr),
                co: getStats(coArr),
                humedad: getStats(humedadArr)
            };

            // Crear PDF
            const doc = new PDFDocument({ margin: 40, size: 'A4' });

            // Fuente personalizada (debes tener el archivo en tu proyecto)
            doc.registerFont('Roboto', path.join(__dirname, '../../../fonts/Roboto/static/Roboto-Regular.ttf'));
            doc.font('Roboto');

            res.setHeader("Content-Disposition", "attachment; filename=estadisticas.pdf");
            res.setHeader("Content-Type", "application/pdf");
            doc.pipe(res);

            doc.fontSize(22).fillColor('#1a237e').text("Reporte de calidad del aire", { align: "center" });
            doc.moveDown(1.5);
            doc.fontSize(14).fillColor('#333').text(`Fecha de los datos: ${ultimoDia}`, { align: "center" });
            doc.moveDown(2);

            // Tabla resumen de estadísticas con estilos
            const resumenTable = {
                title: "Promedio y desviación estándar del día",
                headers: ["Variable", "Promedio", "Desviación estándar"],
                rows: [
                    ["PM1", stats.pm1.promedio.toFixed(2), stats.pm1.desviacion.toFixed(2)],
                    ["PM2.5", stats.pm2_5.promedio.toFixed(2), stats.pm2_5.desviacion.toFixed(2)],
                    ["PM10", stats.pm10.promedio.toFixed(2), stats.pm10.desviacion.toFixed(2)],
                    ["CO", stats.co.promedio.toFixed(2), stats.co.desviacion.toFixed(2)],
                    ["Humedad", stats.humedad.promedio.toFixed(2), stats.humedad.desviacion.toFixed(2)]
                ]
            };

            await doc.table(resumenTable, {
                width: 420,
                prepareHeader: () => doc.font('Roboto').fontSize(13).fillColor('#000000').fillOpacity(1),
                prepareRow: (row, i) => doc.font('Roboto').fontSize(12)
                    .fillColor('#000000')
            });

            doc.end();
        });
    } catch (error) {
        res.status(500).json({ error: "Error al generar el PDF" });
    }
};

module.exports = {
    generarPDF
};