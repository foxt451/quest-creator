import { Quest as QuestBasic } from "shared";
import { BaseModel } from "./BaseModel";

// an example of why we don't store ids and relations in shared interfaces
// here, we use id: number and in client id: string
export interface Quest extends QuestBasic, BaseModel {
  userId: number;
}
