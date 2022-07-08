import { BaseModel } from "./BaseModel";
import { Quest } from "../../types";
import { tableNames, questColumns, userColumns } from "../constants";
import { RelationMappings, JSONSchema } from "objection";
import { UserModel } from "./UserModel";
import { questDifficulties } from "shared";

export interface QuestModel extends Quest {}

export class QuestModel extends BaseModel {
  static get idColumn() {
    return questColumns.id;
  }

  static get tableName() {
    return tableNames.QUESTS;
  }

  static get jsonSchema(): JSONSchema {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: [
        questColumns.name,
        questColumns.description,
        questColumns.difficulty,
        questColumns.userId,
      ],
      properties: {
        ...baseSchema.properties,
        [questColumns.name]: { type: "string" },
        [questColumns.description]: { type: "string" },
        [questColumns.difficulty]: {
          type: "string",
          enum: Object.values(questDifficulties),
        },
        [questColumns.userId]: { type: "integer" },
        [questColumns.image]: { type: ["string", "null"] },
        [questColumns.duration]: { type: ["integer", "null"] },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${tableNames.QUESTS}.${questColumns.userId}`,
          to: `${tableNames.USERS}.${userColumns.id}`,
        },
      },
    };
  }
}
