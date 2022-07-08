import { JwtPayload } from "../auth";

export type Context = {
  user: JwtPayload | undefined;
};
