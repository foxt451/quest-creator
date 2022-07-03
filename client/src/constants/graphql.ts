const queryNames = {
  QUESTS: "Quests",
  QUEST: "Quest",
  ADD_QUEST: "AddQuest",
  UPDATE_QUEST: "UpdateQuest",
  DELETE_QUEST: "DeleteQuest",

  LOGIN_PROFILE: "LoginProfile",
  REGISTER_PROFILE: "RegisterProfile",
} as const;

const inputTypeNames = {
  QUEST_DATA: "QuestData",
};

export { queryNames, inputTypeNames };
