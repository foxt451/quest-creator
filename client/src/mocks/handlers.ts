import { graphql } from "msw";
import { quests } from "./mock-data/mock-quests";
import queryNames from "../constants/queryNames";

if (!process.env.REACT_APP_API_URL) {
  throw new Error("REACT_APP_API_URL is not set");
}

const DELAY_MS = 1000;

export const handlers = [
  graphql.query(queryNames.QUESTS, (req, res, ctx) => {
    return res(
      ctx.data({
        quests,
      }),
      ctx.delay(DELAY_MS)
    );
  }),
  // Handles a "GetUserInfo" query
  // graphql.query("GetUserInfo", (req, res, ctx) => {
  //   const authenticatedUser = sessionStorage.getItem("is-authenticated");
  //   if (!authenticatedUser) {
  //     // When not authenticated, respond with an error
  //     return res(
  //       ctx.errors([
  //         {
  //           message: "Not authenticated",
  //           errorType: "AuthenticationError",
  //         },
  //       ])
  //     );
  //   }
  //   // When authenticated, respond with a query payload
  //   return res(
  //     ctx.data({
  //       user: {
  //         username: authenticatedUser,
  //         firstName: "John",
  //         __typename: "User",
  //       },
  //     })
  //   );
  // }),
];
