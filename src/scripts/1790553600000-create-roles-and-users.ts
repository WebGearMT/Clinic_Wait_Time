import { DataTypes } from '@sequelize/core';
import type { QueryInterface } from '@sequelize/core';

/**
 * roles + users
 *
 * Matches the real userModel.ts fields (id, userId, username, firstName,
 * lastName, tel, email, password) plus the new roleId FK. No createdAt/
 * updatedAt columns — the model is configured with timestamps: false.
 */

const ROLE_SEEDS: Array<{ name: string; permissions: Record<string, unknown> }> = [
  { name: 'owner', permissions: { all: true } },
  {
    name: 'admin',
    permissions: {
      pages: ['read', 'write'],
      templates: ['read', 'write'],
      blog: ['read', 'write'],
      categories: ['read', 'write'],
      products: ['read', 'write'],
      media: ['read', 'write'],
      mailing_list: ['read', 'write'],
      users: ['read', 'write'],
      analytics: ['read'],
    },
  },
  {
    name: 'editor',
    permissions: {
      pages: ['read', 'write'],
      blog: ['read', 'write'],
      categories: ['read', 'write'],
      products: ['read', 'write'],
      media: ['read', 'write'],
    },
  },
  { name: 'subscriber', permissions: {} },
];

export async function up({ context: queryInterface }: { context: QueryInterface }) {
  // Case-insensitive email. If @sequelize/core's DataTypes doesn't expose
  // CITEXT in your installed version, swap the users.email type below for
  // DataTypes.STRING and lowercase emails in application code instead.
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS citext;');

  await queryInterface.createTable('roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  });

  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.CITEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'RESTRICT', // can't delete a role that still has users
    },
  });

  await queryInterface.addIndex('users', ['roleId']);

  await queryInterface.bulkInsert('roles', ROLE_SEEDS as any);
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.dropTable('users');
  await queryInterface.dropTable('roles');
  // citext extension left installed on purpose — later migrations may use it.
}
