import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import VariableSelector from "../components/VariableSelector";
import DiaSelector from "../components/DiaSelector";
import GraficoBarrasPromedio from "../components/GraficoComparacion";
import '../StyleComponents/CompararDatos.css';

function CompararDatos() {
  const [variable, setVariable] = useState("");
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [datosPromedio, setDatosPromedio] = useState([]);

  useEffect(() => {
    if (!variable) return;
    fetch(`http://localhost:3000/api/diasVariable?variable=${variable}`)
      .then((res) => res.json())
      .then((data) => setDiasDisponibles(data))
      .catch((err) => console.error("Error al obtener días:", err));
  }, [variable]);

  useEffect(() => {
    if (!variable || diasSeleccionados.length === 0) return;
    const diasString = diasSeleccionados.join(",");
    fetch(`http://localhost:3000/api/promedios?variable=${variable}&dias=${diasString}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos de promedio recibidos:", data);
        setDatosPromedio(data);
      })
      .catch((err) => console.error("Error al obtener promedios:", err));
  }, [variable, diasSeleccionados]);

  const descargarDatos = async () => {
    if (!variable || diasSeleccionados.length === 0) {
      alert("Selecciona una variable y al menos un día.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/datosDia?variable=${variable}&dias=${diasSeleccionados.join(",")}`
      );
      const data = await res.json();

      const todosVacios = Object.values(data).every(arr => arr.length === 0);
      if (todosVacios) {
        alert("No hay datos para esta(s) fecha(s).");
        return;
      }

      let contenido = "Día,Hora,Valor\n";
      for (const [dia, registros] of Object.entries(data)) {
        for (const { hora, valor } of registros) {
          contenido += `${dia},${hora},${valor}\n`;
        }
      }

      const blob = new Blob([contenido], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `datos_${variable}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar datos:", error);
      alert("Hubo un error al intentar descargar los datos.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="comparar-datos">
        <h1 className="comparar-datos-titulo">Comparar Promedios por Día</h1>

        <VariableSelector value={variable} onChange={(e) => setVariable(e.target.value)} />

        {variable && (
          <DiaSelector
            variable={variable}
            dias={diasDisponibles}
            value={diasSeleccionados}
            onChange={setDiasSeleccionados}
          />
        )}

        {datosPromedio.length > 0 && (
          <>
          <GraficoBarrasPromedio datos={datosPromedio} variable={variable} />            
          </>
        )}
      </div>
    </>
  );
}

export default CompararDatos;
