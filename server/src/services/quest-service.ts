import { IQuest } from "../interfaces/IQuest";
import { QuestModel } from "../data/models/QuestModel";
import { questColumns } from "../data/constants";

export const questService = {
  getOwnerId: async (questId: number): Promise<number | undefined> => {
    const quest = await QuestModel.query()
      .where(questColumns.id, questId)
      .first();
    return quest?.userId;
  },
  getQuests: async (): Promise<IQuest[]> => {
    return QuestModel.query();
  },
  getQuest: async (id: number): Promise<IQuest | undefined> => {
    return QuestModel.query()
      .where(questColumns.id, id)
      .first()
      .throwIfNotFound();
  },
  addQuest: async (data: any): Promise<IQuest> => {
    return QuestModel.query().insert(data);
  },
  deleteQuest: async (id: number): Promise<number> => {
    return QuestModel.query()
      .where(questColumns.id, id)
      .delete()
      .throwIfNotFound();
  },
  updateQuest: async (id: number, data: any): Promise<IQuest | undefined> => {
    return QuestModel.query().patchAndFetchById(id, data).throwIfNotFound();
  },
};
