import axios from 'axios';

// Utils
import { storageKeys } from '@/utils/constants';

// Stores
import { useToastStore } from '@/stores/toastStore';
import { useLoadingStore } from '@/stores/loaderStore';

const protocol = import.meta.env.VITE_PROTOCOL;
const host = import.meta.env.VITE_HOST;
const port = import.meta.env.VITE_GATEWAY_PORT;
const API_URL = `${protocol}://${host}:${port}`;

// Build Axios Instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false, // credential to be made as true when CORS origin creds will be reverted from '*' to specific route
  timeout: 100000,
});

const defaultHeaders = {
  accept: 'application/json',
  contentType: 'application/json',
};

const { showLoader, hideLoader } = useLoadingStore.getState();

axiosInstance.interceptors.request.use(
  (config) => {
    showLoader();

    config.headers['Accept'] = defaultHeaders.accept;
    config.headers['Content-Type'] = defaultHeaders.contentType;

    const token = localStorage.getItem(storageKeys.ACCESS_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    useToastStore.getState().showToast(response.data.message, response.data.statusCode, 'success');
    hideLoader();
    return response;
  },
  (error) => {
    useToastStore.getState().showToast(error.response.data.message, error.response.data.statusCode, 'error');
    hideLoader();
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
