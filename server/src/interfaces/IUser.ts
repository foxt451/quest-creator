import { IUserInfo } from "shared";

export interface IUser extends IUserInfo {
  id: number;
  password: string;
}
