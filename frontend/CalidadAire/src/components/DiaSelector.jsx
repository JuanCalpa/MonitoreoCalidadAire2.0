import React from "react";

function DiaSelector({ dias, value, onChange }) {
  const manejarCambioCheckbox = (e) => {
    const dia = e.target.value;
    let nuevosSeleccionados = [...value];

    if (e.target.checked) {
      nuevosSeleccionados.push(dia);
    } else {
      nuevosSeleccionados = nuevosSeleccionados.filter((d) => d !== dia);
    }

    onChange(nuevosSeleccionados); // cambiamos de pasar evento a pasar directamente array
  };

  return (
    <div className="mb-4">
      <label className="form-label">Selecciona los días a comparar:</label>
      <div className="d-flex flex-wrap gap-3">
        {dias.map((dia) => (
          <div key={dia} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={dia}
              id={`check-${dia}`}
              checked={value.includes(dia)}
              onChange={manejarCambioCheckbox}
            />
            <label className="form-check-label" htmlFor={`check-${dia}`}>
              {dia}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaSelector;
