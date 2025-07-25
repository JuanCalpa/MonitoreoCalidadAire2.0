import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import VariableSelector from "../components/VariableSelector";
import DiaSelector from "../components/DiaSelector";
import GraficoBarrasPromedio from "../components/GraficoComparacion";

function CompararDatos() {
  const [variable, setVariable] = useState("");
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [datosPromedio, setDatosPromedio] = useState([]);

  // Cargar días disponibles cuando cambia la variable
  useEffect(() => {
    if (!variable) return;

    fetch(`http://localhost:3000/api/diasVariable?variable=${variable}`)
      .then((res) => res.json())
      .then((data) => setDiasDisponibles(data))
      .catch((err) => console.error("Error al obtener días:", err));
  }, [variable]);

  // Cargar promedios cuando hay variable y días seleccionados
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

  // Manejar cambio en días seleccionados
  const manejarCambioDias = (nuevosSeleccionados) => {
    setDiasSeleccionados(nuevosSeleccionados);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Comparar Promedios por Día</h1>

        <VariableSelector value={variable} onChange={(e) => setVariable(e.target.value)} />

        {variable && (
          <DiaSelector
            dias={diasDisponibles}
            value={diasSeleccionados}
            onChange={manejarCambioDias}
          />
        )}

        {datosPromedio.length > 0 && (
          <GraficoBarrasPromedio datos={datosPromedio} variable={variable} />
        )}
      </div>
    </>
  );
}

export default CompararDatos;
