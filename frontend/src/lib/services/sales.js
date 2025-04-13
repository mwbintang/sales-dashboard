import api from '../axios';

export const getDataSales = async () => {
  const response = await api.get('data');
  return response.data;
};