const queryNames = {
  quests: {
    ALL: "Quests",
    SINGLE: "Quest",
    ADD: "AddQuest",
    UPDATE: "UpdateQuest",
    DELETE: "DeleteQuest",
  },
  profile: {
    LOGIN_PROFILE: "LoginProfile",
    REGISTER_PROFILE: "RegisterProfile",
    REFRESH_TOKENS: "RefreshTokens",
  },
} as const;

export { queryNames };
