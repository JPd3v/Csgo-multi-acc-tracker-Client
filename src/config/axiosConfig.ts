import axios, { AxiosResponse } from 'axios';

const axiosConfig = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.url?.includes('/users/refresh-token')) {
      axiosConfig.defaults.headers.common.Authorization = `Bearer ${response.data}`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
