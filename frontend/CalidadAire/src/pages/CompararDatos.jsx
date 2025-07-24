import React, { useState } from "react";
import Navbar from "../components/NavBar";

function CompararDatos() {
  const [variableSeleccionada, setVariableSeleccionada] = useState("");

  const handleChange = (e) => {
    setVariableSeleccionada(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Comparar Datos</h1>
        <p className="text-center">Aquí podrás comparar los datos de las variables ambientales.</p>
        <p className="text-center">Selecciona la variable que deseas comparar:</p>

        <div className="d-flex justify-content-center mt-4">
          <select
            className="form-select w-50"
            value={variableSeleccionada}
            onChange={handleChange}
          >
            <option value="">Selecciona una variable</option>
            <option value="pm1">PM1</option>
            <option value="pm2.5">PM2.5</option>
            <option value="pm10">PM10</option>
            <option value="co">CO</option>
            <option value="temperatura">Temperatura</option>
            <option value="presion">Presión</option>
          </select>
        </div>

        {variableSeleccionada && (
          <p className="text-center mt-3">
            Has seleccionado: <strong>{variableSeleccionada}</strong>
          </p>
        )}
      </div>
    </>
  );
}

export default CompararDatos;