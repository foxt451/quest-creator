import { IUser } from "../../interfaces/IUser";
import { hash } from "../encryption";

export const getSeedUsers: () => Promise<
  Readonly<Omit<IUser, "id" | "createdAt" | "updatedAt">[]>
> = async () => [
  {
    username: "alex",
    email: "alex@gmail.com",
    password: await hash("alex"),
  },
  {
    username: "lena",
    email: "lena@gmail.com",
    password: await hash("lena"),
  },
  {
    username: "dora",
    email: "dora@gmail.com",
    password: await hash("dora"),
  },
];
