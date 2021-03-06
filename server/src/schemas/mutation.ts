import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import {
  endpointNames,
  loginSchema,
  registerSchema,
  questSchema,
} from "shared";
import { questType, questInputType } from "./quest";
import { authInfoType } from "./authInfo";
import { questService } from "../services/quest-service";
import { authService } from "../services/auth-sevice";
import { tokensType } from "./tokens";
import { ownsData } from "../helpers/owns-data";
import { Context } from "../types";

export const mutationType = new GraphQLObjectType<undefined, Context>({
  name: "Mutation",
  fields: {
    [endpointNames.quests.add]: {
      type: questType,
      args: {
        data: {
          type: new GraphQLNonNull(questInputType),
        },
      },
      resolve: async (_, { data }, ctx) => {
        console.log("hmmm", data);
        
        const quest = await questSchema.validate(data);
        console.log(quest);
        
        return questService.addQuest(quest, Number(ctx.user!.id));
      },
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
        const quest = await questSchema.validate(data);
        return questService.updateQuest(Number(id), quest);
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
      resolve: async (_, { email, password }) => {
        const data = await loginSchema.validate({ email, password });
        return authService.login(data);
      },
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
      resolve: async (_, { username, email, password }) => {
        const data = await registerSchema.validate({
          username,
          email,
          password,
        });
        return authService.register(data);
      },
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
