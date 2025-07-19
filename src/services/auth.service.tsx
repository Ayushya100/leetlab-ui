import axiosInstance from './apiClient.service';
import { storageKeys } from '@/utils/constants';

const accountsAPI = '/accounts-svc/api/v1.0';

const authService = {
  login: async (credentials: any) => {
    const response = await axiosInstance.post(`${accountsAPI}/login`, credentials);

    if (response.data?.data?.accessToken) {
      localStorage.setItem(storageKeys.ACCESS_TOKEN, response.data.data.accessToken);
    }
    if (response.data?.data?.refreshToken) {
      localStorage.setItem(storageKeys.REFRESH_TOKEN, response.data.data.refreshToken);
    }
    return response.data;
  },
};

export default authService;
