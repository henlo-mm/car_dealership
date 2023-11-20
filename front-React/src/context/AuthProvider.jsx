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
            console.log("se salio en: ROLES_ROUTES[rol] ")
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
        console.log("response",response)
        const user = {
            id: response?.user?.id,
            email: response?.user?.email,
            branch: response?.user?.branch,
            token: response?.token,
            role: response?.user?.role,
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
                console.log("se salio en: !token || !userData ")
                logout()
                return;
            }

            try {
                changeLoading();
                const value = JSON.parse(userData);
                setUser(value)
                !location.pathname?.includes(ROLES_ROUTES[value.role]) && navigateTo(value.role)
            } catch (e) {
                console.log("se salio en: catch (e)", e)
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
