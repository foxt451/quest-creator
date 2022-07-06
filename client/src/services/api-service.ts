import axios from "axios";
import { logout } from "../store/profile/profileSlice";
import { store } from "../store/store";

const instance = axios.create({
  headers: {},
});
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async post(url: string, data: Record<string, unknown>): Promise<any> {
    const response = await instance.post(url, data);
    return response;
  },
};
