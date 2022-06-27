import { graphql } from "msw";

if (!process.env.REACT_APP_API_URL) {
  throw new Error("REACT_APP_API_URL is not set");
}

export const handlers = [
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
