import React from 'react';
import { Column , Pie } from '@ant-design/charts';
//import { Column } from '@ant-design/plots';
import Card from '../templates/card';
import DemoPie from '../templates/pie';
import { Flex } from 'antd';

export const DashboardView = () => {
  

  /*const dataColumn = [
    { sucursal: 'Sucursal A', ventas: 3, cotizaciones: 7 },
    { sucursal: 'Sucursal B', ventas: 5, cotizaciones: 3 },
    { sucursal: 'Sucursal C', ventas: 7, cotizaciones: 1 },
    { sucursal: 'Sucursal D', ventas: 2, cotizaciones: 5 },
  ];*/
  

  /*const configColumn = {
    dataColumn,
    xField: 'sucursal',
    yField: ['ventas', 'cotizaciones'],
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };*/
const data = [
{
  name: 'Ventas',
  sucursal: 'Sucursal A',
  Cantidad: 18,
},
{
  name: 'Ventas',
  sucursal: 'Sucursal B',
  Cantidad: 28,
},
{
  name: 'Ventas',
  sucursal: 'Sucursal C',
  Cantidad: 39,
},
{
  name: 'Ventas',
  sucursal: 'Sucursal D',
  Cantidad: 8,
},
{
  name: 'Cotizaciones',
  sucursal: 'Sucursal A',
  Cantidad: 12,
},
{
  name: 'Cotizaciones',
  sucursal: 'Sucursal B',
  Cantidad: 23,
},
{
  name: 'Cotizaciones',
  sucursal: 'Sucursal C',
  Cantidad: 34,
},
{
  name: 'Cotizaciones',
  sucursal: 'Sucursal D',
  Cantidad: 9,
},

];
const config = {
data,
isGroup: true,
xField: 'sucursal',
yField: 'Cantidad',
seriesField: 'name',

/** 设置颜色 */
//color: ['#1ca9e6', '#f88c24'],

/** 设置间距 */
// marginRatio: 0.1,
label: {
  // 可手动配置 label 数据标签位置
  position: 'middle',
  // 'top', 'middle', 'bottom'
  // 可配置附加的布局方法
  layout: [
    // 柱形图数据标签位置自动调整
    {
      type: 'interval-adjust-position',
    }, // 数据标签防遮挡
    {
      type: 'interval-hide-overlap',
    }, // 数据标签文颜色自动调整
    {
      type: 'adjust-color',
    },
  ],
},
};



  const dataPie = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const configPie = {
    appendPadding: 10,
    dataPie,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
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
  
  

  const info_cards = {
    clientes: { titulo: "Clientes", cantidad: 10 },
    ventas: { titulo: "Ventas", cantidad: 5 },
    cotizaciones: { titulo: "Cotizaciones", cantidad: 3 },
    ordenes: { titulo: "Ordenes de trabajo", cantidad: 15 }
  };

  return (
    <div>
      <Flex gap="middle" horizontal='horizontal'>
        {Object.entries(info_cards).map(([key, value]) => (
          <Card key={key} count={value.cantidad} title={value.titulo} />
        ))}
      </Flex>
      <div className='row my-5'>
        <div className='col-12 col-lg-6'>
          <Column {...config} />
        </div>
        <div className='col-12 col-lg-3 text-center'>
          <h2>Vehiculos</h2>
          <DemoPie />
        </div>
        <div className='col-12 col-lg-3 text-center'>
          <h2>Partes</h2>
          <DemoPie />
        </div>
      </div>
    </div>
  )
}
