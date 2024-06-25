import { SqliteDriver } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';

export default {
  entities: ['src/**/*.entity.ts'],
  dbName: 'my-db-name.sqlite3',
  driver: SqliteDriver,
  extensions: [Migrator],
};
