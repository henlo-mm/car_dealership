import api from '../api/config';

<<<<<<< HEAD
=======
// http://3.223.190.219/quotes/
>>>>>>> 8ee618749caf4a63d1915692e08d7457bbcc3e13

export const getQuotes = async () => {
    try {
      const response = await api.get('/quotes/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las órdenes de trabajo:', error);
    }
  };