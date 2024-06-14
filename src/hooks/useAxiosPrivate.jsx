import axios from "axios";
import { BASE_URL } from "../constent/constent";

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosPrivate.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosPrivate.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post('http://localhost:5000/jwt/refresh', {}, { withCredentials: true });
                if (res.data.success) {
                    return axiosPrivate(originalRequest);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const useAxiosPrivate = () => {
    return axiosPrivate;
};

export default useAxiosPrivate;