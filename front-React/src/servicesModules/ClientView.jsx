import React from 'react';
import { Row, Col, Card, Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/login.css';
import { Footer } from '../core/footer/Footer';
import { Header } from '../core/header/Header';

export const Clientview = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => { 
    console.log("entrar")
    try {
      await login(values)
    } catch (error) {
      console.error('Error:', error);
      notification.error({
        message: 'Error en autenticación',
        description: error.message,
      });
    }
  };

  return (
    <div>
      <Header />
      <Row justify="space-around" align="middle" style={{ minHeight: '90vh' }} className="back-byw">
        <Col xs={24} sm={16} md={12} lg={8} >
          <Card title="Consulta tu Orden de trabajo" extra={"Ingresa la matricula del vehiculo"}>
            
            <Form
              name="loginForm"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="matricula"
                className='item_icon'
                rules={[
                  { required: true, message: 'Por favor ingresa la matricula del vehiculo' },
                  { type: 'text', message: 'Por favor ingresa la matricula del vehiculo' },
                ]}
              >
                <Input placeholder="AVC045" />
              </Form.Item>
              <Form.Item  className='btn_entrar'>
                <Button type="primary" htmlType="submit" block>
                  Entrar
                </Button>
              </Form.Item>
            </Form>
            
          </Card>
        </Col>
        <Col xs={24} sm={16} md={12} lg={8} >
          <Card title="Consulta tu cotización" extra={"Ingresa tu cedula"}>
            
            <Form
              name="loginForm"
              onFinish={onFinish}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="email"
                className='item_icon'
                rules={[
                  { required: true, message: 'Por favor ingresa tu cedula' },
                  { type: 'email', message: 'Ingresa una cedula' },
                ]}
              >
                <Input placeholder="1193142564" />
              </Form.Item>

              
              <Form.Item  className='btn_entrar'>
                <Button type="primary" htmlType="submit" block>
                  Entrar
                </Button>
              </Form.Item>
            </Form>
            
          </Card>
        </Col>
      </Row>
      
      <Footer />
    </div>
  );
};


