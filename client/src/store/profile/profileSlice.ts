import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/IUserInfo";
import { IRegisterUser, ILoginUser } from "shared";
import { RootState } from "../store";
import { queryNames } from "../../constants/graphql";
import { endpointNames } from "shared";
import { request } from "../../services/graphql";
import { apiUrl } from "../../env/env";

interface ProfileState {
  user: IUserInfo | null;
  authInfo: AuthInfo;
}

const initialState: ProfileState = {
  user: null,
  authInfo: {
    accessToken: null,
    refreshToken: null,
    userId: null,
  },
};

const LOGIN_QUERY = `
  mutation ${queryNames.LOGIN_PROFILE} ($email: String!, $password: String!) {
    ${endpointNames.profile.login}(email: $email, password: $password) {
      tokens {
        accessToken,
        refreshToken
      },
      user {
        id,
        username,
        email
      }
    }
  }
`;

export const login = createAsyncThunk<ProfileState, ILoginUser>(
  "profile/login",
  async (loginData) => {
    const response = await request(apiUrl, {
      query: LOGIN_QUERY,
      variables: { ...loginData },
    });
    const state: ProfileState = {
      user: response.data.data[endpointNames.profile.login].user,
      authInfo: {
        accessToken:
          response.data.data[endpointNames.profile.login].tokens.accessToken,
        refreshToken:
          response.data.data[endpointNames.profile.login].tokens.refreshToken,
        userId: response.data.data[endpointNames.profile.login].user.id,
      },
    };
    return state;
  }
);

const REGISTER_QUERY = `
  mutation ${queryNames.REGISTER_PROFILE} ($username: String!, $email: String!, $password: String!) {
    ${endpointNames.profile.register}(username: $username, email: $email, password: $password) {
      tokens {
        accessToken,
        refreshToken
      },
      user {
        id,
        username,
        email
      }
    }
  }
`;

export const register = createAsyncThunk<ProfileState, IRegisterUser>(
  "profile/register",
  async (registerData) => {
    const response = await request(apiUrl, {
      query: REGISTER_QUERY,
      variables: { ...registerData },
    });
    const state: ProfileState = {
      user: response.data.data[endpointNames.profile.register].user,
      authInfo: {
        accessToken:
          response.data.data[endpointNames.profile.register].tokens.accessToken,
        refreshToken:
          response.data.data[endpointNames.profile.register].tokens
            .refreshToken,
        userId: response.data.data[endpointNames.profile.register].user.id,
      },
    };
    return state;
  }
);

const refreshQuery = `
  mutation ${queryNames.REFRESH_TOKENS} ($refreshToken: String!, $userId: ID!) {
    ${endpointNames.profile.refreshTokens}(refreshToken: $refreshToken, userId: $userId) {
      accessToken,
      refreshToken
    }
  }
`;
export const refreshTokens = createAsyncThunk<
  {
    accessToken: null;
    refreshToken: null;
  },
  { refreshToken: string; userId: string }
>("profile/refreshTokens", async ({ refreshToken, userId }) => {
  console.log("refresh");

  const response = await request(apiUrl, {
    query: refreshQuery,
    variables: { refreshToken, userId },
  });

  return response.data.data[endpointNames.profile.refreshTokens];
});

interface AuthInfo {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

const AUTH_INFO_ITEM_NAME = "authInfo";
const saveAuthInfo = (authInfo: AuthInfo): void => {
  localStorage.setItem(AUTH_INFO_ITEM_NAME, JSON.stringify(authInfo));
};

const retrieveAuthInfo = (): AuthInfo => {
  const authInfo = localStorage.getItem(AUTH_INFO_ITEM_NAME);
  if (!authInfo) {
    return {
      accessToken: null,
      refreshToken: null,
      userId: null,
    };
  }
  return JSON.parse(authInfo);
};

const deleteAuthInfo = (): void => {
  localStorage.removeItem(AUTH_INFO_ITEM_NAME);
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout(state) {
      state.authInfo = { accessToken: null, refreshToken: null, userId: null };
      state.user = null;
      deleteAuthInfo();
    },
    removeStaleAccessToken(state) {
      state.authInfo.accessToken = null;
      saveAuthInfo(state.authInfo);
    },
  },
  extraReducers(builder) {
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.authInfo.accessToken = action.payload.accessToken;
      state.authInfo.refreshToken = action.payload.refreshToken;
      saveAuthInfo(state.authInfo);
    });
    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (state, action) => {
        saveAuthInfo(action.payload.authInfo);
        return action.payload;
      }
    );
  },
});

// selector for selecting user
export const selectUser = (state: RootState) => state.profile.user;
export const { logout, removeStaleAccessToken } = profileSlice.actions;
export default profileSlice.reducer;
