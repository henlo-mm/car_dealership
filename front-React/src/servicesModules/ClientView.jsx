import React, { useState, useEffect }  from 'react';
import { Row, Col, Card, Form, Input, Button, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UsersModal } from '../servicesModules/modals/servicesModolesModal';
import useAuth from '../hooks/useAuth';
import '../styles/login.css';
import { Footer } from '../core/footer/Footer';
import { Header } from '../core/header/Header';

export const Clientview = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleOk = () => {
    setIsModalVisible(false);
    setUserToEdit(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserToEdit(null);
  };
  const refreshTable = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };



  const onSubmit = async (values) => {
    setUserToEdit(values.matricula);
    setIsModalVisible(true);
}

  return (
    <div>
      <Header />
      <Row justify="space-around" align="middle" style={{ minHeight: '90vh' }} className="back-byw login">
        <Col xs={24} sm={16} md={12} lg={8} >
          <Card title="Consulta tu Orden de trabajo" extra={"Ingresa la matricula del vehiculo"}>
            
            <Form
              name="workOrder"
              onFinish={onSubmit}
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
                <Input className='loginForm_matricula' placeholder="AVC-045" />
              </Form.Item>
              <Form.Item  className='btn_entrar'>
                <Button type="primary" htmlType="submit" block>
                  Consultar
                </Button>
              </Form.Item>
            </Form>
            
          </Card>
        </Col>
      </Row>
      
      <Footer />

      <UsersModal
        isVisible={isModalVisible}
        onConfirm={handleOk}
        onCancel={handleCancel}
        userData={userToEdit}
      />
    </div>
  );
};


