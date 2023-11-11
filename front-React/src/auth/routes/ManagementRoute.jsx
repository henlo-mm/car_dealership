import { Navigate, Route, Routes } from "react-router-dom"
import React from 'react'
import { UsersView } from "../../modules/users/pages/UsersView"
import { PartsView } from "../../modules/parts/pages/PartsView"
import { VehiclesView } from "../../modules/vehicles/pages/VehiclesView"
import { BranchesView } from "../../modules/branches/pages/BranchesView"
import { WorkOrdersView } from "../../modules/workOrders/pages/WorkOrdesView"
import { QuotationsView } from "../../modules/quotations/pages/QuotationsView"
import { DashboardView } from "../../modules/dashboard/pages/DashboardView"
import { SalesView } from "../../modules/sells/pages/SalesView"


export const ManagementRoute = () => {
  return (
    <Routes>
      <Route path='/users' element={<UsersView />} />
      <Route path='/parts' element={<PartsView />} />
      <Route path='/vehicles' element={<VehiclesView />} />
      <Route path='/branches' element={<BranchesView />} />
      <Route path='/workshop' element={<WorkOrdersView />} />
      <Route path='/sales' element={<SalesView />} />
      <Route path='/quotations' element={<QuotationsView />} />
      <Route path='/dashboard' element={<DashboardView />} />
      {/* <Route path='/inventory-parts/' element={<UsersView />}/>
        <Route path='/inventory-vehicles/' element={<UsersView />}/>
        <Route path='/sells/' element={<UsersView />}/>
        <Route path='/quotations/' element={<UsersView />}/> */}
    </Routes>
  )
}
