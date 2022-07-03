const paths = {
  QUESTS: "/quests",
  CREATE: "/create",
  UPDATE: "/update",
  LOGIN: "/login",
  SIGN_UP: "/signup",
} as const;
const pathParameters = { QUEST_ID: "questId" } as const;

export { paths, pathParameters };
