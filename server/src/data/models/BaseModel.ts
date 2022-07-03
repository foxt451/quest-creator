import { Model } from "objection";
import { IBaseModel } from "shared/dist/interfaces/IBaseModel";
import { baseColumns } from "../constants";

export interface BaseModel extends IBaseModel {}

export class BaseModel extends Model {
  static get idColumn() {
    return baseColumns.id;
  }

  static get jsonSchema() {
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
