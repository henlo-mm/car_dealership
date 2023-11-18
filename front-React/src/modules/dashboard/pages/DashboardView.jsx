import React, { useState, useEffect } from 'react';
import { Column , Pie } from '@ant-design/charts';
import { getUsers } from '../../../services/user';
import { getWorkOrders } from '../../../services/work_orders';
//import { Column } from '@ant-design/plots';
import Card from '../templates/card';
import DemoPie from '../templates/pie';
import { Flex } from 'antd';

export const DashboardView = () => {
  const [userData, setUserData] = useState([]);
  const [workOrder, setWorkOrder] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchUserData = async () => {
    try {
      const dataUsers = await getUsers();
      const cantidadElementosUsers = Object.keys(dataUsers).length;
      setUserData(cantidadElementosUsers);

      const dataWorkOrders = await getWorkOrders();
      const cantidadElementosWorkOrder = Object.keys(dataWorkOrders).length;
      setWorkOrder(cantidadElementosWorkOrder);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshKey]);

  console.log(userData)

  const info_cards = {
    clientes: { titulo: "Clientes", cantidad: userData },
    ventas: { titulo: "Ventas", cantidad: 5 },
    cotizaciones: { titulo: "Cotizaciones", cantidad: 3 },
    ordenes: { titulo: "Ordenes de trabajo", cantidad: workOrder }
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
