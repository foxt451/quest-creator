import { OpenUserInfo } from "./OpenUserInfo";
import { BaseModel } from "../BaseModel";

export interface FullUserInfo extends OpenUserInfo {
  password: string;
}
