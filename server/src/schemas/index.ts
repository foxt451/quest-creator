import { GraphQLSchema } from "graphql";
import { queryType } from "./query";

export const schema = new GraphQLSchema({
  query: queryType,
});
