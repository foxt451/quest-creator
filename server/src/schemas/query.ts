import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { questType } from "./quest";
import { endpointNames } from "shared";
import { questService } from "../services/quest-service";
import { Context } from "../types";

export const queryType = new GraphQLObjectType<undefined, Context>({
  name: "Query",
  fields: {
    [endpointNames.quests.all]: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(questType))),
      resolve: () => questService.getQuests(),
    },
    [endpointNames.quests.one]: {
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      type: questType,
      resolve: (_, { id }) => questService.getQuest(Number(id)),
    },
  },
});
