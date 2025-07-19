import axiosInstance from './apiClient.service';

const accountsAPI = '/accounts-svc/api/v1.0';

const userScopeService = {
    fetchAllUserScope: async() => {
        const response = await axiosInstance.get(`${accountsAPI}/setup/scope`);
        return response.data.data;
    },

    fetchUserScopeById: async(scopeId: string) => {
        const response = await axiosInstance.get(`${accountsAPI}/setup/scope/${scopeId}`);
        return response.data.data;
    },

    updateUserScopeById: async(scopeId: string, scopeData: any) => {
        const response = await axiosInstance.put(`${accountsAPI}/setup/scope/${scopeId}`, scopeData);
        return response.data.data;
    },

    registerUserScope: async(scopeData: any) => {
        const response = await axiosInstance.post(`${accountsAPI}/setup/scope`, scopeData);
        return response.data.data;
    },

    deleteUserScope: async(scopeId: string) => {
        const response = await axiosInstance.delete(`${accountsAPI}/setup/scope/${scopeId}`);
        return response.data.data;
    }
};

export default userScopeService;
