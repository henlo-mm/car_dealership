import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Select, notification, Avatar } from 'antd';
import { PlusCircleOutlined, FilterOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UsersModal } from '../modals/UsersModal';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdRefresh } from 'react-icons/io';
import { FileExcelOutlined } from '@ant-design/icons';
import { getUsers, deleteUser } from '../../../services/user';
import { DeleteModal } from '../../../core/modals/DeleteModal';
import { getBranches } from '../../../services/branches';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


export const UsersView = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // En este use State vamos a poner toda la data, para que setear los fields en el formulario para el caso de edicion.
  const [userToEdit, setUserToEdit] = useState(null);
  const [userData, setUserData] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");

  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };


  const fetchUserData = async () => {
    try {
      const data = await getUsers();
      setUserData(data);
      const listBranchs = await getBranches();
      setBranchList(listBranchs);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshKey]);

  const filterBranchData = async (id) => {

    setLoading(true);

    try {
      let usersList = await getUsers();
      setUserData(usersList.filter((user) => user.branch == id))
      setLoading(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    }
  }

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

  const exportToExcel = () => {
    const data = userData.map(user => ({
      ID: user.id,
      Name: user.name,
      LastName: user.lastName,
      Address: user.address || 'N/A',
      Phone: user.phone || 'N/A',
      Document: user.document,
      Email: user.email,
      Branch: user.branch_name,
      Role: user.role_name,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'usuarios.xlsx');
  };


  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => {
        return <Avatar src={avatar} size={50} />
      }
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.lastName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.document).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase())
      }
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
      title: 'Direccion',
      dataIndex: 'address',
      key: 'address',
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
        <h5 className='card-title h3'>
          Usuarios
        </h5>
        <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
          <div className='col-lg-4 col-md-12 py-2'>
            <Input.Search
              placeholder="Buscar Usuarios"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={(value) => {
                setSearchText(value)
              }}
            />
          </div>
          <div className='col-12 col-md-5 py-2 d-flex justify-content-lg-end justify-content-center aling-items-center aling-items-md-end'>
            <div className='d-flex flex-column flex-sm-wrap flex-lg-row flex-wrap py-3 w-50'>
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
                icon={<IoMdRefresh />}
                onClick={refreshTable}
              >
              </Button>
              <Button
                className='m-1'
                type="primary"
                icon={<FileExcelOutlined />}
                onClick={exportToExcel}
              >
                Descargar Excel
              </Button>
              <Select
                placeholder="Sucursal"
                className='  w-100'
                suffixIcon={<FilterOutlined />}
                onChange={
                  (id) => filterBranchData(id)
                }
                autoClearSearchValue={true}
                options={
                  branchList &&
                  branchList?.map((v) => ({
                    value: v.id,
                    label: `${v.name}`,
                  })
                  )
                }
              />

            </div>
          </div>
        </div>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='mt-4 table-responsive'>
            <Table
              columns={columns}
              dataSource={userData}
              key={userData.id} loading={loading}

            />

          </div>
        </div>
      </div>

      <DeleteModal
        isVisible={isModalDeleteVisible}
        onConfirm={handleDeleteUser}
        onCancel={handleCancelDelete}
        title={"Eliminar usuario"}
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
