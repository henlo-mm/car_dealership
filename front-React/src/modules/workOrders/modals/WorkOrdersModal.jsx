import { Modal, Form, Spin, Input, Button, notification, Select, Switch, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { createWorkOrder, updateWorkOrder } from '../../../services/work_orders';
import { getvehicles } from '../../../services/vehicles';
import { StatusWorkOrdersList } from '../.config/workOrdersStatusList'
import { getUsers } from '../../../services/user';
import dayjs from 'dayjs';

export const WorkOrdersModal = ({ isVisible, onConfirm, onCancel, workOrderData, onWorkOrderUpdate }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [vehiclesList, setVehiclesList] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersTomechanic, setUsersTomechanic] = useState([]);


    const fetchData = async () => {
        try {
            const vehicles = await getvehicles();
            setVehiclesList(vehicles.filter((car) => car.is_for_sale == false));
            const usersList = await getUsers();
            setUsersData(usersList.filter((user) => user.role == 4));
            setUsersTomechanic(usersList.filter((user) => user.role == 3));
        } catch (error) {
            console.error('Error branch list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


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



    const onSubmit = async (values) => {

        setLoading(true);

        try {


            // if (workOrderData) {
            //     await updateWorkOrder(workOrderData.id, values);
            // } else {
            //     await createWorkOrder(values);
            // }

            console.log(values)


            onWorkOrderUpdate();

            form.resetFields();


            if (onConfirm) {
                onConfirm();
            } //todo
            notification.success({
                message: 'Éxito',
                description: 'La petición se ha completado correctamente.',
            });
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Se produjo un error al procesar la solicitud.',
            });
        }
        setLoading(false);
    }

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
                        initialValues={{ is_available: false }}
                    >
                        <div className="row">
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="vehicle"
                                    label={<label className="form-label"> Vehiculo  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            vehiclesList &&
                                            vehiclesList?.map((v) => ({
                                                value: v.id,
                                                label: `${v.model}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="customer"
                                    label={<label className="form-label"> Cliente </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            usersData &&
                                            usersData?.map((v) => ({
                                                value: v.id,
                                                label: `${v.name} ${v.lastName}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="workshop_manager"
                                    label={<label className="form-label"> Gerente de la orden </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            usersTomechanic &&
                                            usersTomechanic?.map((v) => ({
                                                value: v.id,
                                                label: `${v.name} ${v.lastName}`,
                                            })
                                            )
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="status"
                                    label={<label className="form-label"> Estado </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                            StatusWorkOrdersList &&
                                            StatusWorkOrdersList?.map((v) => ({
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
                                    name="start_date"
                                    label={<label className="form-label"> Fecha de inicio  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                    valuePropName='dateElement'
                                    normalize={(dateElement) => dayjs(dateElement).format('YYYY-MM-DD')}
                                >
                                    <DatePicker
                                        picker='date'
                                        className='form-control'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="completion_date"
                                    label={<label className="form-label"> Fecha de entrega  </label>}
                                    valuePropName='dateElement'
                                    normalize={(dateElement) => dayjs(dateElement).format('YYYY-MM-DD')}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <DatePicker
                                        picker='date'
                                        className='form-control'
                                    />
                                </Form.Item>
                            </div>

                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="is_available"
                                    label={<label className="form-label"> Está disponible  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Switch
                                        defaultChecked={false}
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12'>
                                <Form.Item
                                    name="description"
                                    label={<label className="form-label"> Descripción  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Input.TextArea
                                        className='form-control'
                                        placeholder='Descripción'
                                    />
                                </Form.Item>
                            </div>
                            <div className='col-12'>
                                <Form.Item
                                    name="comments"
                                    label={<label className="form-label"> Comentarios </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Input.TextArea
                                        className='form-control'
                                        placeholder='Comentarios'
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
