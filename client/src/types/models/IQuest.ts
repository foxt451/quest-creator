import { IQuest as IQuestCommon } from "shared";
import { IUserInfo } from "./IUserInfo";

// relations and ids are redefined where needed, because their types in client and server differ
export interface IQuest extends IQuestCommon {
  id: string;
  user: Pick<IUserInfo, "id" | "username">;
}
