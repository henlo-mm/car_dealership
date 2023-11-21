import { Modal, Form, Spin, Input, Button, notification, Select, Switch, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { createSale } from '../../../services/sales';
import { getvehicles } from '../../../services/vehicles';
import { getUsers } from '../../../services/user';
import dayjs from 'dayjs';

export const SalesModal = ({ isVisible, onConfirm, onCancel, onSaleUpdate }) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);
    const [vehiclesList, setVehiclesList] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersSeller, setusersSeller] = useState([]);


    const fetchData = async () => {
        try {
            const vehicles = await getvehicles();
            setVehiclesList(vehicles.filter((car) => car.is_for_sale == true));
            const usersList = await getUsers();
            setUsersData(usersList.filter((user) => user.role == 4));
            setusersSeller(usersList.filter((user) => user.role == 2));
        } catch (error) {
            console.error('Error branch list:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    const onClose = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
    }

    const handleNumberChange = (e) => {
      const { value } = e.target;
  
      // Elimina caracteres no numéricos y obtiene el valor como número
      const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
  
      // Formatea el número como precio
      const formattedValue = numericValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
  
      // Actualiza el valor en el campo de entrada
      e.target.value = formattedValue;
    };

    const onSubmit = async (values) => {

        setLoading(true);

        try {


          await createSale({
              ...values,
              sale_date: dayjs(values.sale_date).format('YYYY-MM-DD'),
          });

          onSaleUpdate();

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
            title="Crear Venta"
            open={isVisible}
            onCancel={onClose}
            // onOk={() => {validateForm}}
            width={800}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="edit" type='primary' onClick={form.submit}>
                    Aceptar
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
                                    name="seller"
                                    label={<label className="form-label"> Vendedor</label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={
                                          usersSeller &&
                                          usersSeller?.map((v) => ({
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
                                    name="client"
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
                                    name="price"
                                    label={<label className="form-label"> Precio </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                >
                                    <Input
                                      onChange={handleNumberChange}
                                      placeholder="Escribe un número"
                                    />
                                </Form.Item>
                            </div>

                            <div className='col-12 col-md-6'>
                                <Form.Item
                                    name="sale_date"
                                    label={<label className="form-label"> Fecha de la venta  </label>}
                                    rules={[{ required: false, message: 'campo obligatorio' }]}
                                // valuePropName='dateElement'
                                // normalize={(dateElement) => dayjs(dateElement).format('YYYY-MM-DD')}
                                >
                                    <DatePicker
                                        picker='date'
                                        className='form-control'
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
