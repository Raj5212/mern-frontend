import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mern-backend-fffm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendData = async (data) => {
  const response = await api.post('/user/create', data);
  return response.data;
};

export const getData = async (id) => {
  const response = await api.get(`/api/user/${id}`);
  return response.data;
};

export default api;
