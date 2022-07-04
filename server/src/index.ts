import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemas";
import knex from "knex";
import knexConfig from "./knexfile";
import { ENV } from "./env";
import { Model } from "objection";
import cors from "cors";

const knexInstance = knex(knexConfig);
Model.knex(knexInstance);

const app = express();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: ENV.DEBUG,
  })
);

app.listen(ENV.PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${ENV.PORT}`);
});
