import { Navigate, Route, Routes } from "react-router-dom"
import React from 'react'
import { UsersView } from "../../modules/users/pages/UsersView"


export const ManagementRoute = () => {
  return (
    <Routes>
        <Route path='/users' element={<UsersView />}/>
        
        {/* <Route path='/inventory-parts/' element={<UsersView />}/>
        <Route path='/inventory-vehicles/' element={<UsersView />}/>
        <Route path='/sells/' element={<UsersView />}/>
        <Route path='/quotations/' element={<UsersView />}/> */}
    </Routes>
  )
}
