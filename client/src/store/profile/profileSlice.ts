import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/models/UserInfo";
import { RootState } from "../store";
import { login, refreshTokens, register } from "./thunks";
import { TokenPair } from "shared";

export type ProfileUserInfo = Pick<UserInfo, "id" | "email" | "username">;

export interface ProfileState {
  user: ProfileUserInfo | null;
  tokens: TokenPair;
}

const initialTokens: TokenPair = {
  accessToken: null,
  refreshToken: null,
};

const initialState: ProfileState = {
  user: null,
  tokens: initialTokens,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    removeAccessToken(state) {
      state.tokens.accessToken = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.tokens = action.payload;
    });
    builder.addMatcher(
      isAnyOf(login.fulfilled, register.fulfilled),
      (_, action) => {
        return action.payload;
      }
    );
  },
});

export const selectUser = (state: RootState) => state.profile.user;
export const { logout, removeAccessToken } = profileSlice.actions;
export default profileSlice.reducer;
