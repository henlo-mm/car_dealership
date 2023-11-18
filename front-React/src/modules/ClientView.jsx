import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../core/sidebar/Sidebar';

import './../styles/sidebar.css'
import { Content, Header } from 'antd/es/layout/layout';
import { Route, Routes } from 'react-router-dom';
import { ManagementRoute } from '../auth/routes/ManagementRoute';


export const Clientview = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
   
        <Sidebar />
    
      <Layout>
        <Header style={{ background: 'transparent', padding: 0 }}>
          {/* Aquí puedes agregar el encabezado de tu aplicación */}
        </Header>
        <Content style={{ margin: '16px' }}>
          {/* Aquí coloca el contenido principal de tu aplicación */}
          {
            <Routes>
              <Route path='/management/*' element={<ManagementRoute />} />
            </Routes>
          }
        </Content>
      </Layout>
    </Layout>

  )
}
