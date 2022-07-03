import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/IUserInfo";
import { IUserInfo as IUserCommonInfo } from "shared";
import { RootState } from "../store";
import { FormValues as LoginValues } from "../../components/LoginForm";
import { queryNames, inputTypeNames } from "../../constants/graphql";
import { GraphQLJsonRequestBody } from "msw";
import axios from "axios";
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
    login(email: $email, password: $password) {
      jwt,
      user {
        id,
        username,
        email
      }
    }
  }
`;

export const login = createAsyncThunk<ProfileState, LoginValues>(
  "profile/login",
  async (loginData) => {
    const response = await axios.post<
      any,
      any,
      GraphQLJsonRequestBody<LoginValues>
    >(apiUrl, {
      query: LOGIN_QUERY,
      variables: { ...loginData },
    });
    return response.data.data;
  }
);

interface RegisterValues extends IUserCommonInfo {
  password: string;
}

const REGISTER_QUERY = `
  mutation ${queryNames.REGISTER_PROFILE} ($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      jwt,
      user {
        id,
        username,
        email
      }
    }
  }
`;

export const register = createAsyncThunk<ProfileState, RegisterValues>(
  "profile/register",
  async (registerData) => {
    const response = await axios.post<
      any,
      any,
      GraphQLJsonRequestBody<RegisterValues>
    >(apiUrl, {
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
