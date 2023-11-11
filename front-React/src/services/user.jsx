import api from '../api/config';

export const createUser = async (data) => {
  try {

    const response = await api.post('/users/create', data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;

  } catch (error) {
    console.error('Error al crear un usuario:', error);
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener un usuario:', error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/update/${userId}`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
  }
};