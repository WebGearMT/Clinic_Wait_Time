/**
 * This file contains the model for content in the "About" section.
 * It defines the attributes and methods for the AboutPost model.
 * The model is used to interact with the database and manage About posts.
 * @module AboutPost
 * @verion 1.0.0
 * @author Mathys Taljaard
 * @license MIT
 * @see {@link https://example.com/docs/aboutPost}
 * @example
 * import { AboutPost } from './models/aboutPost';
 * const aboutPost = new AboutPost({
 *      id: '123',
 *  })
 *  postTitle: 'About WJ Parts',
 *  paragraph: 'WJ Parts is a leading provider of automotive parts and accessories.',
 *  imageUrl: 'https://cloudinary.com/example/image.jpg',
 * });'
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

class AboutPost extends Model<InferAttributes<AboutPost>, InferCreationAttributes<AboutPost>> {
    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare postTitle: string;

    @Attribute(DataTypes.TEXT)
    declare paragraph: string;

    @Attribute(DataTypes.STRING)
    declare imageUrl: string;

    @Attribute(DataTypes.DATE)
    declare createdAt?: CreationOptional<Date>;

    @Attribute(DataTypes.DATE)
    declare updatedAt?: CreationOptional<Date>;
}

export default AboutPost;