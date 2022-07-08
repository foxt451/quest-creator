import {
  GraphQLObjectType,
  GraphQLNonNull
} from "graphql";
import { authService } from "../services/auth-sevice";
import { User } from "../types";
import { userType } from "./user";
import { tokensType } from "./tokens";

export const authInfoType = new GraphQLObjectType({
  name: "AuthInfo",
  fields: {
    tokens: {
      type: new GraphQLNonNull(tokensType),
      resolve: (parent: User) => authService.generateTokens(parent.id),
    },
    user: {
      type: new GraphQLNonNull(userType),
      resolve: (parent: User) => parent,
    },
  },
});
