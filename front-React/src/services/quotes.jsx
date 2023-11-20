import api from '../api/config';


export const getQuotes = async () => {
    try {
      const response = await api.get('/quotes/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las órdenes de trabajo:', error);
    }
  };