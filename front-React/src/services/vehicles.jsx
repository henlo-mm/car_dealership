import api from '../api/config'; 

export const createVehicle = async (data) => {
    try {

      const response = await api.post('/vehicles/', data);
      return response.data;

    } catch (error) {
        console.error('Error al crear una sucursal:', error);
    }
};

export const getvehicles = async () => {
    try {
      const response = await api.get('/vehicles/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las sucursales:', error);
    }
};
  
export const getVehicle = async (vehicleId) => {
    try {
      const response = await api.get(`/vehicles/${vehicleId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el vehículo:', error);
    }
};
  
export const updateVehicle = async (vehicleId, vehicleData) => {
    try {
        const response = await api.patch(`/vehicles/${vehicleId}`, vehicleData);
        return response.data;
    } catch (error) {
      console.error('Error al actualizar el vehículo:', error);
    }
};
  
export const deleteVehicle = async (vehicleId) => {
    try {
        const response = await api.delete(`/vehicles/${vehicleId}`);
        return response.data;
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
    }
};