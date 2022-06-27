export interface IQuest {
  id: string | number;
  name: string;
  description: string;
  image: string | null;
  difficulty: string;
  duration: number | null;
}
