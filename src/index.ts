'use strict';
// =============================================================================
// WJ PARTS - EXPRESS.JS BACKEND ENTRY POINT
// =============================================================================

// Load environment variables first
require('dotenv').config();

// Core dependencies
import express, { Request, Response } from 'express';
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Database
//const dbConnect = require('./dbConn');


// Authentication & Security
const passport = require('passport');
//const session = require('express-session');
//const sessionConfig = require('./middleware/sessionConfig');
// const security = require('./middleware/security'); // Custom middleware for security, CORS, etc.
import { helmetConfig, corsConfig, limiter } from './middleware/security';
//const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const errorHandling = require('./middleware/errorHandling');

// Utilities
const utilityFunctions = require('./middleware/utilities');
const _ = require('lodash');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const Joi = require('joi');

// File handling
const fileHandling = require('./middleware/fileHandling');
const cloudinary = require('cloudinary').v2;

// Email
const emailConfig = require('./middleware/emailConfiguration');

// Payment processing
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const payfast = require('payfast-nodejs'); // Uncomment when needed

// API Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./middleware/swaggerOptions'); // Swagger options for setup

import { NextFunction } from 'express';
// Routes
//const apiRoutes = require('./routes/api'); // Import API routes
import { apiRoutes } from './routes/api';
import { String } from 'lodash';

// =============================================================================
// LOGGER CONFIGURATION
// =============================================================================


// =============================================================================
// EXPRESS APP INITIALIZATION
// =============================================================================
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// =============================================================================
// CLOUDINARY CONFIGURATION
// =============================================================================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// =============================================================================
// DATABASE CONNECTION
// =============================================================================
/*
error: TypeError: ses_sequelizeStore.create is not a function
*/
/*
const connectDB = async () => {
    try {
        await dbConnect.sequelize.authenticate();
        utilityFunctions.logger.info('PostgreSQL Database connected successfully');

        await dbConnect.sequelize.sync({ force: false });
        utilityFunctions.logger.info('PostgreSQL Database synchronized successfully');
    } catch (error) {
        utilityFunctions.logger.error('Database connection error:', error);
        process.exit(1);
    }
};
connectDB();
*/

// =============================================================================
// MIDDLEWARE SETUP
// =============================================================================

// Security middleware
app.use(helmetConfig);

// CORS configuration
app.use(corsConfig);

// Rate limiting
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Session configuration

//app.use(sessionConfig);

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// =============================================================================
// MULTER CONFIGURATION FOR FILE UPLOADS
// =============================================================================
const upload = fileHandling.multerUpload;

// =============================================================================
// SWAGGER DOCUMENTATION SETUP
// =============================================================================

const options = swaggerOptions(PORT);

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// =============================================================================
// EMAIL CONFIGURATION
// =============================================================================
const transporter = emailConfig.transport;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================



// =============================================================================
// ROUTE IMPORTS AND SETUP
// =============================================================================

// Import route modules (these files need to be created)
// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/users');
// const productRoutes = require('./routes/products');
// const orderRoutes = require('./routes/orders');
// const categoryRoutes = require('./routes/categories');
// const partRequestRoutes = require('./routes/partRequests');
// const paymentRoutes = require('./routes/payments');

// Basic route structure
app.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV
    });
});

// API Routes (uncomment as you create the route files)
// app.use('/routes/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/part-requests', partRequestRoutes);
// app.use('/api/payments', paymentRoutes);
app.use('/signUp', apiRoutes.auth.signUp);
app.use('/login', apiRoutes.auth.login);
app.use('/logout', apiRoutes.auth.logout);


// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

// Validation error handler
const handleValidationErrors = errorHandling.handleValidationErrors;

// 404 handler
// app.use('/(.*)/', (req: Request, res: Response) => {
//     res.status(404).json({
//         success: false,
//         message: `Route ${req.originalUrl} not found`
//     });
// });

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    utilityFunctions.logger.error(err.stack);
    
    let error = { ...err, res };
    error.message = err.message;

    // Sequelize bad ObjectId
    if (err.name === 'CastError') {
        const message: string = 'Resource not found';
        const status = 404;
        const errorMsg = {message, status };
        res.send(errorMsg);
    }

    // Sequelize duplicate key
    if ((err as any).code === 11000) {
        const message = 'Duplicate field value entered';
        const status = 400;
        const errorMsg = { message, status };
        res.send(errorMsg);
    }

    // Sequelize validation error
    if (err.name === 'ValidationError') {
        const validationErr = err as any;
        const message = Object.values(validationErr.errors).map((val: any) => val.message);
        const errorMsg = { message, status: 400 };
        res.send(errorMsg);
    }

    res.status(res.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        ...(NODE_ENV === 'development' && { stack: err.stack })
    });
});

// =============================================================================
// GRACEFUL SHUTDOWN
// =============================================================================
/*
const gracefulShutdown = (signal: string) => {
    utilityFunctions.logger.info(`Received ${signal}. Shutting down gracefully...`);
    
    server.close(() => {
        try {
            dbConnect.sequelize.close(false, () => {
                utilityFunctions.logger.info('Database connection closed');
                process.exit(0);
            });
        } catch (error: any) {
            console.log('server shutdown failed', error);
        }
        utilityFunctions.logger.info('Process terminated gracefully');
        
    });

    // Force close after 10 seconds
    setTimeout(() => {
        utilityFunctions.logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
};

// Handle process termination
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
*/
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    utilityFunctions.logger.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err, promise) => {
    utilityFunctions.logger.error('Unhandled Rejection at:', promise, 'reason:', err);
    server.close(() => {
        process.exit(1);
    });
});

// =============================================================================
// START SERVER
// =============================================================================
const server = app.listen(PORT, () => {
    utilityFunctions.logger.info(`WJ Parts API server running in ${NODE_ENV} mode on port ${PORT}`);
    utilityFunctions.logger.info(`Documentation available at: http://localhost:${PORT}/api-docs`);
    utilityFunctions.logger.info(`Health check available at: http://localhost:${PORT}/health`);
});

// Export app for testing
module.exports = app;
