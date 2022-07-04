import { IQuest } from "../interfaces/IQuest";
import { IUser } from "../interfaces/IUser";
import { IBaseModel } from "../interfaces/IBaseModel";

export const tableNames = {
  USERS: "users",
  QUESTS: "quests",
} as const;

type UserColumn = keyof IUser;
type QuestColumn = keyof IQuest;
type BaseColumn = keyof IBaseModel;

export const baseColumns: Record<BaseColumn, string> = {
  id: "id",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

export const userColumns: Record<UserColumn, string> = {
  email: "email",
  password: "password",
  username: "username",
  ...baseColumns,
};

export const questColumns: Record<QuestColumn, string> = {
  description: "description",
  difficulty: "difficulty",
  duration: "duration",
  name: "name",
  image: "image",
  userId: "userId",
  ...baseColumns,
};
