
import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Spin, Steps, Switch, message } from 'antd'
import { UserOutlined, CarOutlined, CheckOutlined } from '@ant-design/icons';


const { Step } = Steps;
const { Option } = Select;

const steps = [
  {
    title: 'Usuario',
    content: 'UsuarioContent',
  },
  {
    title: 'Cotización',
    content: 'CotizacionContent',
  },
  {
    title: 'Confirmación',
    content: 'ConfirmacionContent',
  },
];


export const QuotationsModal = ({ isVisible }) => {

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSwitchChange = (checked) => {
    setUsuarioCreado(checked);
  };

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = (values) => {
    // Aquí puedes enviar los datos al servidor
    console.log(values)
    message.success('Formulario completado con éxito');
  };



  const UsuarioContent = () => (
    <>
      <Form.Item label="¿Usuario creado?" name="usuarioCreado" valuePropName="checked">
        <Switch onChange={handleSwitchChange} />
      </Form.Item>
      {
        usuarioCreado ? (
          <Form.Item label="Seleccionar usuario" name="usuario">
            <Select placeholder="Seleccionar usuario">
              <Option value="usuario1">Usuario 1</Option>
              <Option value="usuario2">Usuario 2</Option>
              {/* Agrega más opciones según sea necesario */}
            </Select>
          </Form.Item>
        ) : (
          <>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Ingrese el nombre' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Apellido" name="apellido" rules={[{ required: true, message: 'Ingrese el apellido' }]}>
              <Input />
            </Form.Item>
            {/* Agrega más campos según sea necesario */}
          </>
        )
      }
    </>
  );

  const CotizacionContent = () => (
    <>
      <Form.Item label="Precio" name="precio" rules={[{ required: true, message: 'Ingrese el precio' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Auto" name="auto" rules={[{ required: true, message: 'Ingrese el auto' }]}>
        <Input />
      </Form.Item>
      {/* Agrega más campos según sea necesario */}
    </>
  );

  const ConfirmacionContent = () => (
    <>
      {/* Muestra los datos confirmados aquí */}
    </>
  );




  return (
    <Modal
      title={"Registrar cotización"}
      open={isVisible}
      onCancel={console.log("cancelar")}
      width={800}
      footer={false}
    >


    <Spin
    spinning={loading}
    >
      
      </Spin>  
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ usuarioCreado: false }}
      >
        <Steps current={currentStep} size="small" className="steps">
          {steps.map((step) => (
            <Step key={step.title} title={step.title} icon={<UserOutlined />} />
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
    </Modal>
  )
}
