import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { IQuest } from "../interfaces/IQuest";

export const questType = new GraphQLObjectType({
  name: "Quest",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: IQuest) => parent.id.toString(),
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
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: IQuest) => parent.userId.toString(),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
