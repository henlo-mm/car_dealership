import React, { useEffect, useState }  from 'react';
import { Pie } from '@ant-design/plots';
import { getBranches } from '../../../services/branches';
import { getvehicles } from '../../../services/vehicles';


const DemoPie = () => {

  const [branchList, setBranchList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = async () => {
    try {
        const data = await getBranches();
        const dataCars = await getvehicles();
        setBranchList(data);
        setCarsList(dataCars);
    } catch (error) {
        console.error('Error branch list:', error);
    }
};

useEffect(() => {
  fetchData();
}, [refreshKey]);

// Función para contar los vehículos por sucursal
const contarVehiculosPorSucursal = () => {
  const vehiculosPorSucursal = {};

  carsList.forEach((vehiculo) => {
    const { branch } = vehiculo;
    if (vehiculosPorSucursal[branch]) {
      vehiculosPorSucursal[branch]++;
    } else {
      vehiculosPorSucursal[branch] = 1;
    }
  });
  console.log(vehiculosPorSucursal, "arreglo de veh")
  // Convertir el objeto en un arreglo con el formato deseado
  const data = Object.keys(vehiculosPorSucursal).map((key) => ({
    type: branchList.find((sucursal) => sucursal.id === parseInt(key, 10)).name,
    value: vehiculosPorSucursal[key],
  }));

  return data;
};
  
const data2 = contarVehiculosPorSucursal();
// Convertir el arreglo a números
let formattedData = [];

if (Array.isArray(data2) && data2.length > 0) {
  formattedData = data2.map((item) => ({
    type: String(item.type), // Convertir a cadena de texto
    value: Number(item.value), // Convertir a número
  }));
}
console.log(formattedData, "arre final")
  

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
    data: formattedData,
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

