import api from '../api/config'

export const createPart = async (data) => {
    try {
        const response = await api.post('/parts/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear un nuevo repuesto:', error);
    }
};

export const getParts = async () => {
    try {
      const response = await api.get('/parts/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener el listado de repuestos:', error);
    }
};

export const getPart = async (partId) => {
    try {
      const response = await api.get(`/parts/get/${partId}/`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener un repuesto:', error);
    }
};

export const updatePart = async (partId, partData) => {
    try {
        const response = await api.put(`/parts/update/${partId}`, partData);
        return response.data;
    } catch (error) {
      console.error('Error al actualizar el repuesto:', error);
    }
};

export const deletePart = async (partId) => {
    try {
        const response = await api.delete(`/parts/delete/${partId}`);
        return response.data;
    } catch (error) {
      console.error('Error al eliminar el repuesto:', error);
    }
};

