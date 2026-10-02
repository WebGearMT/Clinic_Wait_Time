'use strict';
/**
 * Database connection module for PostgreSQL using Sequelize.
 * This module exports a Sequelize instance and a function to connect to the database.
 * It handles the connection to the PostgreSQL database specified in the environment variable DATABASE_URL.
 * It also includes error handling for connection issues.
 * @module db_conn
 * @requires sequelize
 * @requires dotenv
 * @requires logger
 * @see {@link https://sequelize.org/} for Sequelize documentation.
 * @see {@link https://www.npmjs.com/package/dotenv} for dotenv documentation.
 * @see {@link https://www.npmjs.com/package/logger} for logger documentation.
 */
require('dotenv').config();
const logger = require('./middleware/utilities').logger;
const { Sequelize } = require('@sequelize/core'); // Alternative for PostgreSQL
//import User from './models/user';
import Product from './models/product';

export const sequelize = new Sequelize( {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
    logging: console.log, // Set to false in production
    /*ssl: {
        require: false, // Change to true in production with valid certs
        rejectUnauthorized: false // Change to true in production with valid certs
    },*/
    //models: [ Product, User ]
});

// export const connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         logger.info('PostgreSQL Database connected successfully');
//     } catch (error) {
//         logger.error('Database connection error:', error);
//         process.exit(1);
//     }
// };

export const dbConn = {
  sequelize: sequelize,
  //connectDB: connectDB,
};
