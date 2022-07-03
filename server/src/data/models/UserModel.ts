import { BaseModel } from "./BaseModel";
import { IUser } from "../../interfaces/IUser";
import { tableNames, userColumns } from "../constants";

export interface UserModel extends IUser {}

export class UserModel extends BaseModel {
  static get idColumn() {
    return userColumns.id;
  }

  static get tableName() {
    return tableNames.USERS;
  }

  static get jsonSchema() {
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
}
