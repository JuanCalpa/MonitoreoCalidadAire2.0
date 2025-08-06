import React, { useState, useEffect } from "react";
import GraficoDispersion from "../components/graficoDispersion";
import Navbar from "../components/NavBar";
import '../StyleComponents/VariablesEntorno.css';

function VariablesEntorno() {
  const [showModal, setShowModal] = useState(false);
  const [variableSeleccionada, setVariableSeleccionada] = useState(null);
  const [datosPM1, setDatosPM1] = useState([]);
  const [datosPM25, setDatosPM25] = useState([]);
  const [datosPM10, setDatosPM10] = useState([]);
  const [datosCO, setDatosCO] = useState([]);
  const [datosTemperatura, setDatosTemperatura] = useState([]);
  const [datosPresion, setDatosPresion] = useState([]);

  // Fetch para todas las gráficas pequeñas (y grandes) cada 5 segundos
  useEffect(() => {
    const fetchAll = async () => {
      try {
        let res, data;
        res = await fetch("http://localhost:3000/api/ultimosPM1");
        data = await res.json();
        setDatosPM1(data.pm1 || []);

        res = await fetch("http://localhost:3000/api/ultimosPM25");
        data = await res.json();
        setDatosPM25(data.pm25 || []);

        res = await fetch("http://localhost:3000/api/ultimosPM10");
        data = await res.json();
        setDatosPM10(data.pm10 || []);

        res = await fetch("http://localhost:3000/api/ultimosCO");
        data = await res.json();
        setDatosCO(data.co || []);

        res = await fetch("http://localhost:3000/api/ultimasTemperaturas");
        data = await res.json();
        setDatosTemperatura(data.temperaturas || []);

        res = await fetch("http://localhost:3000/api/ultimasPresiones");
        data = await res.json();
        setDatosPresion(data.presiones || []);
      } catch (e) {
        console.error("Error al obtener datos:", e);
      }
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch para el modal (solo la variable seleccionada)
  const fetchDatosVariable = async (variable) => {
    if (!variable) return;
    if (variable.nombre === "TEMPERATURA") {
      const res = await fetch("http://localhost:3000/api/ultimasTemperaturas");
      const data = await res.json();
      setDatosTemperatura(data.temperaturas || []);
    } else if (variable.nombre === "PM1") {
      const res = await fetch("http://localhost:3000/api/ultimosPM1");
      const data = await res.json();
      setDatosPM1(data.pm1 || []);
    } else if (variable.nombre === "PM2.5") {
      const res = await fetch("http://localhost:3000/api/ultimosPM25");
      const data = await res.json();
      setDatosPM25(data.pm25 || []);
    } else if (variable.nombre === "PM10") {
      const res = await fetch("http://localhost:3000/api/ultimosPM10");
      const data = await res.json();
      setDatosPM10(data.pm10 || []);
    } else if (variable.nombre === "CO") {
      const res = await fetch("http://localhost:3000/api/ultimosCO");
      const data = await res.json();
      setDatosCO(data.co || []);
    } else if (variable.nombre === "PRESIÓN") {
      const res = await fetch("http://localhost:3000/api/ultimasPresiones");
      const data = await res.json();
      setDatosPresion(data.presiones || []);
    }
  };

  // Actualiza la variable seleccionada en el modal cada 5 segundos
  useEffect(() => {
    if (showModal && variableSeleccionada) {
      fetchDatosVariable(variableSeleccionada); // Llama al abrir

      const interval = setInterval(() => {
        fetchDatosVariable(variableSeleccionada);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [showModal, variableSeleccionada]);

  const handleOpenModal = (variable) => {
    setVariableSeleccionada(variable);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setVariableSeleccionada(null);
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="variable-entorno">
          <h1 className="variable-entorno-titulo">Variables de Entorno</h1>
          <div className="variable-entorno-graficas">
            <div className="variable-entorno-nombreVariable">
              <h5 className="text-center">PM1</h5>
              <div className="variable-entorno-graficaIndividual">
                <GraficoDispersion
                  datos={datosPM1.map((valor, idx) => ({
                    name: `#${idx + 1}`,
                    valor
                  }))}
                  limite={2}
                />
              </div>
              <button className="variable-entorno-botonVer" onClick={() => handleOpenModal({ nombre: "PM1" })}>
                Ver Información
              </button>
            </div>
            <div className="variable-entorno-nombreVariable">
              <h5 className="text-center">PM2.5</h5>
              <div className="variable-entorno-graficaIndividual">
                <GraficoDispersion
                  datos={datosPM25.map((valor, idx) => ({
                    name: `#${idx + 1}`,
                    valor
                  }))}
                  limite={25}
                />
              </div>
              <button className="variable-entorno-botonVer" onClick={() => handleOpenModal({ nombre: "PM2.5" })}>
                Ver Información
              </button>
            </div>
            <div className="variable-entorno-nombreVariable">
              <h5 className="text-center">PM10</h5>
              <div className="variable-entorno-graficaIndividual">
                <GraficoDispersion
                  datos={datosPM10.map((valor, idx) => ({
                    name: `#${idx + 1}`,
                    valor
                  }))}
                  limite={50}
                />
              </div>
              <button className="variable-entorno-botonVer" onClick={() => handleOpenModal({ nombre: "PM10" })}>
                Ver Información
              </button>
            </div>
            <div className="variable-entorno-nombreVariable">
              <h5 className="text-center">CO</h5>
              <div className="variable-entorno-graficaIndividual">
                <GraficoDispersion
                  datos={datosCO.map((valor, idx) => ({
                    name: `#${idx + 1}`,
                    valor
                  }))}
                  limite={10}
                />
              </div>
              <button className="variable-entorno-botonVer" onClick={() => handleOpenModal({ nombre: "CO" })}>
                Ver Información
              </button>
            </div>
            <div className="variable-entorno-nombreVariable">
              <h5 className="text-center">TEMPERATURA</h5>
              <div className="variable-entorno-graficaIndividual">
                <GraficoDispersion
                  datos={datosTemperatura.map((valor, idx) => ({
                    name: `#${idx + 1}`,
                    valor
                  }))}
                  limite={25}
                />
              </div>
              <button className="variable-entorno-botonVer" onClick={() => handleOpenModal({ nombre: "TEMPERATURA" })}>
                Ver Información
              </button>
            </div>
            <div className="variable-entorno-nombreVariable">
              <h5 className="text-center">PRESIÓN</h5>
              <div className="variable-entorno-graficaIndividual">
                <GraficoDispersion
                  datos={datosPresion.map((valor, idx) => ({
                    name: `#${idx + 1}`,
                    valor
                  }))}
                  limite={1020}
                />
              </div>
              <button className="variable-entorno-botonVer" onClick={() => handleOpenModal({ nombre: "PRESIÓN" })}>
                Ver Información
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && variableSeleccionada && (
          <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.7)" }}>
            <div className="modal-dialog" style={{ maxWidth: 800, width: "90%"}}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{variableSeleccionada.nombre}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  {variableSeleccionada.nombre === "TEMPERATURA" ? (
                    datosTemperatura.length > 0 ? (
                      <GraficoDispersion
                        datos={datosTemperatura.map((valor, idx) => ({
                          name: `#${idx + 1}`,
                          valor
                        }))}
                        limite={25}
                      />
                    ) : (
                      <p>Cargando datos de temperatura...</p>
                    )
                  ) : variableSeleccionada.nombre === "PM1" ? (
                    datosPM1.length > 0 ? (
                      <GraficoDispersion
                        datos={datosPM1.map((valor, idx) => ({
                          name: `#${idx + 1}`,
                          valor
                        }))}
                        limite={2}
                      />
                    ) : (
                      <p>Cargando datos de PM1...</p>
                    )
                  ) : variableSeleccionada.nombre === "PM2.5" ? (
                    datosPM25.length > 0 ? (
                      <GraficoDispersion
                        datos={datosPM25.map((valor, idx) => ({
                          name: `#${idx + 1}`,
                          valor
                        }))}
                        limite={25}
                      />
                    ) : (
                      <p>Cargando datos de PM2.5...</p>
                    )
                  ) : variableSeleccionada.nombre === "PM10" ? (
                    datosPM10.length > 0 ? (
                      <GraficoDispersion
                        datos={datosPM10.map((valor, idx) => ({
                          name: `#${idx + 1}`,
                          valor
                        }))}
                        limite={50}
                      />
                    ) : (
                      <p>Cargando datos de PM10...</p>
                    )
                  ) : variableSeleccionada.nombre === "CO" ? (
                    datosCO.length > 0 ? (
                      <GraficoDispersion
                        datos={datosCO.map((valor, idx) => ({
                          name: `#${idx + 1}`,
                          valor
                        }))}
                        limite={10}
                      />
                    ) : (
                      <p>Cargando datos de CO...</p>
                    )
                  ) : variableSeleccionada.nombre === "PRESIÓN" ? (
                    datosPresion.length > 0 ? (
                      <GraficoDispersion
                        datos={datosPresion.map((valor, idx) => ({
                          name: `#${idx + 1}`,
                          valor
                        }))}
                        limite={1020}
                      />
                    ) : (
                      <p>Cargando datos de presión...</p>
                    )
                  ) : (
                    <p>Datos no disponibles.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleCloseModal}>
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VariablesEntorno;