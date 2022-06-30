import { graphql } from "msw";
import { IQuest } from "../interfaces/IQuest";
import { quests } from "./mock-data/mock-quests";
import { queryNames } from "../constants/graphql";

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
  graphql.query(
    queryNames.QUEST,
    (req, res, ctx) => {
      const { id } = req.variables;
      const quest = quests.find((q) => q.id === id);
      if (!quest) {
        return res(
          ctx.status(404),
          ctx.errors([
            {
              message: "Not found",
              errorType: "NotFoundError",
            },
          ]),
          ctx.delay(DELAY_MS)
        );
      }
      return res(
        ctx.data({
          quest,
        }),
        ctx.delay(DELAY_MS)
      );
    }
  ),
  graphql.mutation(queryNames.ADD_QUEST, (req, res, ctx) => {
    const {
      data: { name, duration, difficulty, description, image },
    } = req.variables;
    const newQuest: IQuest = {
      id: Date.now().toString(),
      name,
      duration,
      difficulty,
      description,
      image,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    quests.push(newQuest);
    return res(
      ctx.data({
        quest: newQuest,
      }),
      ctx.delay(DELAY_MS)
    );
  }),
  graphql.mutation(queryNames.UPDATE_QUEST, (req, res, ctx) => {
    const {
      id,
      data: { name, duration, difficulty, description, image },
    } = req.variables;
    const oldQuestIndex = quests.findIndex((q) => q.id === id);
    const oldQuest = quests[oldQuestIndex];
    if (!oldQuest) {
      return res(
        ctx.status(404),
        ctx.errors([
          {
            message: "Not found",
            errorType: "NotFoundError",
          },
        ]),
        ctx.delay(DELAY_MS)
      );
    }
    const newQuest: IQuest = {
      ...oldQuest,
      name,
      duration,
      difficulty,
      description,
      image,
      updatedAt: Date.now(),
    };
    
    quests[oldQuestIndex] = newQuest;
    return res(
      ctx.data({
        quest: newQuest,
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
