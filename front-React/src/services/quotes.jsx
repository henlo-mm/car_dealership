import api from '../api/config';

// http://3.223.190.219/quotes/

export const getQuotes = async () => {
    try {
      const response = await api.get('/quotes/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las órdenes de trabajo:', error);
    }
  };