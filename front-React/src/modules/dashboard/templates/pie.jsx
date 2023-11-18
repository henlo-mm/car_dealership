import React from 'react';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
  const data = [
    {
      type: 'Sucursal A',
      value: 27,
    },
    {
      type: 'Sucursal B',
      value: 25,
    },
    {
      type: 'Sucursal C',
      value: 18,
    },
    {
      type: 'Sucursal D',
      value: 15,
    },
    
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ value }) => `${value}`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default DemoPie;

