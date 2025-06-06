import React, { useState } from "react";
import GraficoBarras from "../components/GraficoBarras";
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{variableSeleccionada.nombre}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {/* Aquí puedes mostrar la gráfica o los datos */}
                <p>Datos: {variableSeleccionada.datos.join(", ")}</p>
                {/* <GraficoBarras datos={variableSeleccionada.datos} /> */}
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