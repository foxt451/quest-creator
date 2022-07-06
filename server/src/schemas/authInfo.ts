import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";
import { authService } from "../services/auth-sevice";
import { IUser } from "../interfaces/IUser";
import { userType } from "./user";
import { tokensType } from "./tokens";

export const authInfoType = new GraphQLObjectType({
  name: "AuthInfo",
  fields: {
    tokens: {
      type: new GraphQLNonNull(tokensType),
      resolve: (parent: IUser) => authService.generateTokens(parent.id),
    },
    user: {
      type: new GraphQLNonNull(userType),
      resolve: (parent: IUser) => parent,
    },
  },
});
