import { GraphQLSchema } from "graphql";
import { queryType } from "./query";
import { mutationType } from "./mutation";
import { applyMiddleware } from "graphql-middleware";
import { endpointNames } from "shared";
import { shield, rule, allow } from "graphql-shield";

const initialSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (ctx.user) {
      return true;
    }
    return new Error("You must be logged in to perform this action");
  }
);

const permissions = shield(
  {
    Mutation: {
      "*": isAuthenticated,
      [endpointNames.profile.login]: allow,
      [endpointNames.profile.register]: allow,
    },
  },
  { allowExternalErrors: true }
);

export const schema = applyMiddleware(initialSchema, permissions);
