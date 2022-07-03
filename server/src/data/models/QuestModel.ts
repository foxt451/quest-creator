import { BaseModel } from "./BaseModel";
import { IQuest } from "../../interfaces/IQuest";
import { tableNames } from "../constants";

export interface QuestModel extends IQuest {}

export class QuestModel extends BaseModel {
  static get tableName() {
    return tableNames.QUESTS;
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ["name", "description", "password"],
      properties: {
        ...baseSchema.properties,
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }
}
