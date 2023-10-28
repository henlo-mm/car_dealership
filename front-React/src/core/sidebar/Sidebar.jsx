import {
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { MdCarRepair, MdCarRental, MdMiscellaneousServices,MdDirectionsCarFilled, MdAccountCircle  } from "react-icons/md";
import { Layout, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';



const { Sider } = Layout;

export const Sidebar = () => {

  const navigate = useNavigate();

  let items = [
    {
      label: 'Dashboard',
      key: '/client/main/management/dashboard',
      icon: <DesktopOutlined />
    },
    {
      label: 'Usuarios',
      key: '/client/main/management/users',
      icon: <MdAccountCircle />
    },
    {
      label: 'Ventas',
      key: '/client/main/management/sells',
      icon: <TeamOutlined />
    },
    {
      label: 'Cotizaciones',
      key: '/client/main/management/quotations',
      icon: <FileOutlined />
    },
    {
      label: 'Taller',
      key: '/client/main/management/workshop',
      icon: <MdCarRepair />
    },
    {
      label: 'Sucursales',
      key: '/client/main/management/branches',
      icon: <FileOutlined />
    },
    {
      label: 'Inventario',
      key: '/client/main/management/inventory',
      icon: <MdCarRental />,
      children:  [
        {
          type: 'list',
          label: 'Repuestos',
          icon: <MdMiscellaneousServices />,
          key: '/client/main/management/parts'
        },
        {
          type: 'list',
          label: 'Vehiculos',
          icon: <MdDirectionsCarFilled />,
          key: '/client/main/management/vehicles'
      },
    ]
    }

  ]

  return (
    <Sider width={200} theme="dark" collapsible>
      <div className="logo"> LOGO CARRITO </div>
      <div className="user-info">
        <Avatar size={32} icon={<UserOutlined />} />
        <span>Nombre de Usuario</span>
        <span>Rol</span>
      </div>
      {/* <Menu theme="dark" mode="vertical" >
        <Menu.Item key="1" icon={ <DesktopOutlined />} />
        <Menu.Item key="2" icon={<UserOutlined />} />
        <Menu.Item key="3" icon={<TeamOutlined />} />
        <Menu.Item key="4" icon={<FileOutlined />} />
      </Menu> */}
      <Menu 
      theme="dark" 
      mode="vertical" 
      items={items.map(x => { return x })} 
      onClick={(e) => navigate(e.key)}
      />
      
    </Sider>
  );
};