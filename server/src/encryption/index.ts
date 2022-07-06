import bcrypt from "bcrypt";
import crypto from "crypto";
import { SALT_ROUNDS } from "./constants";

export const hash = (data: string) => bcrypt.hash(data, SALT_ROUNDS);
export const compare = async (data: string, hash: string): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(data, hash);
    return result;
  } catch (error) {
    return false;
  }
};

const randomBytes = 64;
export const generateUnguessableString = (): string => {
  return crypto.randomBytes(randomBytes).toString("base64");
};
