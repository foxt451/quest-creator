import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";
import { authService } from "../services/auth-sevice";
import { IUser } from "../types/IUser";
import { userType } from "./user";
import { ITokenPair } from "../services/auth-sevice";

export const tokensType = new GraphQLObjectType({
  name: "Tokens",
  fields: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: ITokenPair) => parent.accessToken,
    },
    refreshToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: ITokenPair) => parent.refreshToken,
    },
  },
});
