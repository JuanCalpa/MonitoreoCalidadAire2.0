import React from "react";

function DiaSelector({ dias, value, onChange, variable }) {
  const manejarCambioCheckbox = (e) => {
    const dia = e.target.value;
    let nuevosSeleccionados = [...value];

    if (e.target.checked) {
      nuevosSeleccionados.push(dia);
    } else {
      nuevosSeleccionados = nuevosSeleccionados.filter((d) => d !== dia);
    }

    onChange(nuevosSeleccionados);
  };

  const descargarDatos = async (dia) => {
    if (!variable || !dia) {
      alert("Seleccione una variable y un día válido.");
      return;
    }

    try {
      const url = `http://localhost:3000/api/datosDia?variable=${variable}&dias=${dia}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data[dia] || data[dia].length === 0) {
        alert(`No hay datos para la fecha: ${dia}`);
        return;
      }

      let contenido = "Día,Hora,Valor\n";
      for (const { hora, valor } of data[dia]) {
        contenido += `${dia},${hora},${valor}\n`;
      }

      const blob = new Blob([contenido], { type: "text/csv" });
      const enlace = document.createElement("a");
      enlace.href = URL.createObjectURL(blob);
      enlace.download = `datos_${variable}_${dia}.csv`;
      enlace.click();
    } catch (error) {
      console.error("Error al descargar los datos:", error);
      alert("Hubo un error al intentar descargar los datos.");
    }
  };

  return (
    <div className="dia-selector-container">
      <div className="dia-selector-titulo"><label >Selecciona los días a comparar:</label></div>
      <div className="dia-selector-dias">
        {dias.map((dia) => (
          <div key={dia} className="d-flex align-items-center gap-3">
            <div className="form-check">
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
            <button
              onClick={() => descargarDatos(dia)}
              className="boton-descarga"
            >
              Descargar CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaSelector;
