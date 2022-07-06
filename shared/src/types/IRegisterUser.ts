import { IUserInfo } from "./IUserInfo";

export interface IRegisterUser extends Omit<IUserInfo, "createdAt" | "updatedAt"> {
  password: string;
}