import { Navigate, Route, Routes } from "react-router-dom"
import { Clientview } from "../../servicesModules/ClientView"

export const Servicesroute = () => {
  return (
    <Routes>
            <Route path="/services/*" element={<Clientview />} />
            <Route path="/*" element={<Clientview />} />
    </Routes>
  )
}
