import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserInfo } from "../../interfaces/IUserInfo";
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload.jwt;
      state.user = action.payload.user;
    });
  },
});

// selector for selecting user
export const selectUser = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
