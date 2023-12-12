import api from '../api/config'; 

export const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error
    }
};

export const validateCaptcha = async (value) => {
    try {
      const response = await api.post('/captcha/verify', value);
      return response.data;
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error
    }
};