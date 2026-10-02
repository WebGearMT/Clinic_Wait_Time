/**
 * One-off script: create the first "owner" account.
 *
 * IMPORTANT: password hashing is handled by User.beforeCreate — this script
 * passes the plain-text password through. Hashing it here too would double-
 * hash it and lock the account out on first login.
 *
 * Usage:
 *   OWNER_USERNAME="janedoe" OWNER_EMAIL="jane@example.com" OWNER_PASSWORD="a-long-passphrase" \
 *   npx ts-node src/scripts/seedOwner.ts
 *
 * Safe to re-run: it does nothing if an owner already exists.
 */
import 'dotenv/config';
import { randomUUID } from 'crypto';
import { sequelize } from '../dbConn';
import User from '../models/userModel';
import Role from '../models/roleModel';

// Matches the User model's current validation (see userModel.ts).
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_BYTES = 72; // bcrypt ignores anything past this

function readInput() {
  const username = (process.env.OWNER_USERNAME || '').trim();
  const email = (process.env.OWNER_EMAIL || '').trim();
  const password = process.env.OWNER_PASSWORD || '';

  const problems: string[] = [];
  if (!username) problems.push('OWNER_USERNAME is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    problems.push('OWNER_EMAIL must be a valid email address.');
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    problems.push(`OWNER_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  if (Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES) {
    problems.push(`OWNER_PASSWORD must be at most ${MAX_PASSWORD_BYTES} bytes.`);
  }

  if (problems.length) {
    problems.forEach((p) => console.error(`- ${p}`));
    process.exit(1);
  }
  return { username, email, password };
}

async function main() {
  const { username, email, password } = readInput();

  await sequelize.authenticate();

  const ownerRole = await Role.findOne({ where: { name: 'owner' } });
  if (!ownerRole) {
    console.error('The "owner" role was not found. Run the migrations first.');
    process.exitCode = 1;
    return;
  }

  const existingOwner = await User.findOne({ where: { roleId: ownerRole.id } });
  if (existingOwner) {
    console.log('An owner account already exists. Nothing was changed.');
    return;
  }

  const emailConflict = await User.findOne({ where: { email } });
  if (emailConflict) {
    console.error('A user with that email already exists (and is not an owner). Nothing was changed.');
    process.exitCode = 1;
    return;
  }

  // userId's purpose isn't pinned down yet (see caveat below) — generating a
  // UUID as a placeholder so the required field isn't left empty.
  const owner = await User.create({
    userId: randomUUID(),
    username,
    email,
    password, // plain text on purpose — beforeCreate hashes it
    roleId: ownerRole.id,
  });

  console.log(`Owner account created (id ${owner.id}, ${email}).`);
}

main()
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
