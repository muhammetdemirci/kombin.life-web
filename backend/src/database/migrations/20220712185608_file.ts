import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('file', (table) => {
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.enum('relation', ['user']).notNullable().defaultTo('user');
    table.uuid('relationId').notNullable();

    table.enum('storage', ['amazon_s3', 'cloudinary', 'local', 'unknown']).notNullable().defaultTo('unknown');

    table.enum('status', ['unknown', 'empty', 'pending', 'uploading', 'done', 'error']).notNullable();

    table.string('key').nullable();
    table.string('mimeType').nullable();

    table.float('size').nullable();
    table.string('directory').nullable();
    table.string('filename').nullable();
    table.string('alias').nullable();
    table.string('url').nullable();
    table.string('extension').nullable();
    table.string('etag').nullable();

    table.enum('access', ['public', 'private']).nullable();

    table.string('meta').nullable();

    table.timestamp('createdAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updatedAt', { useTz: false }).notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('deletedAt', { useTz: false }).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('file');
}
