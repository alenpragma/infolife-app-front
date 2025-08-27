import axios, { AxiosError } from "axios";

import Cookies from "js-cookie";
import { handleLogout } from "../utils/useHandleLogout";

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000/api/v1`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("infolife");

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

// ================= Response Interceptor =================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {

    if (error.response?.status === 403 || error.response?.status === 401) {

      handleLogout()
    }

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: (error?.response?.data as any)?.message || "Something went wrong",
      errorMessages: (error?.response?.data as any)?.errorMessages,
      success: (error?.response?.data as any)?.success,
    };
    return Promise.reject(responseObject);
  }
);

export default axiosInstance;
