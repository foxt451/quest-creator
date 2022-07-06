import { Quest } from "./Quest";
import { BaseModel } from "../BaseModel";

export type QuestUpdate = Omit<Quest, keyof BaseModel>;
