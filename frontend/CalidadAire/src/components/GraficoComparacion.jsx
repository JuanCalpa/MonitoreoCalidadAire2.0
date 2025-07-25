import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function GraficoBarrasPromedio({ datos, variable }) {
  console.log("Datos que recibe el gráfico:", datos);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={datos} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="promedio" barSize={50} fill="#8884d8" name={`Promedio de ${variable}`} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default GraficoBarrasPromedio;
