import axiosInstance from './apiClient.service';

const accountsAPI = '/accounts-svc/api/v1.0';

const serviceConfigurations = {
  fetchAllServices: async () => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/service`);
    return response.data.data;
  },

  fetchServiceById: async (serviceId: string) => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/service/${serviceId}`);
    return response.data.data;
  },

  updateServiceById: async (serviceId: string, serviceData: any) => {
    const response = await axiosInstance.put(`${accountsAPI}/setup/service/${serviceId}`, serviceData);
    return response.data.data;
  },

  registerService: async (serviceData: any) => {
    const response = await axiosInstance.post(`${accountsAPI}/setup/service`, serviceData);
    return response.data.data;
  },

  deleteServiceById: async (serviceId: string) => {
    const response = await axiosInstance.delete(`${accountsAPI}/setup/service/${serviceId}`);
    return response.data.data;
  },
};

export default serviceConfigurations;
