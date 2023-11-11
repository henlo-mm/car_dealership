import api from '../api/config'; 

export const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error
    }
};