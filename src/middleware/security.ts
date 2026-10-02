'use strict';
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passportSec = require('passport');

// helmet configuration
export const helmetConfig = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
});


// CORS configuration
export const corsConfig = cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
});


// Rate limiting
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    }
});

// https://www.youtube.com/watch?v=-RCnNyD0L-s
// Password hashing 


const security = {
    helmet: helmetConfig,
    cors: corsConfig,
    rateLimit: limiter,
};


//module.exports = security;