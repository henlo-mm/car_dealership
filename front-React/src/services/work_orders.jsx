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

export const getWorkOrdersByUserDocumentOrCarPlate = async ({ userDocument, carPlate }) => {
  try {

    if (!userDocument && !carPlate) {
      console.error('Se requiere al menos un parámetro');
      return null;
    }

    const response = await api.get('/work_orders/list_by_user_document_or_car_plate/', {
      params: userDocument ? { document: userDocument } : { car_plate: carPlate }
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes de trabajo:', error);
  }
};


export const updateWorkOrder = async (workOrderId, workOrderData) => {
  try {
    const response = await api.put(`/work_orders/${workOrderId}/`, workOrderData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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