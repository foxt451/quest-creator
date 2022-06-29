import { questDifficulties } from "../enums/questDifficulties";

export type QuestDifficulty =
  typeof questDifficulties[keyof typeof questDifficulties];

export interface IQuest {
  name: string;
  description: string;
  image: string | null;
  difficulty: QuestDifficulty;
  duration: number | null;
  createdAt: number;
  updatedAt: number;
}
