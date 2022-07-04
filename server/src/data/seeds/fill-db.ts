import { Knex } from "knex";
import { tableNames, userColumns } from "../constants";
import { getSeedUsers } from "../seed-data/seed-users";
import { getSeedQuests } from "../seed-data/seed-quests";

export async function seed(knex: Knex): Promise<void> {
  try {
    await knex.transaction(async (trx) => {
      await trx(tableNames.QUESTS).truncate();
      await trx(tableNames.USERS).del();
      // Inserts seed entries
      await trx(tableNames.USERS).insert(await getSeedUsers());

      const [{ minUserId, maxUserId }] = await trx(tableNames.USERS).select(
        knex.raw("MIN(??) as min_user_id", [userColumns.id]),
        knex.raw("MAX(??) as max_user_id", [userColumns.id])
      );

      await trx(tableNames.QUESTS).insert(getSeedQuests(maxUserId, minUserId));
    });
  } catch (error) {
    console.log(`Seeding error: ${error}`);
  }
}
