import { Quest } from "./Quest";
import { BaseModel } from "../BaseModel";

export type QuestData = Omit<Quest, keyof BaseModel>;
