import React from 'react';
import { Row, Col, Card, Form, Input, Button } from 'antd';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

 export const LoginPage = () => {
  const navigate = useNavigate();
  
  const onFinish = async (values) => {

    try {

      const response = await login(values);

      console.log(response)

      localStorage.setItem('token', response.token);

      navigate('/client/main');

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={10}>
        <Card title="Bienvenido de nuevo">
          <Form
            name="loginForm"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Correo Electrónico"
              name="email"
              rules={[
                { required: true, message: 'Por favor ingresa tu correo electrónico' },
                { type: 'email', message: 'Ingresa un correo electrónico válido' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
