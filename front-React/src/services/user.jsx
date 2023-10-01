import api from '../api/config'; 

export const createUser = async (data) => {
    try {

      const response = await api.post('/users/create', data);
      return response.data;

    } catch (error) {
        console.error('Error al crear un usuario:', error);
    }
};

export const getUsers = async () => {
    try {
      const response = await axios.get('/users/');
      return response.data;
    } catch (error) {
      throw error;
    }
};
  
export const getUser = async (userId) => {
    try {
      const response = await axios.get(`/users/get/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
};
  
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`/users/update/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
  
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`/users/delete/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};