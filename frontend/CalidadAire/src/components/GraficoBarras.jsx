import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function GraficoBarras({ datos }) {
  return (
    <BarChart
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
      <Bar dataKey="valor" fill="#8884d8" />
    </BarChart>
  );
}

export default GraficoBarras