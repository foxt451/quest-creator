import { IBaseModel } from "./IBaseModel";

// an example of why we don't store ids and relations in shared interfaces
// here, we use id: number and in client id: string
export interface IRefreshToken extends IBaseModel {
  userId: number;
  token: string;
}
