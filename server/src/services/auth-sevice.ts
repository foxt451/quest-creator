import jwt from "jsonwebtoken";
import { hash } from "../encryption";
import { ILoginUser, IRegisterUser } from "shared";
import { ENV } from "../env";
import { UserModel } from "../data/models/UserModel";
import { RefreshTokenModel } from "../data/models/RefreshTokenModel";
import { userColumns } from "../data/constants";
import { compare } from "../encryption";
import { IUser } from "../interfaces/IUser";

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async refreshTokens(
    userId: number,
    refreshToken: string
  ): Promise<ITokenPair> {
    const refreshTokenDb = await RefreshTokenModel.query()
      .where({
        userId,
      })
      .first();
    if (!refreshTokenDb) {
      throw new Error("Such user not found");
    }
    const compareResult: boolean = await compare(
      refreshToken,
      refreshTokenDb.token
    );
    if (!compareResult) {
      throw new Error("Invalid refresh token");
    }
    return this.generateTokens(refreshTokenDb.userId);
  },
  async generateTokens(userId: number): Promise<ITokenPair> {
    const accessToken = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_LIFETIME,
    });
    const refreshToken = await RefreshTokenModel.storeForUser(userId);
    return { accessToken, refreshToken };
  },

  async login({ email, password }: ILoginUser): Promise<IUser> {
    const user = await UserModel.query()
      .where(userColumns.email, email)
      .first();
    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }
    if (!(await user.checkPassword(password))) {
      throw new Error("Password is incorrect");
    }
    return user;
  },

  async register({ username, email, password }: IRegisterUser): Promise<IUser> {
    let user = await UserModel.query().where(userColumns.email, email).first();
    if (user) {
      throw new Error("User with such email already exists");
    }
    user = await UserModel.query()
      .where(userColumns.username, username)
      .first();
    if (user) {
      throw new Error("User with such username already exists");
    }

    const newUser = await UserModel.query().insert({
      username,
      email,
      password: await hash(password),
    });
    return newUser;
  },
};
