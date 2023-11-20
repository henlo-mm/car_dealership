import api from '../api/config'; 

export const createSale = async (data) => {
    try {

      const response = await api.post('/sales/', data);
      return response.data;

    } catch (error) {
        console.error('Error al crear una sucursal:', error);
    }
};

export const getSales = async () => {
    try {
      const response = await api.get('/sales/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las órdenes de trabajo:', error);
    }
};
  
export const getSale = async (saleId) => {
    try {
      const response = await api.get(`/sales/${saleId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la orden de trabajo:', error);
    }
};
  
export const updateWorkOrder = async (workOrderId, workOrderData) => {
    try {
        const response = await api.put(`/work_orders/${workOrderId}/`, workOrderData);
        return response.data;
    } catch (error) {
      console.error('Error al actualizar la orden de trabajo:', error);
    }
};
  
export const deleteSale = async (saleId) => {
    try {
        const response = await api.delete(`/sales/${saleId}/`);
        return response.data;
    } catch (error) {
      console.error('Error al eliminar la orden de trabajo:', error);
    }
};