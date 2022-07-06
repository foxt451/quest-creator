import axios from "axios";
import {
  logout,
  removeAccessToken,
  refreshTokens,
} from "../store/profile/profileSlice";
import { store } from "../store/store";

const instance = axios.create({
  headers: {},
});
instance.interceptors.request.use(function (config) {
  const token = store.getState().profile.authInfo.accessToken;
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      store.dispatch(removeAccessToken());
      // try to refresh token and repeat request if success
      const { refreshToken, userId } = store.getState().profile.authInfo;
      if (refreshToken && userId) {
        try {
          const tokens = await store
            .dispatch(refreshTokens({ refreshToken, userId }))
            .unwrap();
          if (tokens) {
            return instance(error.config);
          } else {
            store.dispatch(logout());
          }
        } catch (e) {
          store.dispatch(logout());
        }
      } else {
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async post<TResult, TBody>(url: string, data: TBody): Promise<TResult> {
    const response = await instance.post<TResult>(url, data);
    return response.data;
  },
};
