
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Spin, Steps, Switch, message } from 'antd'
import { UserOutlined, CarOutlined, CheckOutlined } from '@ant-design/icons';
import { getUsers } from '../../../services/user';
import { getvehicles } from '../../../services/vehicles';
import useAuth from 'auth';



const { Step } = Steps;

const steps = [
  {
    title: 'Usuario',
    content: 'UsuarioContent',
    icon: <UserOutlined />
  },
  {
    title: 'Cotización',
    content: 'CotizacionContent',
    icon: <CarOutlined />
  },
  {
    title: 'Confirmación',
    content: 'ConfirmacionContent',
    icon: <CheckOutlined />
  },
];


export const QuotationsModal = ({ isVisible, onCancel }) => {

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [sellersData, setSellersData] = useState([]);
  const [formData, setFormData] = useState({});
  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const vehicles = await getvehicles();
      setVehiclesData(vehicles.filter((car) => car.is_for_sale == false));
      const usersList = await getUsers();
      setUsersData(usersList.filter((user) => user.role == 4));
      setSellersData(usersList.filter((user) => user.role == 2));
    } catch (error) {
      console.error('Error branch list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSwitchChange = (checked) => {
    setUsuarioCreado(checked);
  };

  const handleNext = () => {
    form.validateFields().then((values) => {
      setFormData((prevData) => ({ ...prevData, ...values }));
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const combineObjects = (objeto1, objeto2) => {
    return {
      oneStepper: objeto1,
      twoStepper: objeto2,
    };
  }

  const handleFinish = (values) => {
    // Aquí puedes enviar los datos al servidor

    console.log(formData)

    if (usuarioCreado) {

      const dataToSend = new FormData();
      const dataToSendQuote = new FormData();
      dataToSend.append("emailuserCreated", formData.usuario)
     
     
      dataToSendQuote.append("price", formData.precio)
      dataToSendQuote.append("description", formData.description)
      dataToSendQuote.append("vehicle", formData.vehicle)
      dataToSendQuote.append("car_plate", formData.car_plate)
      dataToSendQuote.append("car_plate_and_logo_fastening", formData.car_plate_and_logo_fastening)
      dataToSendQuote.append("fire_extinguisher", formData.fire_extinguisher)
      dataToSendQuote.append("first_aid_kit", formData.first_aid_kit)
      dataToSendQuote.append("roadside_kit", formData.roadside_kit)
      dataToSendQuote.append("soat", formData.soat)
      dataToSendQuote.append("window_tint", formData.window_tint)
      dataToSendQuote.append("vehicle", formData.vehicle)
      dataToSendQuote.append("seller", user?.id)

      console.log("user id", user?.id)
      console.log("user id", user?.branch)

      console.log("creamos un usuario nuevo")
      for (const pair of dataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Imprimir los datos en la consola
      console.log("creamos la cotizacion en otro objeto")
      for (const pair of dataToSendQuote.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log(combineObjects(dataToSend, dataToSendQuote))

      // Imprimir los datos en la consola
      console.log("pasamos un usuario ya creado")

      console.log("user id", user)
      for (const pair of dataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
    } else {

      const dataToSendClient = new FormData();
      const dataToSendQuote = new FormData();

      dataToSendClient.append("userId", formData.usuario)
      dataToSendClient.append("address", formData.address)
      dataToSendClient.append("document", formData.document)
      dataToSendClient.append("name", formData.name)
      dataToSendClient.append("lastName", formData.lastName)
      dataToSendClient.append("email", formData.email)
      dataToSendClient.append("role", 4)
      dataToSendClient.append("branch", user.branch)

      dataToSendQuote.append("price", formData.precio)
      dataToSendQuote.append("description", formData.description)
      dataToSendQuote.append("vehicle", formData.vehicle)
      dataToSendQuote.append("car_plate", formData.car_plate)
      dataToSendQuote.append("car_plate_and_logo_fastening", formData.car_plate_and_logo_fastening)
      dataToSendQuote.append("fire_extinguisher", formData.fire_extinguisher)
      dataToSendQuote.append("first_aid_kit", formData.first_aid_kit)
      dataToSendQuote.append("roadside_kit", formData.roadside_kit)
      dataToSendQuote.append("soat", formData.soat)
      dataToSendQuote.append("window_tint", formData.window_tint)
      dataToSendQuote.append("vehicle", formData.vehicle)
      dataToSendQuote.append("seller", user.id)

      console.log("user id", user.id)
      // Imprimir los datos en la consola
      console.log("creamos un usuario nuevo")
      for (const pair of dataToSendClient.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Imprimir los datos en la consola
      console.log("creamos la cotizacion en otro objeto")
      for (const pair of dataToSendQuote.entries()) {
        console.log(pair[0], pair[1]);
      }

      console.log(combineObjects(dataToSendClient, dataToSendQuote))

    }
  };

  const onClose = () => {
    if (onCancel) {
      onCancel();

    }
    setFormData({});
    form.resetFields();
    console.log('se ejecuto el cancelar')
  }


  const UsuarioContent = () => (
    <>
      <Form.Item
        label="¿Usuario creado?"
        name="usuarioCreado"
        valuePropName="checked"
      >
        <Switch onChange={handleSwitchChange} />
      </Form.Item>
      {
        usuarioCreado ? (
          <Form.Item
            label="Seleccionar usuario"
            name="usuario"
          >
            <Select
              placeholder="Seleccionar usuario"
              style={{
                width: '100%',
              }}
              options={
                usersData &&
                usersData?.map((v) => ({
                  value: v.email,
                  label: `${v.name} ${v.lastName}`,
                })
                )
              }
            />
          </Form.Item>
        ) : (
          <>
            <div className="row mt-4'">
              <div className='col-12 col-md-6'>
                <Form.Item
                  name="name"
                  label={<label className="form-label"> Nombre  </label>}
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
                  label={<label className="form-label"> Apellido </label>}
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
                  label={<label className="form-label"> Teléfono 1  </label>}
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
                  label={<label className="form-label"> Teléfono 2  </label>}
                  rules={[{ required: false, message: 'campo obligatorio' }]}
                >
                  <Input
                    className='form-control'
                    placeholder='Telefono 2'
                  />
                </Form.Item>
              </div>
              <div className='col-12 col-md-6'>
                <Form.Item
                  name="address"
                  label={<label className="form-label"> Dirección  </label>}
                  rules={[{ required: true, message: 'campo obligatorio' }]}
                >
                  <Input
                    className='form-control'
                    placeholder='Dirección'
                  />
                </Form.Item>
              </div>

              <div className='col-12 col-md-6'>
                <Form.Item
                  name="email"
                  label={<label className="form-label"> Correo </label>}
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
            </div>
          </>
        )
      }
    </>
  );

  const CotizacionContent = () => (


    // validity = models.IntegerField(null=False)
    // valid_date = models.DateField()

    // car_plate = models.BooleanField(default=False)
    // car_plate_and_logo_fastening = models.BooleanField(default=False)


    <>
      <div className='row mt-4'>
        <div className='col-12 col-md-6'>
          <Form.Item
            label="Precio"
            name="precio"
            rules={[{ required: true, message: 'Ingrese el precio' }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6'>
          <Form.Item
            label="Vehiculo"
            name="vehicle"
            rules={[{ required: true, message: 'Ingrese el auto' }]}
          >
            <Select
              placeholder="Seleccionar usuario"
              style={{
                width: '100%',
              }}
              options={
                vehiclesData &&
                vehiclesData?.map((v) => ({
                  value: v.id,
                  label: `${v.make} ${v.model}`,
                })
                )
              }
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6 d-flex'>
          <Form.Item
            name="soat"
            label={<label className="form-label"> Soat  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={false}
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6'>
          <Form.Item
            name="roadside_kit"
            label={<label className="form-label"> roadside_kit  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={false}
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6 d-flex'>
          <Form.Item
            name="window_tint"
            label={<label className="form-label"> window_tint  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={false}
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6 d-flex'>
          <Form.Item
            name="fire_extinguisher"
            label={<label className="form-label"> fire_extinguisher  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={false}
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6 d-flex'>
          <Form.Item
            name="first_aid_kit"
            label={<label className="form-label"> first_aid_kit  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={true}
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6 d-flex'>
          <Form.Item
            name="car_plate"
            label={<label className="form-label"> car_plate  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={false}
            />
          </Form.Item>
        </div>
        <div className='col-12 col-md-6 d-flex'>
          <Form.Item
            name="car_plate_and_logo_fastening"
            label={<label className="form-label"> car_plate_and_logo_fastening  </label>}
            rules={[{ required: false, message: 'campo obligatorio' }]}
            valuePropName="checked"
            initialValue={false}
          >
            <Switch
              defaultChecked={false}
            />
          </Form.Item>
        </div>
        <div className='col-12'>
          <Form.Item
            name="description"
            label={<label className="form-label"> Descripción </label>}
            rules={[{ required: true, message: 'campo obligatorio' }]}
          >
            <Input.TextArea
              className='form-control'
              placeholder='Descripción'
            />
          </Form.Item>
        </div>

      </div>
    </>
  );

  const ConfirmacionContent = () => (
    <>
      <div className='row mt-4'>
        <div className="alert alert-success alert-dismissible fade show">
          ¡Operación exitosa! Todos los datos se guardaron correctamente.
        </div>
      </div>
    </>
  );




  return (
    <Modal
      title={"Registrar cotización"}
      open={isVisible}
      onCancel={onClose}
      width={800}
      footer={false}
    >

      <div
        className='card-body row'
      >
        <Spin
          spinning={loading}
        >

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              usuarioCreado: false,
            }}
          >
            <Steps current={currentStep} size="small" className="steps">
              {steps.map((step) => (
                <Step key={step.title} title={step.title} icon={step.icon} />
              ))}
            </Steps>

            <div className="steps-content">
              {currentStep === 0 && <UsuarioContent />}
              {currentStep === 1 && <CotizacionContent />}
              {currentStep === 2 && <ConfirmacionContent />}
            </div>

            <div className="steps-action">
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={handleNext}>
                  Siguiente
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              )}
              {currentStep > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
                  Anterior
                </Button>
              )}
            </div>
          </Form>
        </Spin>
      </div>
    </Modal>
  )
}
