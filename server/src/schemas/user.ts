import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";
import { User } from "../types";
import { Context } from "../types";

export const userType = new GraphQLObjectType<User, Context>({
  name: "User",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.id.toString(),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
