import { FullUserInfo } from "shared";
import { BaseModel } from "./BaseModel";

export interface User extends FullUserInfo, BaseModel {}
