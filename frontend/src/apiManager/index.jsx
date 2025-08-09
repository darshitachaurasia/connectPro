import axios from "axios";
import toast from "react-hot-toast";

import { USER_STORE_PERSIST } from "../const";
import { BASE_URL } from "../const/env.const.js";
import { getToken, removeToken } from "../helper";


const AxiosInstance = axios.create({
    baseURL: BASE_URL,
});

AxiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { data, status } = error.response;
            if (data && (data.success === false || data.success === "false")) {
                const message = data.message;
                message ? toast.error(message) : toast.error("Something went wrong");
                if (status === 401) {
                    removeToken();
                    sessionStorage.removeItem(USER_STORE_PERSIST);
                    window.location.href = "/login";
                }
            } else {
                toast.error("Something went wrong");
            }
        } else {
            toast.error("Network error or no response from server");
        }
        throw error;
    }
);

export default AxiosInstance;
