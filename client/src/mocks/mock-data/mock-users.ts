import { IUserInfo } from "../../interfaces/IUserInfo";

interface MockUser extends IUserInfo {
  password: string;
}

export const users: MockUser[] = [
  {
    id: "1",
    username: "alex",
    email: "alex@gmail.com",
    password: "alex",
  },
  {
    id: "2",
    username: "lena",
    email: "lena@gmail.com",
    password: "lena",
  },
  {
    id: "3",
    username: "dora",
    email: "dora@gmail.com",
    password: "dora",
  },
];

export const sanitizeUser = (user: MockUser): IUserInfo => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};
