import { IQuest as IQuestCommon } from "shared";

// relations and ids are redefined where needed, because their types in client and server differ
export interface IQuest extends IQuestCommon {
  id: string;
  userId: string;
}
