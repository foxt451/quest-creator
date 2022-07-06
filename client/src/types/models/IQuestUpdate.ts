import { IQuest } from "./IQuest";

export type QuestUpdate = Omit<
  IQuest,
  "id" | "createdAt" | "updatedAt" | "user"
>;
