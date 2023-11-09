import React, { useState, useEffect } from 'react';
import { Button, Table, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersModal } from '../modals/UsersModal';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { getUsers, deleteUser } from '../../../services/user';
import { DeleteModal } from '../../../core/modals/DeleteModal';

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
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserToEdit(null);
  };

  const handleOk = () => {
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
      notification.success({
        message: 'Operacion exitosa',
        description: 'El usuario ha sido eliminado',
      });
    } catch (error) {
      console.error('Error:', error);
      setIsModalDeleteVisible(false);
      notification.error({
        message: 'Error',
        description: error.message,
      });
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



          </div>
        </div>
      </div>

      <DeleteModal
        isVisible={isModalDeleteVisible}
        onConfirm={handleDeleteUser}
        onCancel={handleCancelDelete}
        title={"Eliminar Usuario"}
        message={"¿Está seguro(a) de eliminar este usuario?"}
      />

      <UsersModal
        isVisible={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        userData={userToEdit}
        onUserUpdate={refreshTable}
      />
    </div>
  );
};
