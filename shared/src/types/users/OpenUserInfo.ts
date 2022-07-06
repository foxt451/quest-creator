import { BaseModel } from "../BaseModel";

export interface OpenUserInfo extends BaseModel {
  username: string;
  email: string;
}
