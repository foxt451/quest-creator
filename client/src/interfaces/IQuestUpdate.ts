import { IQuest } from "./IQuest";

// relations and ids are redefined where needed, because their types in client and server differ
export type QuestUpdate = Omit<
  IQuest,
  "id" | "createdAt" | "updatedAt" | "user"
>;
