import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemas";
import knex from "knex";
import knexConfig from "./knexfile";
import { ENV } from "./env";
import { Model } from "objection";
import cors from "cors";
import { expressjwt, Request as AuthRequest } from "express-jwt";
import { JwtPayload } from "./types";

const knexInstance = knex(knexConfig);
Model.knex(knexInstance);

const app = express();

app.use(cors());

app.use(
  expressjwt({
    secret: ENV.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

app.use(
  "/graphql",
  graphqlHTTP((req, res) => ({
    schema: schema,
    graphiql: ENV.DEBUG,
    context: {
      user: (req as AuthRequest<JwtPayload>).auth,
    },
  }))
);

app.listen(ENV.PORT, () => {
  console.log(
    `⚡️[server]: Server is running${
      ENV.DEBUG && ` at http://localhost:${ENV.PORT}`
    }`
  );
});
