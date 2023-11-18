import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, Tag } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdRefresh } from 'react-icons/io';
import { WorkOrdersModal } from '../modals/WorkOrdersModal'
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { getWorkOrders, deleteWorkOrder } from '../../../services/work_orders';
import { getUsers } from '../../../services/user';
import { getvehicles } from '../../../services/vehicles';
import { StatusWorkOrdersList } from '../.config/workOrdersStatusList'
import dayjs from 'dayjs';

export const WorkOrdersView = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [workOrderToEdit, setWorkOrderToEdit] = useState(null);
    const [workOrderData, setWorkOrderData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [vehiclesData, setVehiclesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [workOrdeToDelete, setWorkOrdeToDelete] = useState(null);
    const [searchText, setSearchText] = useState("");


    const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const fetchData = async () => {
        try {
            const dataWorkOrders = await getWorkOrders();
            const dataUsers = await getUsers();
            const dataVehicles = await getvehicles();
            setWorkOrderData(dataWorkOrders);
            setUsersData(dataUsers);
            setVehiclesData(dataVehicles);

            console.log(dataWorkOrders);
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


    const findStatusById = (idToFind, data) => {
        const foundItem = data.find(item => item.id === idToFind);

        return foundItem ? foundItem.name : null;
    };


    //const userName = getUser()
    const columns = [
        {
            title: 'Vehiculo',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (vehicle) => {
                return <p> {findVehicleById(vehicle, vehiclesData)} </p>
            },
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.vehicle).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.customer).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.workshop_manager).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Cliente',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) => {
                return <p> {findUserById(customer, usersData)} </p>
            }

        },
        {
            title: 'Gerente de la orden',
            dataIndex: 'workshop_manager',
            key: 'workshop_manager',
            render: (workshop_manager) => {
                return <p> {findUserById(workshop_manager, usersData)} </p>
            }
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
            render: (status) => findStatusById(status, StatusWorkOrdersList)
        },
        {
            title: 'start_date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (start_date) => dayjs(start_date).format('YYYY-MM-DD')
        },
        {
            title: 'completion_date',
            dataIndex: 'completion_date',
            key: 'completion_date',
            render: (completion_date) => dayjs(completion_date).format('YYYY-MM-DD')
        },
        {
            title: 'is_available',
            dataIndex: 'is_available',
            key: 'is_available',
            render: (is_available) => {
                return <Tag
                    icon={is_available ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                    color={is_available ? 'success' : 'orange'}
                >
                    {is_available ? 'Terminado' : 'En proceso'}
                </Tag>
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


    const findUserById = (idToFind, data) => {
        const foundItem = data.find(item => item.id === idToFind);

        return foundItem ? `${foundItem.name} ${foundItem.lastName}` : null;
    };

    const findVehicleById = (idToFind, data) => {
        const foundItem = data.find(item => item.id === idToFind);

        return foundItem ? foundItem.model : null;
    };

    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    WorkOrdersView
                </h5>
                <div className=' d-flex flex-column flex-sm-wrap  flex-lg-row justify-content-between align-items-center py-3 gap-3 gap-md-0'>
                    <div className='col-lg-4 col-md-12 py-2'>
                        <Input.Search
                            placeholder="Buscar"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onSearch={(value) => {
                                setSearchText(value)
                            }}
                        />
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
                                icon={<IoMdRefresh />}
                                onClick={refreshTable}
                            >
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
