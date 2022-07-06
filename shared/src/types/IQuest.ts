import { questDifficulties } from "../enums/questDifficulties";
import { IBaseModel } from "./IBaseModel";

export type QuestDifficulty =
  typeof questDifficulties[keyof typeof questDifficulties];

export interface IQuest extends IBaseModel {
  name: string;
  description: string;
  image: string | null;
  difficulty: QuestDifficulty;
  duration: number | null;
}
