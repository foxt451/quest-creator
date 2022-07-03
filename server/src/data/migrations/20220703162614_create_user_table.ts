import { Knex } from "knex";
import { validationConstants } from "shared";
import { tableNames, userColumns } from "../constants";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.USERS, (table) => {
    table.increments(userColumns.id).primary();
    table
      .string(
        userColumns.username,
        validationConstants.user.username.MAX_LENGTH
      )
      .notNullable()
      .unique();
    table.string(userColumns.email).unique().notNullable();
    table.string(userColumns.password).notNullable();
    table
      .timestamp(userColumns.createdAt, { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp(userColumns.updatedAt, { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.USERS);
}
