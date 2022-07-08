import { GraphQLSchema } from "graphql";
import { queryType } from "./query";
import { mutationType } from "./mutation";
import { applyMiddleware, IMiddleware } from "graphql-middleware";
import { endpointNames } from "shared";
import { shield, rule, allow } from "graphql-shield";
import { errorMessages } from "../errors";
import { Context } from "../types";

const initialSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx: Context, info) => {
    if (ctx.user) {
      return true;
    }
    return new Error(errorMessages.NOT_LOGGED);
  }
);

const permissions = shield(
  {
    Mutation: {
      "*": isAuthenticated,
      [endpointNames.profile.login]: allow,
      [endpointNames.profile.register]: allow,
      [endpointNames.profile.refreshTokens]: allow,
    },
  },
  { allowExternalErrors: true }
);

export const schema = applyMiddleware(initialSchema, permissions);
