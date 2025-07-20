import React, { useState } from "react";
import GraficoDispersion from "../components/graficoDispersion";
import Navbar from "../components/navBar";

const variables = [
  { nombre: "PM1", datos: [10, 20, 15, 30] },
  { nombre: "PM2.5", datos: [12, 18, 22, 28] },
  { nombre: "PM10", datos: [8, 14, 19, 25] },
  { nombre: "CO", datos: [5, 7, 6, 8] },
  { nombre: "TEMPERATURA", datos: [22, 23, 21, 24] },
  { nombre: "PRESIÓN", datos: [1012, 1013, 1011, 1014] },
];


function VariablesEntorno() {
  const [showModal, setShowModal] = useState(false);
  const [variableSeleccionada, setVariableSeleccionada] = useState(null);
  const [datosPM1, setDatosPM1] = useState([]);
  const [datosPM25, setDatosPM25] = useState([]);
  const [datosPM10, setDatosPM10] = useState([]);
  const [datosCO, setDatosCO] = useState([]);
  const [datosTemperatura, setDatosTemperatura] = useState([]);
  const [datosPresion, setDatosPresion] = useState([]);

  const handleOpenModal = async (variable) => {
    setVariableSeleccionada(variable);
    setShowModal(true);

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

  const handleCloseModal = () => {
    setShowModal(false);
    setVariableSeleccionada(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Variables de Entorno</h1>
        <div className="row">
          {variables.map((variable) => (
            <div className="col-md-4 mb-4 d-flex flex-column align-items-center" key={variable.nombre}>
              <h5 className="text-center">{variable.nombre}</h5>
              <div className="border rounded p-2 mb-2" style={{ width: "100%", minHeight: 200, background: "#f8f9fa" }}>
                {/* <GraficoBarras datos={variable.datos} /> */}
              </div>
              <button className="btn btn-outline-primary btn-sm" onClick={() => handleOpenModal(variable)}>
                Ver
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && variableSeleccionada && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" style={{ maxWidth: 800, width: "90%" }}>
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
                      limite={50} // Cambia el límite si lo deseas
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
                      limite={10} // Cambia el límite si lo deseas
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
                      limite={1020} // Cambia el límite si lo deseas
                    />
                  ) : (
                    <p>Cargando datos de presión...</p>
                  )
                ) : (
                  <>
                    <p>Datos: {variableSeleccionada.datos.join(", ")}</p>
                  </>
                )
                }
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
    </>
  );
}

export default VariablesEntorno;