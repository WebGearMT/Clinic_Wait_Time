'use strict';
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const winston = require('winston');


if (env.error) {
    throw new Error('env file not found or error loading. Please ensure .env file exists and is correctly configured.');
}
if (!env.parsed) {
    throw new Error('No environment variables found. Please ensure .env file is present and contains the required variables.');
}

// winston logger setup
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

// JWT token generation
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// Password hashing
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Image processing function
const processImage = async (buffer, width = 800, height = 600) => {
    return await sharp(buffer)
        .resize(width, height, { 
            fit: 'inside', 
            withoutEnlargement: true 
        })
        .jpeg({ quality: 80 })
        .toBuffer();
};

const utilities = {
    generateToken: generateToken,
    hashPassword: hashPassword,
    processImage: processImage,
    logger: logger,

};

module.exports = utilities;