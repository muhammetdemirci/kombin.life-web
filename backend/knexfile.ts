import * as dotenv from 'dotenv';

dotenv.config();

module.exports = {
  client: 'pg',
  debug: true,
  connection: {
    connectionString:
      process.env.NODE_ENV === 'testing'
        ? process.env.DATABASE_TEST_URL
        : process.env.DATABASE_URL,
    timezone: 'utc',
    ssl: ['development', 'testing', 'local'].includes(process.env.NODE_ENV)
      ? false
      : { rejectUnauthorized: false },
  },
  pool: {
    min: 2,
    max: 16,
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
};
