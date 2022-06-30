const paths = {
  QUESTS: "/quests",
  CREATE: "/create",
  UPDATE: "/update",
} as const;
const pathParameters = { QUEST_ID: "questId" } as const;

export { paths, pathParameters };
