import { Modal, Form, Spin, Input, Button, notification } from 'antd';
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

    return (
        <Modal
            title="gestionar usuario"
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
                                    name="email"
                                    label={<label className="form-label"> Email usuario  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='nombre'
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
