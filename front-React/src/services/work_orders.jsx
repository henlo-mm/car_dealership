import api from '../api/config'; 

export const createWorkOrder = async (data) => {
    try {

      const response = await api.post('/work_orders/', data);
      return response.data;

    } catch (error) {
        console.error('Error al crear una sucursal:', error);
    }
};

export const getWorkOrders = async () => {
    try {
      const response = await api.get('/work_orders/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las órdenes de trabajo:', error);
    }
};
  
export const getWorkOrder = async (workOrderId) => {
    try {
      const response = await api.get(`/work_orders/${workOrderId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener la orden de trabajo:', error);
    }
};

export const getWorkOrdersByUserDocument = async (userDocument) => {
  try {
    const response = await api.get('/work_orders/list_by_user_document/', {
        params: { 
          document: userDocument 
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes de trabajo:', error);
  }
};

export const getWorkOrdersByCarPlate = async (carPlate) => {
  try {
    const response = await api.get('/work_orders/list_by_car_plate/', {
      params: { 
        car_plate: carPlate 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes de trabajo:', error);
  }
};

  
export const updateWorkOrder = async (workOrderId, workOrderData) => {
    try {
        const response = await api.patch(`/work_orders/${workOrderId}/`, workOrderData);
        return response.data;
    } catch (error) {
      console.error('Error al actualizar la orden de trabajo:', error);
    }
};
  
export const deleteWorkOrder = async (workOrderId) => {
    try {
        const response = await api.delete(`/work_orders/${workOrderId}/`);
        return response.data;
    } catch (error) {
      console.error('Error al eliminar la orden de trabajo:', error);
    }
};