import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.223.190.219/',
});

export default api;