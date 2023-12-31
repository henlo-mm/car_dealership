import { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './../../styles/login.css';
import { Footer } from '../../core/footer/Footer';
import { Header } from '../../core/header/Header';
import { Link } from 'react-router-dom';
import RecaptchaComponent from './Captcha';


export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleCaptchaSuccess = (isValid) => {
    setIsCaptchaValid(isValid);
  };

  const onFinish = async (values) => { 
    if (isCaptchaValid) {
      try {
        await login(values)
      } catch (error) {
        console.error('Error:', error);
        notification.error({
          message: 'Error en autenticación',
          description: error.message,
        });
      }
    } else {
      notification.error({
        message: 'Error en autenticación',
        description: 'Por favor, verifica que no eres un robot.',
      });
    }
  };

  return (
    <div>
      <Header />
      <Row justify="center" align="middle" style={{ minHeight: '90vh' }} className="back-byw login">
        <Col xs={24} sm={16} md={12} lg={10} >
          <Card title="Bienvenido de nuevo" extra={"Inicia sesión para seguir"}>
            
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
                  { required: true, message: 'Por favor ingresa tu correo electrónico' },
                  { type: 'email', message: 'Ingresa un correo electrónico válido' },
                ]}
              >
                <Input placeholder="Correo@ejemplo.com" />
              </Form.Item>

              <Form.Item
                name="password"
                className='item_icon secure'
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              >
                <Input.Password placeholder="Contraseña" />
              </Form.Item>
              <div className='link_ext'>
                <Link to="/">Consultar servicios</Link>
              </div>

              <Form.Item>
                <RecaptchaComponent onCaptchaSuccess={handleCaptchaSuccess}  />
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


