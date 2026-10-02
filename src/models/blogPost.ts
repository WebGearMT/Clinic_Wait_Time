/**
 * This file contains the model for blog posts in the application.
 * It defines the structure of a blog post, including its properties and types.
 * @module blogPostModel
 * @requires sequelize
 * @requires sequelize-typescript
 * @version 1.0.0
 * @since 2025-08-11
 */

import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from '@sequelize/core';

const decorators = require('@sequelize/core/decorators-legacy');
const { Attribute, PrimaryKey, AutoIncrement, Table } = decorators;

class BlogPost extends Model<InferAttributes<BlogPost>, InferCreationAttributes<BlogPost>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare title: string;

    @Attribute(DataTypes.STRING)
    declare content: string;

    @Attribute(DataTypes.STRING)
    declare author: string;

    @Attribute(DataTypes.DATE)
    declare createdAt: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    declare updatedAt: CreationOptional<Date>;
}

export default BlogPost;