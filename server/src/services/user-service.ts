import { IQuest } from "../interfaces/IQuest";
import { IUser } from "../interfaces/IUser";
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
