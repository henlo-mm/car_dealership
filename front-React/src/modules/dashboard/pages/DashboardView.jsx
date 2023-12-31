import React, { useState, useEffect } from 'react';
import { Column , Pie } from '@ant-design/charts';
import { getUsers } from '../../../services/user';
import { getWorkOrders } from '../../../services/work_orders';
import { getSales } from '../../../services/sales';
import { getQuotes } from '../../../services/quotes';
//import { Column } from '@ant-design/plots';
import Card from '../templates/card';
import DemoPie from '../templates/pie';
import { Flex } from 'antd';
import usuario from '../../../assets/usuario_card.png';
import ventas from '../../../assets/contrato.png';
import cotizaciones from '../../../assets/coche.png';
import ordenes from '../../../assets/carro.png';

export const DashboardView = () => {
  const [userData, setUserData] = useState(0);
  const [workOrder, setWorkOrder] = useState(0);
  const [sales, setSales] = useState(0);
  const [quotes, setQuotes] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchUserData = async () => {
    try {
      const dataUsers = await getUsers();
      const dataWorkOrders = await getWorkOrders();
      const dataSales = await getSales();
      const dataQuotes = await getQuotes();
      const cantidadElementosUsers = Object.keys(dataUsers).length;
      setUserData(cantidadElementosUsers);

      const cantidadElementosWorkOrder = Object.keys(dataWorkOrders).length;
      setWorkOrder(cantidadElementosWorkOrder);

      
      const cantidadElementosSales = Object.keys(dataSales).length;
      setSales(cantidadElementosSales);

      
      const cantidadElementosQuotes = Object.keys(dataQuotes).length;
      setQuotes(cantidadElementosQuotes);
    } catch (error) {
      console.error('Error:', error);
    } 
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshKey]);

  const info_cards = {
    clientes: { titulo: "Clientes", cantidad: userData , icono: usuario },
    ventas: { titulo: "Ventas", cantidad: sales , icono: ventas },
    cotizaciones: { titulo: "Cotizaciones", cantidad: quotes , icono: cotizaciones },
    ordenes: { titulo: "Taller", cantidad: workOrder , icono: ordenes }
  };

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


  return (
    <div className='card card-body'>
      <div className='card-header'>
        <h5 className='card-title h3'>
          Dashboard
        </h5>
      </div>
      <div className='card-body'>
        <div className="row d-flex gap-0">
          {Object.entries(info_cards).map(([key, value]) => (
            <Card key={key} count={value.cantidad} title={value.titulo} icono={value.icono}/>
          ))}
        </div>
        <div className='row my-5'>
          <div className='col-12 col-lg-6'>
            <Column {...config} />
          </div>
          <div className='col-12 col-lg-6 text-center'>
            <h2>Vehículos</h2>
            <DemoPie />
          </div>          
        </div>
      </div>
    </div>
  )
}
