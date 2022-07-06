import { FullUserInfo } from "./FullUserInfo";
import { BaseModel } from "../BaseModel";

export type RegisterUser = Omit<FullUserInfo, keyof BaseModel>;
