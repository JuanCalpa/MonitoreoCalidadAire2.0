import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

function GraficoDispersion({ datos, limite }) {
  return (
    <LineChart
      width={675}
      height={375}
      data={datos}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="valor" stroke="#8884d8" connectNulls />
      {limite !== undefined && (
        <ReferenceLine y={limite} label="Límite" stroke="red" strokeDasharray="3 3" />
      )}
    </LineChart>
  );
}

export default GraficoDispersion;