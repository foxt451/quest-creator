import { questDifficulties } from "../../enums/questDifficulties";
import { BaseModel } from "../BaseModel";

export type QuestDifficulty =
  typeof questDifficulties[keyof typeof questDifficulties];

export interface Quest extends BaseModel {
  name: string;
  description: string;
  image: string | null;
  difficulty: QuestDifficulty;
  duration: number | null;
}
