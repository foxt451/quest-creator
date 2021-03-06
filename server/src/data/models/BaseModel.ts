import { Model, JSONSchema } from "objection";
import { BaseModel as IBaseModel } from "../../types";
import { baseColumns } from "../constants";

export interface BaseModel extends IBaseModel {}

export class BaseModel extends Model {
  static get idColumn() {
    return baseColumns.id;
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: "object",
      properties: {
        [baseColumns.id]: { type: "integer" },
        [baseColumns.createdAt]: { type: "string" },
        [baseColumns.updatedAt]: { type: "string" },
      },
    };
  }

  $beforeInsert() {
    const date = new Date().toISOString();
    this.createdAt = date;
    this.updatedAt = date;
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
