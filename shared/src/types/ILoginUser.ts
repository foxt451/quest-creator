import { IUserInfo } from "./IUserInfo";

export interface ILoginUser extends Pick<IUserInfo, "email"> {
  password: string;
}
