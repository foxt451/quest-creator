import { IQuest } from "../interfaces/IQuest";
import { QuestModel } from "../data/models/QuestModel";

export const questService = {
  getQuests: async (): Promise<IQuest[]> => {
    return QuestModel.query();
  },
};
