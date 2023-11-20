import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, notification, Image } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deletePart, getParts } from '../../../services/parts';
import { PartsModal } from '../modals/PartsModal';
import { DeleteModal } from '../../../core/modals/DeleteModal';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdRefresh } from 'react-icons/io';

//import 'antd/dist/antd.css';


export const PartsView = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [partToEdit, setPartToEdit] = useState(null);
    const [partsData, setPartsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [partToDelete, setPartToDelete] = useState(null);
    const [searchText, setSearchText] = useState("");


    const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };


    const fetchPartsData = async () => {
        try {
            const data = await getParts();
            setPartsData(data);
            console.log(partsData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartsData();
    }, [refreshKey]);

    const handleAddPartClick = (values) => {
        if (values) {
            setPartToEdit(values);
            console.log({ partToEdit })
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {

        setIsModalVisible(false);
        setPartToEdit(null);
    };


    const handleOk = () => {
        setIsModalVisible(false);
        setPartToEdit(null);
    };


    const showDeleteConfirmationModal = (part) => {
        setPartToDelete(part.id);
        setIsDeleteModalVisible(true);
    };

    const handleDeletePart = async () => {
        try {
            await deletePart(partToDelete);
            refreshTable();
            setIsDeleteModalVisible(false);
            notification.success({
                message: 'Operacion exitosa',
                description: 'El repuesto ha sido eliminado',
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


    const handleCancelDeletePart = () => {
        setIsDeleteModalVisible(false);
    };

    const columns = [
        {
            title: '',
            // dataIndex: 'image',
            key: 'image',
            with: 150,
            render: (values) => (
                <Image
                    width={100}
                    src={values.image}
                    placeholder={
                        <Image
                            preview={false}
                            src={values.image}
                            width={50}
                        />
                    }
                />
            ),
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.code).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.description).toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            title: 'Codigo',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button type="link" icon={<BiSolidEditAlt size={20} />} onClick={() => { handleAddPartClick(values); }} />
                    <Button type="link" icon={<AiOutlineDelete size={20} />} onClick={() => showDeleteConfirmationModal(values)} />
                </div>
            ),
        },
    ];


    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title h3'>
                    Respuestos
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
                                onClick={() => { handleAddPartClick(); }}
                            >
                                Nuevo
                            </Button>
                            <Button
                                className='m-1'
                                type="default"
                                icon={<IoMdRefresh />}>
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='mt-4 table-responsive'>
                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={partsData}
                        />
                    </div>
                </div>
            </div>

            <DeleteModal
                isVisible={isDeleteModalVisible}
                onConfirm={handleDeletePart}
                onCancel={handleCancelDeletePart}
                title={"Eliminar repuesto"}
                message={"¿Está seguro(a) de eliminar este repuesto?"}
            />

            <PartsModal
                isVisible={isModalVisible}
                onConfirm={handleOk}
                onCancel={handleCancel}
                partData={partToEdit}
                onPartUpdate={refreshTable}
            />

        </div>
    );
};
