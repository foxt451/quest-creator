import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { questColumns } from "../data/constants";
import { endpointNames } from "shared";
import { questType, questInputType } from "./quest";
import { authInfoType } from "./authInfo";
import { questService } from "../services/quest-service";
import { authService } from "../services/auth-sevice";

export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    [endpointNames.quests.add]: {
      type: new GraphQLNonNull(questType),
      args: {
        data: {
          type: new GraphQLNonNull(questInputType),
        },
      },
      resolve: (_, { data }) =>
        questService.addQuest({ ...data, [questColumns.userId]: 20 }),
    },
    [endpointNames.quests.delete]: {
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (_, { id }) => questService.deleteQuest(Number(id)),
    },
    [endpointNames.quests.update]: {
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        data: {
          type: new GraphQLNonNull(questInputType),
        },
      },
      type: new GraphQLNonNull(questType),
      resolve: (_, { id, data }) => questService.updateQuest(Number(id), data),
    },
    [endpointNames.profile.login]: {
      type: new GraphQLNonNull(authInfoType),
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, { email, password }) =>
        authService.login({ email, password }),
    },
  },
});
