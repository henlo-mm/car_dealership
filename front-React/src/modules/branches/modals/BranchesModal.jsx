import { Button, Form, Input, Modal, Spin, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { createBranch, updateBranch } from '../../../services/branches';

export const BranchesModal = ({ isVisible, onConfirm, onCancel, branchData, onBranchUpdate }) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (branchData && isVisible) {
            form.setFieldsValue(branchData);
        }
    }, [branchData])

    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
    }

    const onSubmit = async (values) => {
        try {

            setLoading(true);

            if (branchData) {
                await updateBranch(branchData.id, values);
            } else {
                await createBranch(values);
            }

            onBranchUpdate();

            form.resetFields();

            if (onConfirm) {
                onConfirm();
            }
            notification.success('Registro e usuario con exito')

        } catch (error) {
            notification.error('ocurrio un error', error.message)
        }
        setLoading(false);
    }

    return (
        <Modal
            title={branchData ? "Editar sucursal" : "Crear sucursal"}
            open={isVisible}
            onCancel={onClose}
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
            <Spin
                spinning={loading}
            >
                <div className='card-body row'>
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onSubmit}
                    >
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="name"
                                    label={<label className="form-label"> Nombre sucursal  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Nombre'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="address"
                                    label={<label className="form-label"> Direccion  </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Direccion'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="contact_name"
                                    label={<label className="form-label"> Encargado </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Nombre encargado'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="phone"
                                    label={<label className="form-label"> Telefono </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Telefono de sucursal'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="email"
                                    label={<label className="form-label"> Correo Electronico </label>}
                                    rules={[{ required: true, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                        className='form-control'
                                        placeholder='Correo de la sucursal'
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
