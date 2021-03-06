import { BaseModel } from "./BaseModel";
import { JSONSchema, RelationMappings } from "objection";
import { compare } from "../../encryption";
import { User } from "../../types";
import { QuestModel } from "./QuestModel";
import { RefreshTokenModel } from "./RefreshTokenModel";
import { hash } from "../../encryption";
import {
  tableNames,
  userColumns,
  questColumns,
  refreshTokenColumns,
} from "../constants";

export interface UserModel extends User {}

export class UserModel extends BaseModel {
  static get idColumn() {
    return userColumns.id;
  }

  static get tableName() {
    return tableNames.USERS;
  }

  static get jsonSchema(): JSONSchema {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: [userColumns.email, userColumns.password, userColumns.username],
      properties: {
        ...baseSchema.properties,
        [userColumns.username]: { type: "string" },
        [userColumns.email]: { type: "string" },
        [userColumns.password]: { type: "string" },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      quests: {
        relation: BaseModel.HasManyRelation,
        modelClass: QuestModel,
        join: {
          from: `${tableNames.USERS}.${userColumns.id}`,
          to: `${tableNames.QUESTS}.${questColumns.userId}`,
        },
      },
      tokens: {
        // potentially many, but according to business rules - one (or none)
        relation: BaseModel.HasManyRelation,
        modelClass: RefreshTokenModel,
        join: {
          from: `${tableNames.USERS}.${userColumns.id}`,
          to: `${tableNames.REFRESH_TOKENS}.${refreshTokenColumns.userId}`,
        },
      },
    };
  }

  async $beforeInsert() {
    super.$beforeInsert();
    this.password = await hash(this.password);
  }

  checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
