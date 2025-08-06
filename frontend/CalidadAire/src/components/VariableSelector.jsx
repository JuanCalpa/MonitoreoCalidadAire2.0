import React from "react";
import '../StyleComponents/CompararDatos.css';

function VariableSelector({ value, onChange }) {
  return (
    <div className="variable-selector">
      <div className="variable-selector-titulo"><label>Selecciona una variable:</label></div>
      <select className="form-select" onChange={onChange} value={value}>
        <option value="">-- Selecciona --</option>
        <option value="pm1">PM1</option>
        <option value="pm2_5">PM2.5</option>
        <option value="pm10">PM10</option>
        <option value="CO">CO</option>
        <option value="temperatura">Temperatura</option>
        <option value="presion">Presión</option>
      </select>
    </div>
  );
}

export default VariableSelector;
