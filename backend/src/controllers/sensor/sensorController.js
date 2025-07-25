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

const getUltimosPM25 = async (req, res) => {
  try {
    const ref = db.ref("/historial");
    ref.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No se encontró historial" });

      const dias = Object.keys(historial).sort();
      const ultimoDia = dias[dias.length - 1];
      const horas = Object.keys(historial[ultimoDia]).sort().reverse();

      let pm25 = [];
      for (const hora of horas) {
        const mediciones = historial[ultimoDia][hora];
        for (const medicion of Object.values(mediciones)) {
          if (typeof medicion.pm2_5 === "number") {
            pm25.push(medicion.pm2_5);
          }
        }
        if (pm25.length >= 10) break;
      }
      pm25 = pm25.slice(0, 10).reverse();

      res.json({ pm25 });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener PM2.5" });
  }
};

const getUltimosPM10 = async (req, res) => {
  try {
    const ref = db.ref("/historial");
    ref.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No se encontró historial" });

      const dias = Object.keys(historial).sort();
      const ultimoDia = dias[dias.length - 1];
      const horas = Object.keys(historial[ultimoDia]).sort().reverse();

      let pm10 = [];
      for (const hora of horas) {
        const mediciones = historial[ultimoDia][hora];
        for (const medicion of Object.values(mediciones)) {
          if (typeof medicion.pm10 === "number") {
            pm10.push(medicion.pm10);
          }
        }
        if (pm10.length >= 10) break;
      }
      pm10 = pm10.slice(0, 10).reverse();

      res.json({ pm10 });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener PM10" });
  }
};

const getUltimosCO = async (req, res) => {
  try {
    const ref = db.ref("/historial");
    ref.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No se encontró historial" });

      const dias = Object.keys(historial).sort();
      const ultimoDia = dias[dias.length - 1];
      const horas = Object.keys(historial[ultimoDia]).sort().reverse();

      let co = [];
      for (const hora of horas) {
        const mediciones = historial[ultimoDia][hora];
        for (const medicion of Object.values(mediciones)) {
          if (typeof medicion.CO === "number" || typeof medicion.co === "number") {
            co.push(medicion.CO ?? medicion.co);
          }
        }
        if (co.length >= 10) break;
      }
      co = co.slice(0, 10).reverse();

      res.json({ co });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener CO" });
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

const getUltimasPresiones = async (req, res) => {
  try {
    const ref = db.ref("/historial");
    ref.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No se encontró historial" });

      const dias = Object.keys(historial).sort();
      const ultimoDia = dias[dias.length - 1];
      const horas = Object.keys(historial[ultimoDia]).sort().reverse();

      let presiones = [];
      for (const hora of horas) {
        const mediciones = historial[ultimoDia][hora];
        for (const medicion of Object.values(mediciones)) {
          if (typeof medicion.presion === "number") {
            presiones.push(medicion.presion);
          }
        }
        if (presiones.length >= 10) break;
      }
      presiones = presiones.slice(0, 10).reverse();

      res.json({ presiones });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener presiones" });
  }
};

const getPromediosPorDia = async (req, res) => {
  try {
    const { variable, dias } = req.query;
    if (!variable || !dias) {
      return res.status(400).json({ error: "Variable o días no proporcionados" });
    }

    const diasArray = dias.split(","); // puede venir como: "2025-07-23,2025-07-24"
    const refHistorial = db.ref("/historial");

    refHistorial.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No hay historial" });

      const promedios = diasArray.map((dia) => {
        const horas = historial[dia];
        if (!horas) return { dia, promedio: 0 };

        let suma = 0;
        let cantidad = 0;

        Object.values(horas).forEach((registros) => {
          Object.values(registros).forEach((registro) => {
            const valor = registro[variable];
            if (typeof valor === "number") {
              suma += valor;
              cantidad++;
            }
          });
        });

        const promedio = cantidad > 0 ? suma / cantidad : 0;
        return { dia, promedio: parseFloat(promedio.toFixed(2)) };
      });

      res.json(promedios);
    });
  } catch (error) {
    console.error("Error en promedio por día:", error);
    res.status(500).json({ error: "Error al calcular promedio" });
  }
};

const obtenerDiasPorVariable = async (req, res) => {
  try {
    const { variable } = req.query;
    if (!variable) {
      return res.status(400).json({ error: "Falta el parámetro 'variable'" });
    }

    const refHistorial = db.ref("/historial");
    refHistorial.once("value", (snapshot) => {
      const historial = snapshot.val();
      if (!historial) return res.status(404).json({ error: "No hay historial" });

      const diasConVariable = Object.entries(historial).reduce((acc, [dia, horas]) => {
        let encontrado = false;

        for (const hora of Object.values(horas)) {
          for (const objeto of Object.values(hora)) {
            if (variable in objeto) {
              encontrado = true;
              break;
            }
          }
          if (encontrado) break;
        }

        if (encontrado) acc.push(dia);
        return acc;
      }, []);

      res.json(diasConVariable);
    });
  } catch (error) {
    console.error("Error al obtener días por variable:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getDatosPorDia = async (req, res) => {
  const { variable, dias } = req.query;
  if (!variable || !dias) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const diasArray = dias.split(",");
  const resultados = {};

  for (const dia of diasArray) {
    const ref = db.ref(`historial/${dia}`);
    const snapshot = await ref.once("value");
    const data = snapshot.val();
    if (!data) {
      resultados[dia] = [];
      continue;
    }
    const datosDelDia = [];
    for (const hora in data) {
      const registrosHora = data[hora];

      for (const id in registrosHora) {
        const registro = registrosHora[id];
        if (registro[variable] !== undefined) {
          datosDelDia.push({
            hora,
            valor: registro[variable],
          });
        }
      }
    }
    resultados[dia] = datosDelDia;
  }
  res.json(resultados);
};

module.exports = {
  getDatos,
  getUltimoDato,
  getUltimosPM1,
  getUltimosPM25,
  getUltimosPM10,
  getUltimosCO,
  getUltimasTemperaturas,
  getUltimasPresiones,
  getPromediosPorDia,
  obtenerDiasPorVariable,
  getDatosPorDia
}