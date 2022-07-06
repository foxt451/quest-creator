import { IUserInfo } from "shared";
import { IBaseModel } from "./IBaseModel";

export interface IUser extends IUserInfo, IBaseModel {
  password: string;
}
