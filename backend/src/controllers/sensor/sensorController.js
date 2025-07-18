const db = require("../../../firebase");

const getDatos = async (req, res) => {
    try {
        const ref = db.ref("20-09-37"); //ajustar este dato si la fecha cambia
        ref.once("value", (snapshot) => {
            const datos = snapshot.val();
            res.json(datos);
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
};

const getUltimoDato = async (req, res) => {
    try {
        const ref = db.ref("/historial");

        ref.once("value", (snapshot) => {
            const historial = snapshot.val();

            if (!historial) {
                return res.status(404).json({ error: "No se encontró historial" });
            }

            const dias = Object.keys(historial).sort();
            const ultimoDia = dias[dias.length - 1];
            const horas = Object.keys(historial[ultimoDia]).sort();
            const ultimaHora = horas[horas.length - 1];
            const mediciones = historial[ultimoDia][ultimaHora];
            const [id, datosMedicion] = Object.entries(mediciones)[0];

            res.json({
                dia: ultimoDia,
                hora: ultimaHora,
                ...datosMedicion
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el último dato" });
    }
};

const getUltimasTemperaturas = async (req, res) => {
    try {
        const ref = db.ref("/historial");
        ref.once("value", (snapshot) => {
            const historial = snapshot.val();
            if (!historial) return res.status(404).json({ error: "No se encontró historial" });

            //obtener el último dia
            const dias = Object.keys(historial).sort();
            const ultimoDia = dias[dias.length - 1];

            //obtener todas las horas del ultimo dia
            const horas = Object.keys(historial[ultimoDia]).sort();

            //recoger todas las mediciones del ultimo dia
            let temperaturas = [];
            horas.reverse().forEach(hora => {
                const mediciones = historial[ultimoDia][hora];
                Object.values(mediciones).forEach(medicion => {
                    if (typeof medicion.temperatura === "number") {
                        temperaturas.push(medicion.temperatura);
                    }
                });
            });

            //tomar solo las ultimas 10
            temperaturas = temperaturas.slice(0, 10).reverse();

            res.json({ temperaturas });
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener temperaturas" });
    }
};

const getUltimosPM1 = async (req, res) => {
  try {
    const ref = db.ref("/historial");
    ref.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No se encontró historial" });

      const dias = Object.keys(historial).sort();
      const ultimoDia = dias[dias.length - 1];
      const horas = Object.keys(historial[ultimoDia]).sort().reverse();

      let pm1 = [];
      for (const hora of horas) {
        const mediciones = historial[ultimoDia][hora];
        for (const medicion of Object.values(mediciones)) {
          if (typeof medicion.pm1 === "number") {
            pm1.push(medicion.pm1);
          }
        }
        if (pm1.length >= 10) break;
      }
      pm1 = pm1.slice(0, 10).reverse();

      res.json({ pm1 });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener PM1" });
  }
};

module.exports = {
    getDatos,
    getUltimoDato,
    getUltimosPM1,
    getUltimasTemperaturas
}