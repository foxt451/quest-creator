import { Quest } from "../types";
import { QuestModel } from "../data/models/QuestModel";
import { questColumns } from "../data/constants";
import { QuestData } from "shared";

export const questService = {
  getOwnerId: async (questId: number): Promise<number | undefined> => {
    const quest = await QuestModel.query()
      .where(questColumns.id, questId)
      .first();
    return quest?.userId;
  },
  getQuests: async (): Promise<Quest[]> => {
    return QuestModel.query();
  },
  getQuest: async (id: number): Promise<Quest | undefined> => {
    return QuestModel.query()
      .where(questColumns.id, id)
      .first()
      .throwIfNotFound();
  },
  addQuest: async (data: QuestData, userId: number): Promise<Quest> => {
    return QuestModel.query().insert({
      ...data,
      [questColumns.userId]: userId,
    });
  },
  deleteQuest: async (id: number): Promise<number> => {
    return QuestModel.query()
      .where(questColumns.id, id)
      .delete()
      .throwIfNotFound();
  },
  updateQuest: async (
    id: number,
    data: QuestData
  ): Promise<Quest | undefined> => {
    return QuestModel.query().patchAndFetchById(id, data).throwIfNotFound();
  },
};
