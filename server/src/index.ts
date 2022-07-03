import express, { Request, Response } from "express";
import knex from "knex";
import knexConfig from "./knexfile";
import { ENV } from "./env";
import { Model } from "objection";

const knexInstance = knex(knexConfig);
Model.knex(knexInstance);

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(ENV.PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${ENV.PORT}`
  );
});
