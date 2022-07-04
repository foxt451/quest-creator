import { IQuest } from "./IQuest";

// relations and ids are redefined where needed, because their types in client and server differ
export interface IQuestUpdate
  extends Omit<IQuest, "id" | "createdAt" | "updatedAt" | "userId"> {}
