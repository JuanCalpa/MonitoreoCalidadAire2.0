import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

function GraficoDispersion({ datos, limite }) {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={datos}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#E5E5E5"}}/>
          <YAxis tick={{ fill: "#E5E5E5" }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" connectNulls />
          {limite !== undefined && (
            <ReferenceLine y={limite} label="Límite" stroke="red" strokeDasharray="3 3" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoDispersion;