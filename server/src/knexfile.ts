import { ENV } from "./env";

const knexConfig = {
  client: ENV.DB_CLIENT,
  connection: {
    user: ENV.DB_USER,
    port: ENV.DB_PORT,
    host: ENV.DB_HOST,
    database: ENV.DB_DATABASE,
    password: ENV.DB_PASSWORD,
  },
  migrations: {
    directory: "./src/data/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./src/data/seeds",
  },
  debug: ENV.DEBUG,
};

export default knexConfig;
