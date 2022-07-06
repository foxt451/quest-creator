import { BaseModel } from "./BaseModel";
import { JSONSchema, RelationMappings } from "objection";
import { IRefreshToken } from "../../types/IRefreshToken";
import { UserModel } from "./UserModel";
import { generateUnguessableString, hash } from "../../encryption";
import { tableNames, userColumns, refreshTokenColumns } from "../constants";

export interface RefreshTokenModel extends IRefreshToken {}

export class RefreshTokenModel extends BaseModel {
  static get idColumn() {
    return refreshTokenColumns.id;
  }

  static get tableName() {
    return tableNames.REFRESH_TOKENS;
  }

  static get jsonSchema(): JSONSchema {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: [refreshTokenColumns.userId, refreshTokenColumns.token],
      properties: {
        ...baseSchema.properties,
        [refreshTokenColumns.userId]: { type: "integer" },
        [refreshTokenColumns.token]: { type: "string" },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${tableNames.REFRESH_TOKENS}.${refreshTokenColumns.userId}`,
          to: `${tableNames.USERS}.${userColumns.id}`,
        },
      },
    };
  }

  static async storeForUser(userId: number): Promise<string> {
    await this.query().delete().where({ userId });
    const token = generateUnguessableString();
    await this.query().insert({
      userId: userId,
      token: await hash(token),
    });
    return token;
  }
}
