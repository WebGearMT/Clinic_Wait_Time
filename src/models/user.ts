/**
 * This file defines the User model for the application.
 * It uses Sequelize to define the model structure and its attributes.
 * @module userModel
 * @requires Sequelize
 * @version 1.0.0
 * @since 2025-08-11
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

const userBcrypt = require('bcryptjs');

interface UserAttributes {
    id: CreationOptional<number>;
    userId: string;
    username: string;
    firstName?: string;
    lastName?: string;
    tel?: string;
    email: string;
    password: string;
}

type UserCreationAttributes = PartialBy<UserAttributes, 'id'>;

@Table({
    tableName: 'users',
    timeStamps: false
})
class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare userId: string;

    @Attribute(DataTypes.STRING)
    declare username: string;

    @Attribute(DataTypes.STRING)
    declare firstName?: string;

    @Attribute(DataTypes.STRING)
    declare lastName?: string;

    @Attribute(DataTypes.STRING)
    declare tel?: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    })
    declare email: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    })
    declare password: string; 

    // Instance method for password validation
    async validatePassword(password: string): Promise<boolean> {
        return await userBcrypt.compare(password, this.password);
    }    
}

sequelize.addModels([User]);

// Hash the password before creating a new user
User.beforeCreate(async (user) => {    
    const userInstance = user as User;
    if (userInstance.password) {
        const salt = await userBcrypt.genSalt(10);
        userInstance.password = await userBcrypt.hash(userInstance.password, salt);
    }
});

// Before updating a user
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const userInstance = user as User;
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        userInstance.password = await bcrypt.hash(userInstance.password, salt);
    }
});

export default User;