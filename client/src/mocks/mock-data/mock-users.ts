import { IUserInfo } from "../../interfaces/IUserInfo";
import { IRegisterUser } from "shared";

export interface MockUser extends IUserInfo {
  password: string;
}

export const users: MockUser[] = [
  {
    id: "1",
    username: "alex",
    email: "alex@gmail.com",
    password: "alex",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    username: "lena",
    email: "lena@gmail.com",
    password: "lena",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    username: "dora",
    email: "dora@gmail.com",
    password: "dora",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const sanitizeUser = (user: MockUser): IUserInfo => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerUser = (user: IRegisterUser): IUserInfo => {
  const newUser: MockUser = {
    ...user,
    id: `${users.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  return sanitizeUser(newUser);
};
