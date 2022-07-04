import jwt from "jsonwebtoken";
import { ILoginUser } from "shared";
import { ENV } from "../env";
import { UserModel } from "../data/models/UserModel";
import { userColumns } from "../data/constants";
import { IUser } from "../interfaces/IUser";

export const authService = {
  async generateToken(userId: number): Promise<string> {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
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
};
