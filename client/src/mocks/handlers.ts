import { graphql } from "msw";
import { IQuest } from "../interfaces/IQuest";
import { quests } from "./mock-data/mock-quests";
import { users, sanitizeUser, registerUser } from "./mock-data/mock-users";
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
  graphql.query(queryNames.QUEST, (req, res, ctx) => {
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
  }),
  graphql.mutation(queryNames.ADD_QUEST, (req, res, ctx) => {
    const {
      data: { name, duration, difficulty, description, image },
    } = req.variables;
    const newQuest: IQuest = {
      id: Date.now().toString(),
      name,
      duration,
      difficulty,
      userId: "1",
      description,
      image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      updatedAt: new Date().toISOString(),
    };

    quests[oldQuestIndex] = newQuest;
    return res(
      ctx.data({
        quest: newQuest,
      }),
      ctx.delay(DELAY_MS)
    );
  }),
  graphql.mutation(queryNames.DELETE_QUEST, (req, res, ctx) => {
    const { id } = req.variables;
    const index = quests.findIndex((q) => q.id === id);
    quests.splice(index, 1);
    return res(
      ctx.data({
        id,
      }),
      ctx.delay(DELAY_MS)
    );
  }),

  graphql.mutation(queryNames.LOGIN_PROFILE, (req, res, ctx) => {
    const { email, password } = req.variables;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
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
        jwt: `${email}`,
        user: sanitizeUser(user),
      }),
      ctx.delay(DELAY_MS)
    );
  }),

  graphql.mutation(queryNames.REGISTER_PROFILE, (req, res, ctx) => {
    const { username, email, password } = req.variables;
    const user = users.find((u) => u.email === email);
    if (user) {
      return res(
        ctx.status(400),
        ctx.errors([
          {
            message: "User already exists",
            errorType: "BadRequestError",
          },
        ]),
        ctx.delay(DELAY_MS)
      );
    }
    const newUser = registerUser({ username, email, password });
    return res(
      ctx.data({
        jwt: `${email}`,
        user: newUser,
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
