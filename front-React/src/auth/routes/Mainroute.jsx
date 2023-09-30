import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages"
import { Clientview } from "../../modules/ClientView"

export const Mainroute = () => {
  return (
    <Routes>
            <Route path="/main/*" element={<Clientview />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
