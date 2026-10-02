/**
 * This file contains the model for blog post authors.
 * It defines the attributes and methods for the blog post author model.
 * The model is used to interact with the database and manage blog authors.
 * @module blogAuthor
 * @version 1.0.0
 * @author Mathys Taljaard
 * @license MIT
 * @see {@link https://example.com/docs/blogAuthor} for more details.
 * @example
 * import { BlogAuthor } from './models/blogAuthor';
 * const author = new BlogAuthoer({
 * id: '123',
 * username: 'john_doe',
 * firstName: John,
 * lastName: 'Doe',
 * email: 'john@doe.com',
 * password: {
 *    type: 'string',
 *    allowNull: false,
 * }
 * });
 */

import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    ForeignKeyBrand
} from '@sequelize/core';

const decorators = require('@sequelize/core/decorators-legacy');
const { Attribute, PrimaryKey, AutoIncrement, Table } = decorators;

const User = require('./user');

export class BlogAuthor extends Model<InferAttributes<BlogAuthor>, InferCreationAttributes<BlogAuthor>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare username: string;

    @Attribute(DataTypes.STRING)
    declare firstName?: string;

    @Attribute(DataTypes.STRING)
    declare lastName?: string;

    @Attribute(DataTypes.STRING)
    declare email: string;

    @Attribute({
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    })
    declare password: {
        type: string;
        allowNull: boolean;
        hash: (password: string) => Promise<string>;
        validatePassword: (password: string) => Promise<boolean>;
    };
}

BlogAuthor.belongsTo(User, { foreignKey: 'id' });

export default BlogAuthor;