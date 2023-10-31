import { Modal, Form, Spin, Input, Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';


export const UsersModal = ({ isVisible, onConfirm, onCancel, userData }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userData && isVisible) {
            //Si hay data entonces configure la data
            form.setFieldsValue(userData)
        }
    }, [userData])


    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
    }

    // funcioinalidad, que al ejecutar un submit, nos permite enviar los datos en una peticion http y ejecutarlo. 

    const onSubmit = async (values) => {
        try {
            //todo
            // los values del form
            setLoading(true);
            //Hacer validaciones nezar peticiones httpcesarias
            form.resetFields();
            if (onConfirm) {
                onConfirm();
            } //todo
            notification.success('Registro e usuario con exito')
        } catch (error) {
            notification.error('ocurrio un error', error.message)
        }
        setLoading(false);
    }

    // Objetos representativos que se deben de obtener de las peticiones http de Django

    const optionsBranches = [
        {
            id: '1',
            name: 'Sucursal A',
        },
        {
            id: '2',
            name: 'Sucursal B',
        },
        {
            id: '3',
            name: 'Sucursal C',
        },
        // Agrega más datos de usuarios aquí
    ];

    const optionsRoles = [
        {
            id: '1',
            name: 'Gerente',
        },
        {
            id: '2',
            name: 'Vendedor',
        },
        {
            id: '3',
            name: 'jefe de taller',
        },
    ]

    return (
        <Modal
            title={userData ? "Editar usuario" : "Crear usuario"}
            open={isVisible}
            onCancel={onClose}
            // onOk={() => {validateForm}}
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="edit" type='primary' onClick={form.submit}>
                    aceptar
                </Button>
            ]}
        >
            {/* Formulario para agregar/editar usuario */}
            <Spin
                spinning={loading}
            >
                <div className='card-body row'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onSubmit}
                    >
                        <div className="row">
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="name"
                                    label={<label className="form-label"> nombre usuario  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='nombre'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="lastName"
                                    label={<label className="form-label"> Apellido usuario  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Apellidos'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="phone"
                                    label={<label className="form-label"> Telefono 1  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Telefono 1'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="secondPhone"
                                    label={<label className="form-label"> Telefono 2  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Telefono 2'
                                    />
                                </Form.Item>
                            </div>
                           
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="email"
                                    label={<label className="form-label"> Email </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Correo Electronico'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="document"
                                    label={<label className="form-label"> Documento  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Documento de identidad'
                                    />
                                </Form.Item>
                            </div>
                             {/* nuevos campos */}
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="role"
                                    label={<label className="form-label"> Rol de usuario  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            optionsRoles &&
                                            optionsRoles?.map((v) => ({
                                            value: v.id,
                                            label: `${v.name}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="branch"
                                    label={<label className="form-label"> Sucursal  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                     style={{
                                        width: '100%',
                                    }}
                                    options={
                                        optionsBranches &&
                                        optionsBranches?.map((v) => ({
                                        value: v.id,
                                        label: `${v.name}`,
                                        })
                                        )
                                    }
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </Spin>
        </Modal>
    )
}
