import jwt from "jsonwebtoken";
import { LoginUser, RegisterUser } from "shared";
import { ENV } from "../env";
import { errorMessages } from "../errors";
import { UserModel } from "../data/models/UserModel";
import { RefreshTokenModel } from "../data/models/RefreshTokenModel";
import { userColumns } from "../data/constants";
import { compare } from "../encryption";
import { User } from "../types";
import { TokenPair as TokenPairNullable, NonNullableProperties } from "shared";

export interface TokenPair extends NonNullableProperties<TokenPairNullable> {}

export const authService = {
  async generateTokens(userId: number): Promise<TokenPair> {
    const accessToken = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_LIFETIME,
    });
    const refreshToken = await RefreshTokenModel.storeForUser(userId);
    return { accessToken, refreshToken };
  },
  async refreshTokens(
    userId: number,
    refreshToken: string
  ): Promise<TokenPair> {
    const refreshTokenDb = await RefreshTokenModel.query()
      .where({
        userId,
      })
      .first();
    if (!refreshTokenDb) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }
    const compareResult: boolean = await compare(
      refreshToken,
      refreshTokenDb.token
    );
    if (!compareResult) {
      throw new Error(errorMessages.INVALID_REFRESH_TOKEN);
    }
    return this.generateTokens(refreshTokenDb.userId);
  },

  async login({ email, password }: LoginUser): Promise<User> {
    const user = await UserModel.query()
      .where(userColumns.email, email)
      .first();

    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }
    if (!(await user.checkPassword(password))) {
      throw new Error(errorMessages.INCORRECT_CREDENTIALS);
    }
    return user;
  },

  async register({ username, email, password }: RegisterUser): Promise<User> {
    let user = await UserModel.query().where(userColumns.email, email).first();
    if (user) {
      throw new Error(errorMessages.USER_EXISTS_EMAIL);
    }
    user = await UserModel.query()
      .where(userColumns.username, username)
      .first();
    if (user) {
      throw new Error(errorMessages.USER_EXISTS_USERNAME);
    }

    const newUser = await UserModel.query().insert({
      username,
      email,
      password,
    });
    return newUser;
  },
};
