import { Knex } from "knex";
import { tableNames } from "../constants";
import { getSeedUsers } from "../seed-data/seed-users";

export async function seed(knex: Knex): Promise<void> {
  try {
    await knex.transaction(async (trx) => {
      await trx(tableNames.USERS).truncate();

      // Inserts seed entries
      await trx(tableNames.USERS).insert(await getSeedUsers());
    });
  } catch (error) {
    console.log(`Seeding error: ${error}`);
  }
}
