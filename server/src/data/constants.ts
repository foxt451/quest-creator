import { Quest } from "../types";
import { User } from "../types";
import { BaseModel } from "../types";
import { RefreshToken } from "../types";

export const tableNames = {
  USERS: "users",
  QUESTS: "quests",
  REFRESH_TOKENS: "refreshTokens",
} as const;

type UserColumn = keyof User;
type QuestColumn = keyof Quest;
type BaseColumn = keyof BaseModel;
type RefreshTokenColumn = keyof RefreshToken;

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
