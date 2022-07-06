import { Knex } from "knex";
import { tableNames, refreshTokenColumns, userColumns } from "../constants";

export async function up(knex: Knex): Promise<void> {
  // create table for refresh tokens
  return knex.schema.createTable(tableNames.REFRESH_TOKENS, (table) => {
    table.increments(refreshTokenColumns.id).primary();
    table
      .integer(refreshTokenColumns.userId)
      .notNullable()
      .references(userColumns.id)
      .inTable(tableNames.USERS);
    table.string(refreshTokenColumns.token).notNullable();
    table
      .timestamp(refreshTokenColumns.createdAt, { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp(refreshTokenColumns.updatedAt, { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.REFRESH_TOKENS);
}
