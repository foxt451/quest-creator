import { BaseModel } from "./BaseModel";
import { IUser } from "../../interfaces/IUser";

export interface UserModel extends IUser {}

export class UserModel extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    const baseSchema = super.jsonSchema;

    return {
      type: baseSchema.type,
      required: ["username", "email", "password"],
      properties: {
        ...baseSchema.properties,
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }
}
