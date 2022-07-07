export const endpointNames = {
  quests: {
    all: "quests",
    one: "quest",
    add: "addQuest",
    update: "updateQuest",
    delete: "deleteQuest",
  } as const,
  profile: {
    register: "register",
    login: "login",
    refreshTokens: "refreshTokens",
  } as const,
} as const;

export const inputTypeNames = {
  QUEST_DATA: "QuestData",
} as const;
