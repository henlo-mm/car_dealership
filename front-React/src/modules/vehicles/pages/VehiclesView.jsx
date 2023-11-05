import React, { useState } from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import { PlusCircleOutlined, FilterOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'antd/dist/antd.css';

const { Search } = Input;

export const VehiclesView = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddUserClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        // todo: logica para cerrar el modal
        console.log('se ejecuto el cancelar')
        setIsModalVisible(false);
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
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Correo Electrónico',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Sucursal',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button type="link" icon={<EditOutlined />} />
                    <Button type="link" icon={<EyeOutlined />} />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'Usuario 1',
            email: 'usuario1@example.com',
            branch: 'Sucursal A',
        },
        // Agrega más datos de usuarios aquí
    ];

    return (

        <div className='card card-body'>
            <div className='card-header'>
                <h5 className='card-title'>
                    VehiclesView
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
                                onClick={handleAddUserClick}
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
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>

            <Modal
                title="Agregar Usuario"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
            // footer={null}
            >
                {/* Formulario para agregar usuario */}
                <Form>
                    {/* Campos del formulario */}
                </Form>
            </Modal>

        </div>
    );
};
