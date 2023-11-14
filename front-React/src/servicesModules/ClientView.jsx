import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../core/sidebar/Sidebar';

import './../styles/sidebar.css'
import { Footer } from '../core/footer/Footer';
import { Header } from '../core/header/Header';

import { Row, Col, Card, Form, Input, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Route, Routes } from 'react-router-dom';
import { ManagementRoute } from '../auth/routes/ManagementRoute';


export const Clientview = () => {
  return (
    <div>
      <Header />
      <Row justify="center" align="middle" style={{ minHeight: '90vh' }} className="back-byw">
        <Col xs={24} sm={16} md={12} lg={10} >
          <Card title="Bienvenido de nuevo" extra={"Inicia sesión para seguir"}>
            
            <Form
              name="loginForm"
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
                <a href="#">Consultar servicios</a>
              </div>
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
}
