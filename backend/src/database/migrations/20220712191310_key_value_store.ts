import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('key_value_store', (table) => {
    table.string('key').primary().notNullable();
    table.string('value').notNullable();

    table.timestamp('createdAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updatedAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('key_value_store');
}
