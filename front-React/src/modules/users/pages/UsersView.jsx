import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Button, Table, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersModal } from '../modals/UsersModal';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { getUsers, deleteUser } from '../../../services/user';

//import 'antd/dist/antd.css';

const { Search } = Input;

export const UsersView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // En este use State vamos a poner toda la data, para que setear los fields en el formulario para el caso de edicion.
  const [userToEdit, setUserToEdit] = useState(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };


  const fetchUserData = async () => {
    try {
      const data = await getUsers();
      setUserData(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshKey]);

  const handleAddUserClick = (values) => {
    if (values) {
      setUserToEdit(values)
    }
    console.log('se abre el modal?')
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    // todo: logica para cerrar el modal
    console.log('se ejecuto el cancelar')
    setIsModalVisible(false);
    setUserToEdit(null);
  };

  const handleOk = () => {
    /**
     name = data.get('name') ok
     address = data.get('address')
     second_phone = data.get('second_phone') ok
     lastname = data.get('lastname') ok
     phone = data.get('phone') ok
     email = data.get('email') ok
     password = make_password(data.get('password')) 
     branch_id = data.get('branch_id') ok
     role_id = data.get('role_id') ok
     */
    // todo: logica para crear un usuario nuevo
    console.log('se ejecuto el ok')
    setIsModalVisible(false);
    setUserToEdit(null);
  };


  const showDeleteConfirmationModal = (user) => {
    setUserToDelete(user.id);
    setIsModalDeleteVisible(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userToDelete);
      refreshTable();
      setIsModalDeleteVisible(false);
    } catch (error) {
      console.error('Error:', error);
      setIsModalDeleteVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalDeleteVisible(false);
  };


  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefono 1',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Telefono 2',
      dataIndex: 'secondPhone',
      key: 'secondPhone',
    },
    {
      title: 'Rol usuario',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Sucursal',
      dataIndex: 'branch_name',
      key: 'branch_name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (values) => (
        <div>
          <Button type="link" icon={<BiSolidEditAlt size={20} />} onClick={() => handleAddUserClick(values)} />
          <Button type="link" icon={<AiOutlineDelete size={20} onClick={() => showDeleteConfirmationModal(values)} />} />
        </div>
      ),
    },
  ];

  /*   const data = [
      {
        key: '1',
        name: 'Sebastian',
        lastName: 'Rey',
        document: '123456',
        phone: '3126697856',
        secondPhone: '32455643',
        role: 'Vendedor',
        email: 'usuario1@example.com',
        branch: 'Sucursal A',
      },
      {
        key: '2',
        name: 'Alejandro',
        lastName: 'Villamil',
        document: '654321',
        phone: '3126697856',
        secondPhone: '32455643',
        role: 'Tecnico',
        email: 'usuario2@example.com',
        branch: 'Sucursal B',
      },
      {
        key: '3',
        name: 'Esperanza',
        lastName: 'Olivo',
        document: '324561',
        phone: '3126697856',
        secondPhone: '32455643',
        role: 'Vendedor',
        email: 'usuario3@example.com',
        branch: 'Sucursal C',
      },
      // Agrega más datos de usuarios aquí
    ]; */



  return (

    <div className='card card-body'>
      <div className='card-header'>
        <h5 className='card-title'>
          filtros de busqueda
        </h5>
        <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
          <div className='col-lg-4 col-md-12 py-2'>
            <Search placeholder="Buscar usuarios" />
          </div>
          <div className='col-lg-6 col-md-12 py-2'>
            <div className='d-flex flex-column flex-sm-wrap flex-lg-row justify-content-end align-items-lg-center align-items-sm-start flex-wrap py-3'>
              <Button
                className='m-1'
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => { handleAddUserClick() }}
              >
                Nuevo
              </Button>
              <Button
                className='m-1'
                type="default"
                icon={<FilterOutlined />}>
                Sucursal
              </Button>
              <Button
                className='m-1'
                type="default"
                icon={<FilterOutlined />}>
                tipo de usuario
              </Button>
            </div>

          </div>
        </div>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='mt-4 table-responsive'>
            <Table columns={columns} dataSource={userData} loading={loading} />

            <Modal
              title="Confirmar eliminación"
              open={isModalDeleteVisible}
              onOk={handleDeleteUser}
              onCancel={handleCancelDelete}
            >
              ¿Está seguro(a) de eliminar este usuario?
            </Modal>

          </div>
        </div>
      </div>
      <UsersModal isVisible={isModalVisible} onConfirm={handleOk} onCancel={handleCancel} userData={userToEdit} onUserUpdate={refreshTable} />
    </div>
  );
};
