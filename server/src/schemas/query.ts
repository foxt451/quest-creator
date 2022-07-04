import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { questType } from "./quest";
import { questService } from "../services/quest-service";

export const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    quests: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(questType))),
      resolve: () => questService.getQuests(),
    },
  },
});
