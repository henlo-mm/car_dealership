import api from '../api/config';

export const createQuote = async (userData, quoteData) => {
    try {

      const formData = new FormData();

      for (const [key, value] of userData.entries()) {
        formData.append(key, value);
      }

      for (const [key, value] of quoteData.entries()) {
        formData.append(key, value);
      }

      const response = await api.post('/quotes/', formData);

      return response.data;
    } catch (error) {
      console.error('Error al crear la cotización:', error);
    }
};

export const getQuotes = async () => {
    try {
      const response = await api.get('/quotes/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las cotizaciones:', error);
    }
};

  
export const updateQuote = async (quoteId, quoteData) => {
  try {
    const response = await api.put(`/quotes/${quoteId}/`, quoteData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la cotización:', error);
  }
};

export const deleteQuote = async (quoteId) => {
    try {
      const response = await api.delete(`/quotes/${quoteId}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar las cotización:', error);
    }
};