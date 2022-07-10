import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('fcm_registration_token', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('userId').notNullable();
    table.uuid('deviceId').notNullable();
    table.string('token').notNullable();
    table.timestamp('createdAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('fcm_registration_token');
}
