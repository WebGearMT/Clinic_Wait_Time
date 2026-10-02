require('dotenv').config();
const db_conn = require('../dbConn');
const e_session = require('express-session');
const ses_sequelize = require('@sequelize/core');
const ses_sequelizeStore = require('connect-session-sequelize')(e_session.Store);

const sesConfig = (NODE_ENV: NodeJS.Process | string) => e_session({
     secret: process.env.SESSION_SECRET || 'your-secret-key',
     resave: false,
     saveUninitialized: false,
     store: ses_sequelizeStore.create({
         seqUrl: process.env.DATABASE_URL,
         tableName: 'sessions',
         db: ses_sequelize,
         checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
         expiration: 24 * 60 * 60 * 1000 // 24 hours
     }),
     cookie: {
         secure: NODE_ENV === 'production',
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000 // 24 hours
     }
});

module.exports = sesConfig;