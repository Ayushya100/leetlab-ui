import axiosInstance from './apiClient.service';

const accountsAPI = '/accounts-svc/api/v1.0';

const routesService = {
  fetchAllRoutes: async () => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/route`);
    return response.data.data;
  },

  fetchRouteById: async (routeId: string) => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/route/${routeId}`);
    return response.data.data;
  },

  updateRouteById: async (routeId: string, routeData: any) => {
    const response = await axiosInstance.put(`${accountsAPI}/setup/route/${routeId}`, routeData);
    return response.data.data;
  },

  registerRoute: async (routeData: any) => {
    const response = await axiosInstance.post(`${accountsAPI}/setup/route`, routeData);
    return response.data.data;
  },

  deleteRoute: async (routeId: string) => {
    const response = await axiosInstance.delete(`${accountsAPI}/setup/route/${routeId}`);
    return response.data.data;
  },
};

export default routesService;
