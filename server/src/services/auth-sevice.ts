import jwt from "jsonwebtoken";
import { hash } from "../data/encryption";
import { ILoginUser, IRegisterUser } from "shared";
import { ENV } from "../env";
import { UserModel } from "../data/models/UserModel";
import { userColumns } from "../data/constants";
import { IUser } from "../interfaces/IUser";

export const authService = {
  async generateToken(userId: number): Promise<string> {
    const token = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_LIFETIME,
    });
    return token;
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
