import { questDifficulties } from "../enums/questDifficulties";

export type QuestDifficulty =
  typeof questDifficulties[keyof typeof questDifficulties];

export interface IQuest {
  id: string | number;
  name: string;
  description: string;
  image: string | null;
  difficulty: QuestDifficulty;
  duration: number | null;
}