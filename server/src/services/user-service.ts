import { User } from "../types";
import { errorMessages } from "../errors";
import { UserModel } from "../data/models/UserModel";

export const userService = {
  async getById(id: number): Promise<User> {
    const user = await UserModel.query().findById(id);
    if (!user) {
      throw new Error(errorMessages.USER_NOT_FOUND);
    }
    return user;
  },
};
