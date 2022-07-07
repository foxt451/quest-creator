import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/UserInfo";
import { IRegisterUser, ILoginUser } from "shared";
import { RootState } from "../store";
import { queryNames } from "../../constants/graphql";
import { endpointNames } from "shared";
import { request } from "../../helpers/graphql";
import { apiUrl } from "../../env/env";

interface ProfileState {
  user: UserInfo | null;
  authInfo: AuthInfo;
}

interface AuthInfo {
  accessToken: string | null;
  refreshToken: string | null;
  userId: string | null;
}

const initialAuthInfo = {
  accessToken: null,
  refreshToken: null,
  userId: null,
};
const initialState: ProfileState = {
  user: null,
  authInfo: initialAuthInfo,
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
    accessToken: string;
    refreshToken: string;
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout(state) {
      state.authInfo = { accessToken: null, refreshToken: null, userId: null };
      state.user = null;
    },
    removeAccessToken(state) {
      state.authInfo.accessToken = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.authInfo.accessToken = action.payload.accessToken;
      state.authInfo.refreshToken = action.payload.refreshToken;
    });
    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (state, action) => {
        return action.payload;
      }
    );
  },
});

// selector for selecting user
export const selectUser = (state: RootState) => state.profile.user;
export const { logout, removeAccessToken } =
  profileSlice.actions;
export default profileSlice.reducer;
