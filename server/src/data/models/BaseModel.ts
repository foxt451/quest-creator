import { Model } from "objection";
import { IBaseModel } from "shared/dist/interfaces/IBaseModel";

export interface BaseModel extends IBaseModel {}

export class BaseModel extends Model {
  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
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
