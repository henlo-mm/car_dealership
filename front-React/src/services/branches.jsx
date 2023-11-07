import api from '../api/config'; 

export const createBranch = async (data) => {
    try {

      const response = await api.post('/branches/', data);
      return response.data;

    } catch (error) {
        console.error('Error al crear una sucursal:', error);
    }
};

export const getBranches = async () => {
    try {
      const response = await api.get('/branches/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las sucursales:', error);
    }
};
  
export const getBranch = async (branchId) => {
    try {
      const response = await api.get(`/branches/${branchId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la sucursal:', error);
    }
};
  
export const updateBranch = async (branchId, branchData) => {
    try {
        const response = await api.patch(`/branches/${branchId}/`, branchData);
        return response.data;
    } catch (error) {
      console.error('Error al actualizar la sucursal:', error);
    }
};
  
export const deleteBranch = async (branchId) => {
    try {
        const response = await api.delete(`/branches/${branchId}`);
        return response.data;
    } catch (error) {
      console.error('Error al eliminar la sucursal:', error);
    }
};