import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { TokenPair } from "../services/auth-sevice";
import { Context } from "../types";

export const tokensType = new GraphQLObjectType<TokenPair, Context>({
  name: "Tokens",
  fields: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.accessToken,
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.refreshToken,
    },
  },
});
