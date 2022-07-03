import { ENV } from "./env";
import { Knex } from "knex";
import { knexSnakeCaseMappers } from "objection";

const knexConfig: Knex.Config = {
  client: ENV.DB_CLIENT,
  connection: {
    user: ENV.DB_USER,
    port: ENV.DB_PORT,
    host: ENV.DB_HOST,
    database: ENV.DB_DATABASE,
    password: ENV.DB_PASSWORD,
  },
  migrations: {
    extension: "ts",
    directory: "./data/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
  debug: ENV.DEBUG,
  ...knexSnakeCaseMappers(),
};

export default knexConfig;
