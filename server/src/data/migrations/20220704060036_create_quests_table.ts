import { Knex } from "knex";
import { tableNames, questColumns, userColumns } from "../constants";
import { validationConstants } from "shared";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.QUESTS, (table) => {
    table.increments(questColumns.id).primary();
    table
      .string(questColumns.name, validationConstants.quest.name.MAX_LENGTH)
      .notNullable();
    table.text(questColumns.description).notNullable();
    table.string(questColumns.image).nullable();
    table.string(questColumns.difficulty).notNullable();
    table.integer(questColumns.duration).nullable();
    table
      .integer(questColumns.userId)
      .notNullable()
      .references(userColumns.id)
      .inTable(tableNames.USERS);
    table
      .timestamp(questColumns.createdAt, { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp(questColumns.updatedAt, { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.QUESTS);
}
