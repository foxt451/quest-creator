import { IQuest } from "../interfaces/IQuest";
import { QuestModel } from "../data/models/QuestModel";
import { questColumns } from "../data/constants";

export const questService = {
  getQuests: async (): Promise<IQuest[]> => {
    return QuestModel.query();
  },
  getQuest: async (id: number): Promise<IQuest | undefined> => {
    return QuestModel.query().where(questColumns.id, id).first();
  },
};
