import { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { MdCarRepair, MdCarRental, MdMiscellaneousServices, MdDirectionsCarFilled, MdAccountCircle } from "react-icons/md";
import { MdRequestQuote } from "react-icons/md";
import logo from '../../assets/logo-autohaus.svg';
import avatar from '../../assets/usuario.png';

import { Layout, Menu, Avatar, Dropdown, Button, FloatButton } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWindowResize } from '../../hooks/useWindowResize';
import useAuth from 'auth';

const { Sider } = Layout;

export const Sidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const { isMdBreakpoint } = useWindowResize();

  const [selectedKeysMenu, setSelectedKeysMenu] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  console.log(user.avatar, "avatar")
  const optionsRoles = [
    {
        id: 1,
        name: 'Gerente',
    },
    {
        id: 2,
        name: 'Vendedor',
    },
    {
        id: 3,
        name: 'Jefe de Taller',
    },
    {
        id: 4,
        name: 'Cliente',
    },
]

let roleName = "Rol no encontrado";
const matchingRole = optionsRoles.find(role => role.id === user.role);
if (matchingRole) {
  roleName = matchingRole.name;
}

  useEffect(() => {
    if (location) {
      setSelectedKeysMenu([location.pathname]);
    }
  }, [location]);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };


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
      key: '/client/main/management/sales',
      icon: <TeamOutlined />
    },
    {
      label: 'Cotizaciones',
      key: '/client/main/management/quotations',
      icon: <MdRequestQuote />
    },
    {
      label: 'Taller',
      key: '/client/main/management/workshop',
      icon: <MdCarRepair />
    },
    {
      label: 'Sucursales',
      key: '/client/main/management/branches',
      icon: <BsFillBuildingsFill />
    },
    {
      label: 'Inventario',
      key: '/client/main/management/inventory',
      icon: <MdCarRental />,
      children: [
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
    <>
      {isMdBreakpoint ?
        <div
          style={{
            zIndex: 10000,
          }}
          className="position-fixed sidebar"
        >
          <Dropdown
            menu={{
              onClick: (e) => navigate(e.key),
              selectedKeys: selectedKeysMenu,
              items: items,
              theme: "dark"
            }}
          >
            <FloatButton
              type="primary"
              onClick={toggleShowMenu}
              className="m-0 d-flex justify-content-center align-items-center"
              icon={showMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </Dropdown>
        </div>
        :
        <Sider className='sidebar' width={200} theme="dark" collapsible>
          <div className="logo"> <img src={logo} alt="Logo" /> </div>
          <div className="user-info">
            <Avatar src={user.avatar ? user.avatar : avatar} size={42}  />
            <span className='h5 mb-0 mt-1'>{user?.name + ' ' + user?.lastname}</span>
            <span className='mt-0'>({roleName})</span>
            <button className='my-3 salir' onClick={() => logout()}>Salir</button>
          </div>
          <Menu
            className='mt-3'
            theme="dark"
            mode="vertical"
            items={items.map(x => { return x })}
            onClick={(e) => navigate(e.key)}
            selectedKeys={selectedKeysMenu}
          />

        </Sider>}
    </>
  );
};