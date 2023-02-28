import knex, { Knex } from 'knex';

export const dbConnection: Knex = (knex as any)({
    client: 'sqlite3',
    connection: {
        filename: `./db/mvb.db`,
    }
  });

