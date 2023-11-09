import React, { useEffect, useState } from 'react';
import { Button, Table, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { deleteBranch, getBranches } from '../../../services/branches';
import { BranchesModal } from '../modals/BranchesModal';
import { DeleteModal } from '../../../core/modals/DeleteModal';


const { Search } = Input;

export const BranchesView = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    // En este use State vamos a poner toda la data, para que setear los fields en el formulario para el caso de edicion.
    const [branchToEdit, setBranchToEdit] = useState(null);
    const [branchData, setBranchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [branchToDelete, setBranchToDelete] = useState(null);

    const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const fetchBranchData = async () => {
        try {
            const data = await getBranches();
            setBranchData(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranchData();
    }, [refreshKey]);

    const handleAddBranchClick = (values) => {
        if (values) {
            setBranchToEdit(values)
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
       
        setIsModalVisible(false);
        setBranchToEdit(null);
    };

    const handleOk = () => {
        console.log('se ejecuto el ok')
        setIsModalVisible(false);
        setBranchToEdit(null);
    };

    const showDeleteBranchModal = (branch) => {
        setBranchToDelete(branch.id);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteBranch = async () => {
        try {
            await deleteBranch(branchToDelete);
            refreshTable();
            setIsDeleteModalVisible(false);
            notification.success({
                message: 'Operacion exitosa',
                description: 'La sucursal ha sido eliminada',
            });
        } catch (error) {
            console.error('Error:', error);
            setIsDeleteModalVisible(false);
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    };

    const handleCancelDeleteBranch = () => {
        setIsDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'Nombre de Sucursal',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Direccion',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Persona encargada',
            dataIndex: 'contact_name',
            key: 'contact_name',
        },
        {
            title: 'Telefono de sucursal',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Correo electronico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button type="link" icon={<BiSolidEditAlt />} size={20} onClick={() => handleAddBranchClick(values)} />
                    <Button type="link" size={20} icon={<AiOutlineDelete />} onClick={() => { showDeleteBranchModal(values) }} />
                </div>
            ),
        },
    ];

    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    BranchesView
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
                                onClick={() => { handleAddBranchClick() }}
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
                        <Table
                            columns={columns}
                            dataSource={branchData}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            <BranchesModal
                isVisible={isModalVisible}
                onConfirm={handleOk}
                onCancel={handleCancel}
                branchData={branchToEdit}
                onBranchUpdate={refreshTable}
            />

            <DeleteModal
                isVisible={isDeleteModalVisible}
                onConfirm={handleDeleteBranch}
                onCancel={handleCancelDeleteBranch}
                title={"Eliminar Sucursal"}
                message={"¿Está seguro(a) de eliminar esta sucursal?"}
            />
        </div>
    );
};
