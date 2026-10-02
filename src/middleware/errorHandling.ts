'use strict';
const errorExpress = require('express');
const validationResult = require('express-validator').validationResult;

/**
 * Middleware to handle validation errors from express-validator.
 * If there are validation errrors, it sends a 400 response with the errors.
 * If there are no errors, it calls the next middleware.
 * @param {object} req - The request object.
 * @param {object} - res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 * @throws {Error} If there are validation errors.
 * @example
 * app.post('/api/resource', [
 *  body('field').isString().notEmpty(),
 *  body('anotherField').isInt()
 * ], validationErrorHandler, (req, res) => {
 *  res.status(200).json({ message: 'Success' });
 * });
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

const errorHandling = {
    handleValidationErrors: handleValidationErrors,
};

module.exports = errorHandling;