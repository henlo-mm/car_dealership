import { Modal, Form, Spin, Input, Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import { createWorkOrder, updateWorkOrder } from '../../../services/work_orders';


export const UsersModal = ({ isVisible, onConfirm, onCancel, workOrderData,  onWorkOrderUpdate }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (workOrderData && isVisible) {
            //Si hay data entonces configure la data
            form.setFieldsValue(workOrderData)
        }
    }, [workOrderData])


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

            if (workOrderData) {
                await updateWorkOrder(workOrderData.id, values);
            } else {
                await createWorkOrder(values);
            }

            onWorkOrderUpdate();
            
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
            id: 1,
            name: 'Sucursal A',
        },
        {
            id: 2,
            name: 'Sucursal B',
        },
        {
            id: 3,
            name: 'Sucursal C',
        },
        // Agrega más datos de usuarios aquí
    ];

    const optionsRoles = [
        {
            id: 1,
            name: 'Gerente',
        },
        {
            id: 2,
            name: 'Vendedor',
        },
        {
            id: 3,
            name: 'Jefe de Taller',
        },
        {
            id: 4,
            name: 'Cliente',
        },
    ]

    return (
        <Modal
            title={workOrderData ? "Editar usuario" : "Crear usuario"}
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
                                    name="vehicle"
                                    label={<label className="form-label"> Vehiculo  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Vehiculo'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="customer"
                                    label={<label className="form-label"> Cliente </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Cliente'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="workshop_manager"
                                    label={<label className="form-label"> Gerente de la orden </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Gerente de la orden'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="description"
                                    label={<label className="form-label"> Descripción  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Descripción'
                                    />
                                </Form.Item>
                            </div>
                           
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="comments"
                                    label={<label className="form-label"> Comentarios </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Comentarios'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="start_date"
                                    label={<label className="form-label"> Fecha de inicio  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Fecha de inicio'
                                    />
                                </Form.Item>
                            </div>    
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="status"
                                    label={<label className="form-label"> Estado </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Estado'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="is_available"
                                    label={<label className="form-label"> Está disponible  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='true / false'
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
