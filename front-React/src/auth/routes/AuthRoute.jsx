import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages"



export const AuthRoute = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}