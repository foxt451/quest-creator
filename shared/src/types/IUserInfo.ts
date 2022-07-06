import { IBaseModel } from "./IBaseModel";

export interface IUserInfo extends IBaseModel {
  username: string;
  email: string;
}
