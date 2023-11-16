import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WorkOrdersModal } from '../modals/WorkOrdersModal'
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { getWorkOrders, deleteWorkOrder } from '../../../services/work_orders';
import { getUser } from '../../../services/user';


const { Search } = Input;

export const WorkOrdersView = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [workOrderToEdit, setWorkOrderToEdit] = useState(null);
    const [workOrderData, setWorkOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);


    const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const fetchData = async () => {
        try {
            const data = await getWorkOrders();
            setWorkOrderData(data);
            console.log(workOrderData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    const handleAddWorkOrderClick = (values) => {
        if (values) {
            setWorkOrderToEdit(values)
        }
        console.log('se abre el modal?')
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        // todo: logica para cerrar el modal
        console.log('se ejecuto el cancelar')
        setIsModalVisible(false);
        setWorkOrderToEdit(null)
    };

    const handleOk = () => {
        /**
         name = data.get('name')
         address = data.get('address')
         second_phone = data.get('second_phone')
         lastname = data.get('lastname')
         phone = data.get('phone')
         email = data.get('email')
         password = make_password(data.get('password'))
         branch_id = data.get('branch_id')
         role_id = data.get('role_id')
         */
        // todo: logica para crear un usuario nuevo
        console.log('se ejecuto el ok')
        setIsModalVisible(false);
        setWorkOrderToEdit(null);
    };

    const showDeleteConfirmationModal = (user) => {
        setUserToDelete(user.id);
        setIsModalDeleteVisible(true);

    };

    const handleDeleteWorkOrder = async () => {
        try {
            await deleteWorkOrder(userToDelete);
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


    //const userName = getUser()
    const columns = [
        {
            title: 'Vehiculo',
            dataIndex: 'vehicle',
            key: 'vehicle',
        },
        {
            title: 'Cliente',
            dataIndex: 'customer',
            key: 'customer',

        },
        {
            title: 'Gerente de la orden',
            dataIndex: 'workshop_manager',
            key: 'workshop_manager',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Comentarios',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'start_date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'completion_date',
            dataIndex: 'completion_date',
            key: 'completion_date',
        },
        {
            title: 'is_available',
            dataIndex: 'is_available',
            key: 'is_available',
            render: (is_available) => {
                return <div> {is_available ? "true" : "false"}</div>
            }
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button type="link" icon={<BiSolidEditAlt size={20} />} onClick={() => handleAddWorkOrderClick(values)} />
                    <Button type="link" icon={<AiOutlineDelete size={20} onClick={() => showDeleteConfirmationModal(values)} />} />
                </div>
            ),
        },
    ];

    /*const data = [
        {
            key: '1',
            name: 'Usuario 1',
            email: 'usuario1@example.com',
            branch: 'Sucursal A',
        },
        // Agrega más datos de usuarios aquí
    ];*/

    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    WorkOrdersView
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
                                onClick={handleAddWorkOrderClick}
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
                        <Table columns={columns} dataSource={workOrderData} loading={loading} />

                    </div>
                </div>
            </div>

            <Modal
                title="Confirmar eliminación"
                open={isModalDeleteVisible}
                onOk={handleDeleteWorkOrder}
                onCancel={handleCancelDelete}
            >
                ¿Está seguro(a) de eliminar este usuario?
            </Modal>
            <WorkOrdersModal
                isVisible={isModalVisible}
                onConfirm={handleOk}
                onCancel={handleCancel}
                workOrderData={workOrderToEdit}
                onWorkOrderUpdate={refreshTable}
            />
        </div>
    );
};
