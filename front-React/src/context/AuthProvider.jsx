import { createContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { login as loginservice } from '../services/auth';

export const AuthContex = createContext();

const ROLES_ROUTES = {
    1: "/client/main/management/dashboard",
    2: "/client/main/management/sales",
    3: "/client/main/management/workshop",
}

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const changeLoading = (value = false) => setIsLoading(!value);

    const navigateTo = (rol) => {
        const route = ROLES_ROUTES[rol]
        if (route) {
            navigate(route);
        } else {
            logout()
        }
    }

    const logout = () => {
        changeLoading();
        setUser({})
        localStorage.clear();
        navigate('/');
    }

    const login = async (values) => {
        const response = await loginservice(values);
        const user = {
            token: response?.token,
            role: response?.user?.role,
            role_name: response?.user?.role_name,
            name: response?.user?.name,
            lastname: response?.user?.lastname || '',
            avatar: response?.user?.avatar,
        }
        localStorage.setItem('token', user?.token);
        localStorage.setItem('userData', JSON.stringify(user));
        setUser({ ...user });
        navigateTo(response?.user?.role)
    }

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("userData");
            if (!token || !userData) {
                logout()
                return;
            }

            try {
                changeLoading();
                setUser({ ...JSON.parse(userData) })
                !location.pathname?.includes(ROLES_ROUTES[role]) && navigateTo(role)
            } catch (e) {
                logout();
            }
        })()
    }, [])



    return <AuthContex.Provider value={{
        user,
        isLoading,
        logout,
        login
    }}>
        {children}
    </AuthContex.Provider>
}
