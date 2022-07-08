import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";
import { inputTypeNames } from "shared";
import { userType } from "./user";
import { userService } from "../services/user-service";
import { Quest } from "../types";
import { Context } from "../types";

export const questType = new GraphQLObjectType<Quest, Context>({
  name: "Quest",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => parent.id.toString(),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image: {
      type: GraphQLString,
    },
    difficulty: {
      type: new GraphQLNonNull(GraphQLString),
    },
    duration: {
      type: GraphQLInt,
    },
    user: {
      type: new GraphQLNonNull(userType),
      resolve: (parent: Quest) => userService.getById(parent.userId),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

export const questInputType = new GraphQLInputObjectType({
  name: inputTypeNames.QUEST_DATA,
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    difficulty: {
      type: new GraphQLNonNull(GraphQLString),
    },
    duration: {
      type: GraphQLInt,
    },
    image: {
      type: GraphQLString,
    },
  },
});
