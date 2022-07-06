import { IQuest } from "../interfaces/IQuest";
import { IUser } from "../interfaces/IUser";
import { IBaseModel } from "../interfaces/IBaseModel";
import { IRefreshToken } from "../interfaces/IRefreshToken";

export const tableNames = {
  USERS: "users",
  QUESTS: "quests",
  REFRESH_TOKENS: "refreshTokens",
} as const;

type UserColumn = keyof IUser;
type QuestColumn = keyof IQuest;
type BaseColumn = keyof IBaseModel;
type RefreshTokenColumn = keyof IRefreshToken;

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

export const refreshTokenColumns: Record<RefreshTokenColumn, string> = {
  userId: "userId",
  token: "token",
  ...baseColumns,
};
