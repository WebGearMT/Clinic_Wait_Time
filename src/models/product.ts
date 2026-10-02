/**
 * This file contains the model for products in the application.
 * It defines the structure of a product, including its properties and types.
 * @module productModel
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


class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
   
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare itemType: string;

    @Attribute(DataTypes.STRING)
    declare specs: string[];

    @Attribute(DataTypes.STRING)
    declare price: string;

    @Attribute(DataTypes.STRING)
    declare freight: string;

    @Attribute(DataTypes.STRING)
    declare description: string;

    @Attribute(DataTypes.STRING)
    declare image: string;

    @Attribute(DataTypes.STRING)
    declare returnPolicy: string;

    @Attribute(DataTypes.STRING)
    declare warranty: string;
}

export default Product;