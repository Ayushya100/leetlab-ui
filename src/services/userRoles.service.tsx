import axiosInstance from './apiClient.service';

const accountsAPI = '/accounts-svc/api/v1.0';

const userRoleService = {
  fetchAllUserRole: async () => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/role`);
    return response.data.data;
  },

  fetchUserRoleById: async (id: string) => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/role/${id}`);
    return response.data.data;
  },

  fetchUserAssignedScopes: async (roleId: string) => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/scope/assigned/${roleId}`);
    return response.data.data;
  },

  fetchUserUnassignedScopes: async (roleId: string) => {
    const response = await axiosInstance.get(`${accountsAPI}/setup/scope/unassigned/${roleId}`);
    return response.data.data;
  },

  updateUserAssignedScopes: async (roleId: string, assignedScopes: Array<string>) => {
    const response = await axiosInstance.put(`${accountsAPI}/setup/scope/assigned/${roleId}`, {
      scopes: assignedScopes,
    });
    return response.data.data;
  },

  registerUserRole: async (roleData: any) => {
    const response = await axiosInstance.post(`${accountsAPI}/setup/role`, roleData);
    return response.data.data;
  },

  updateUserRole: async (roleId: string, roleData: any) => {
    const response = await axiosInstance.put(`${accountsAPI}/setup/role/${roleId}`, roleData);
    return response.data.data;
  },

  deleteUserRole: async (roleId: string) => {
    const response = await axiosInstance.delete(`${accountsAPI}/setup/role/${roleId}`);
    return response.data.data;
  },
};

export default userRoleService;
