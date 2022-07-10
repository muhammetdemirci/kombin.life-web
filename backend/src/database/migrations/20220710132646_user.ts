import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('firebaseUID').nullable();
    table.string('email').notNullable();
    table.enum('role', ['root', 'admin', 'user']).notNullable().defaultTo('user');
    table.string('firstName').nullable();
    table.string('lastName').nullable();
    table.enum('gender', ['male', 'female', 'diverse']).nullable();
    table.timestamp('birthday', { useTz: false }).nullable();
    table.string('timezoneName').notNullable().defaultTo('Europe/Istanbul');
    table.specificType('spokenLanguages', 'TEXT[]').notNullable().defaultTo('{en}');
    table.timestamp('createdAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updatedAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
