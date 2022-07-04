import bcrypt from "bcrypt";
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
