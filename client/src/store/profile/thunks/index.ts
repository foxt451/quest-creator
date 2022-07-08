import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpointNames, LoginUser, RegisterUser } from "shared";
import { ENV } from "../../../env/env";
import { request } from "../../../helpers/graphql";
import { LOGIN_QUERY, REFRESH_QUERY, REGISTER_QUERY } from "../../../queries";
import { ProfileState } from "../profileSlice";
import { TokenPair } from "shared";
import { NonNullableProperties } from "shared";

export const login = createAsyncThunk<ProfileState, LoginUser>(
  "profile/login",
  async (loginData) => {
    const response = await request<{
      [endpointNames.profile.login]: ProfileState;
    }>(ENV.API_URL, {
      query: LOGIN_QUERY,
      variables: { ...loginData },
    });
    return response[endpointNames.profile.login];
  }
);

export const register = createAsyncThunk<ProfileState, RegisterUser>(
  "profile/register",
  async (registerData) => {
    const response = await request<{
      [endpointNames.profile.register]: ProfileState;
    }>(ENV.API_URL, {
      query: REGISTER_QUERY,
      variables: { ...registerData },
    });
    return response[endpointNames.profile.register];
  }
);

export const refreshTokens = createAsyncThunk<
  NonNullableProperties<TokenPair>,
  { refreshToken: string; userId: string }
>("profile/refreshTokens", async ({ refreshToken, userId }) => {
  const response = await request<{
    [endpointNames.profile.refreshTokens]: NonNullableProperties<TokenPair>;
  }>(ENV.API_URL, {
    query: REFRESH_QUERY,
    variables: { refreshToken, userId },
  });

  return response[endpointNames.profile.refreshTokens];
});
