import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const ENV = {
  PORT: process.env.PORT!,
  DB_CLIENT: process.env.DB_CLIENT!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT),
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_DATABASE: process.env.DB_DATABASE!,
  DEBUG: process.env.DEBUG === "true",
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_LIFETIME: process.env.JWT_LIFETIME!,
};

if (Object.values(ENV).some((value) => value === undefined)) {
  throw new Error("Missing environment. Check .env.example");
}
