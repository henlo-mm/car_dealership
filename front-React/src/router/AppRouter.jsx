import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { AuthRoute } from '../auth/routes/AuthRoute';
import { Mainroute } from '../auth/routes/Mainroute';
import { Servicesroute } from '../auth/routes/ServicesRoute';

export const AppRouter = () => {
  return (
    <Routes>
         {/* Logon y registro de usuarios */}
         <Route path='/auth/*' element={<AuthRoute />} />
         <Route path='/*' element={<Servicesroute />} />
         {/*  Auto Hous Routes */}
         {/*  Auto HousRoute:Client */}
         <Route path='/client/*' element={<Mainroute />} />
    </Routes>
  )
}
