import { User } from "../../types";
import { hash } from "../../encryption";

export const getSeedUsers: () => Promise<
  Readonly<Omit<User, "id" | "createdAt" | "updatedAt">[]>
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
