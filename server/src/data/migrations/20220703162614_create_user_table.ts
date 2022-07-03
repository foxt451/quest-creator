import { Knex } from "knex";
import { validationConstants } from "shared";
import { tableNames, columnNames } from "../constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.USERS, (table) => {
    table.increments("id").primary();
    table
      .string(
        columnNames.users.username,
        validationConstants.user.username.MAX_LENGTH
      )
      .notNullable()
      .unique();
    table.string(columnNames.users.email).unique().notNullable();
    table.string(columnNames.users.password).notNullable();
    table.integer(columnNames.base.createdAt).notNullable();
    table.integer(columnNames.base.updatedAt).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.USERS);
}
