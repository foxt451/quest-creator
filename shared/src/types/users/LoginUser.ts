import { FullUserInfo } from "./FullUserInfo";

export type LoginUser = Pick<FullUserInfo, "email" | "password">;
