import { IQuest } from "../types/IQuest";
import { IUser } from "../types/IUser";
import { UserModel } from "../data/models/UserModel";

export const userService = {
  async getById(id: number): Promise<IUser> {
    const user = await UserModel.query().findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
