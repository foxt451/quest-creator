import { logout, removeAccessToken } from "../../store/profile/profileSlice";
import { refreshTokens } from "../../store/profile/thunks";
import { store } from "../../store/store";
import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create();

instance.interceptors.request.use(function (config) {
  const token = store.getState().profile.tokens.accessToken;
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
  async function (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        store.dispatch(removeAccessToken());
        // try to refresh token and repeat request if successful
        const { refreshToken } = store.getState().profile.tokens;
        const userId = store.getState().profile.user
          ? store.getState().profile.user?.id
          : null;
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
  }
);
