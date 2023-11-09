import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getParts } from '../../../services/parts';
import { PartsModal } from '../modals/PartsModal';
//import 'antd/dist/antd.css';

const { Search } = Input;

export const PartsView = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [partToEdit, setPartToEdit] = useState(null);
    const [partsData, setPartsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [partToDelete, setPartToDelete] = useState(null);


    const refreshTable = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };


    const fetchPartsData = async () => {
        try {
            const data = await getParts();
            setPartsData(data);
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
            setPartToEdit(values)
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {

        setIsModalVisible(false);
        setPartToEdit(null);
    };


    const handleOk = () => {
        /**
        vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
        code = models.CharField(max_length=20, null=False)
        image = models.CharField(max_length=200, null=False)
        quantity = models.IntegerField(null=False)
        description = models.CharField(max_length=255, null=False)
        price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
         */
        // todo: logica para crear un usuario nuevo
        setIsModalVisible(false);
        setPartToEdit(null);
    };

    const handleCancelDeletePart = () => {
        setIsDeleteModalVisible(false);
    };

    const columns = [
        {
            title: 'image',
            dataIndex: 'image',
            key: 'image',
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
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (values) => (
                <div>
                    <Button type="link" icon={<EditOutlined />} />
                    <Button type="link" icon={<EyeOutlined />} />
                </div>
            ),
        },
    ];


    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    PartsView
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
                                onClick={handleAddPartClick}
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
                        dataSource={partsData} />
                    </div>
                </div>
            </div>

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
