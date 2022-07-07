import { Quest as QuestCommon } from "shared";
import { UserInfo } from "./UserInfo";

// relations and ids are redefined where needed, because their types in client and server differ
export interface Quest extends QuestCommon {
  id: string;
  user: Pick<UserInfo, "id" | "username">;
}
