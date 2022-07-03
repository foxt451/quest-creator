import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./constants";

export const hash = (data: string) => bcrypt.hash(data, SALT_ROUNDS);
