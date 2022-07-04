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
import { inputTypeNames } from "shared";

export const authInfoType = new GraphQLObjectType({
  name: "AuthInfo",
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: IUser) => authService.generateToken(parent.id),
    },
    user: {
      type: new GraphQLNonNull(userType),
      resolve: (parent: IUser) => parent,
    },
  },
});
