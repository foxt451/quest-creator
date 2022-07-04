import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/IUserInfo";
import { IRegisterUser, ILoginUser } from "shared";
import { RootState } from "../store";
import { queryNames } from "../../constants/graphql";
import { endpointNames } from "shared";
import { request } from "../../helpers/graphql";
import { apiUrl } from "../../env/env";

interface ProfileState {
  user: IUserInfo | null;
  jwt: string | null;
}

const initialState: ProfileState = {
  user: null,
  jwt: null,
};

const LOGIN_QUERY = `
  mutation ${queryNames.LOGIN_PROFILE} ($email: String!, $password: String!) {
    ${endpointNames.profile.login}(email: $email, password: $password) {
      jwt,
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
    return response.data.data;
  }
);

const REGISTER_QUERY = `
  mutation ${queryNames.REGISTER_PROFILE} ($username: String!, $email: String!, $password: String!) {
    ${endpointNames.profile.register}(username: $username, email: $email, password: $password) {
      jwt,
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
    return response.data.data;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout(state) {
      state.jwt = null;
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (state, action) => {
        state.jwt = action.payload.jwt;
        state.user = action.payload.user;
      }
    );
  },
});

// selector for selecting user
export const selectUser = (state: RootState) => state.profile.user;
export const { logout } = profileSlice.actions;
export default profileSlice.reducer;
