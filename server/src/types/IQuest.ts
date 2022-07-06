import { IQuest as IQuestBasic } from "shared";
import { IBaseModel } from "./IBaseModel";

// an example of why we don't store ids and relations in shared interfaces
// here, we use id: number and in client id: string
export interface IQuest extends IQuestBasic, IBaseModel {
  userId: number;
}
