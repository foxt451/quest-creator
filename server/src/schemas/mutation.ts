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
import { tokensType } from "./tokens";
import { ownsData } from "../helpers/owns-data";

export const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    [endpointNames.quests.add]: {
      type: questType,
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
      type: GraphQLInt,
      resolve: async (_, { id }, ctx) => {
        const ownerId = await questService.getOwnerId(Number(id));
        ownsData(ownerId, ctx.user?.id);
        return questService.deleteQuest(Number(id));
      },
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
      type: questType,
      resolve: async (_, { id, data }, ctx) => {
        const ownerId = await questService.getOwnerId(Number(id));
        ownsData(ownerId, ctx.user?.id);
        return questService.updateQuest(Number(id), data);
      },
    },
    [endpointNames.profile.login]: {
      type: authInfoType,
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
    [endpointNames.profile.register]: {
      type: authInfoType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, { username, email, password }) =>
        authService.register({ username, email, password }),
    },
    [endpointNames.profile.refreshTokens]: {
      type: tokensType,
      args: {
        refreshToken: {
          type: new GraphQLNonNull(GraphQLString),
        },
        userId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (_, { refreshToken, userId }) =>
        authService.refreshTokens(Number(userId), refreshToken),
    },
  },
});
