/**
 * This file defines the Role model for the application.
 * A role carries the permission set that decides what panel staff can do.
 * The "subscriber" role (empty permissions) is also used for front-end
 * customer accounts, which authenticate but have no panel access.
 * @module roleModel
 * @requires Sequelize
 */
import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from '@sequelize/core';

import { sequelize } from '../dbConn';

import type { PartialBy } from '@sequelize/utils';

const decorators = require('@sequelize/core/decorators-legacy');
const { Attribute, PrimaryKey, AutoIncrement, Table } = decorators;

interface RoleAttributes {
    id: CreationOptional<number>;
    name: string;
    permissions: Record<string, unknown>;
}

type RoleCreationAttributes = PartialBy<RoleAttributes, 'id' | 'permissions'>;

@Table({
    tableName: 'roles',
    timestamps: false,
})
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    })
    declare name: string;

    @Attribute({
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare permissions: Record<string, unknown>;
}

sequelize.addModels([Role]);

export default Role;
