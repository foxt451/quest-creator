import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { questType } from "./quest";
import { endpointNames } from "shared";
import { questService } from "../services/quest-service";

export const queryType = new GraphQLObjectType({
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
