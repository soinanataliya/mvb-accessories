import knex, { Knex } from 'knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbConnectionService {
  connection: Knex;

  connect = async (): Promise<Knex> => {
    this.connection = knex({
      client: 'sqlite3',
      connection: {
        filename: `db/mvb.db`,
      },
      useNullAsDefault: true,
    });

    return this.connection;
  };
}
