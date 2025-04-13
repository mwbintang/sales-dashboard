import api from '../axios';

export const login = async (question) => {
  const response = await api.post('ai', { question });
  return response.data;
};