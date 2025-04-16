import api from '../axios';

export const askAi = async (question) => {
  const response = await api.post('ai', { question });
  return response.data;
};