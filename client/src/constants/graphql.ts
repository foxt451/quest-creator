const queryNames = {
  quests: {
    ALL: "Quests",
    SINGLE: "Quest",
    ADD: "AddQuest",
    UPDATE: "UpdateQuest",
    DELETE: "DeleteQuest",
  },
  profile: {
    LOGIN: "LoginProfile",
    REGISTER: "RegisterProfile",
    REFRESH_TOKENS: "RefreshTokens",
  },
} as const;

export { queryNames };
