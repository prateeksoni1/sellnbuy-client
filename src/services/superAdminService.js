import { privateApi } from './api';

export const getAdminRequests = () => {
  return privateApi.get('/superadmin');
};

export const approveRequest = userId => {
  return privateApi.post('/superadmin/approve', { userId });
};
