/**
 * Migration runner (Umzug), driven by the same `sequelize` instance the rest
 * of the app uses — no separate connection config to keep in sync.
 *
 * Usage:
 *   npx ts-node src/db/migrate.ts up
 *   npx ts-node src/db/migrate.ts down
 *   npx ts-node src/db/migrate.ts pending
 *   npx ts-node src/db/migrate.ts executed
 *
 * Requires: npm i umzug
 */
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../dbConn';

const umzug = new Umzug({
  migrations: {
    glob: 'src/migrations/*.ts',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function main() {
  const command = process.argv[2];

  await sequelize.authenticate();

  switch (command) {
    case 'up':
      await umzug.up();
      break;
    case 'down':
      await umzug.down();
      break;
    case 'pending':
      console.log(await umzug.pending());
      break;
    case 'executed':
      console.log(await umzug.executed());
      break;
    default:
      console.error('Usage: migrate <up|down|pending|executed>');
      process.exitCode = 1;
      return;
  }

  await sequelize.close();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exitCode = 1;
});
