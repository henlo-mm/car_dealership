import React from 'react';
import { Bar } from '@ant-design/charts';

export const DashboardView = () => {
  const data = [
    { year: '2020', value: 30 },
    { year: '2021', value: 45 },
    { year: '2022', value: 28 },
    { year: '2023', value: 60 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    height: 400,
    barWidth: 30,
    // Puedes personalizar más opciones aquí según tus necesidades
  };

  return <Bar {...config} />;
}
