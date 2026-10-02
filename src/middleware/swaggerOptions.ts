'use strict';
require('dotenv').config();
/** 
 * Swagger Options Configuration
 * @param {number} Port - The port number for the API server.
 * @returns {object} Swagger options for API documentation.
 * @throws {Error} If PORT  is not defined.
 * @description This function sets up the Swagger options for the WJ Parts API, including API metadata,
 * server information, and security schemes. It is used to generate API documentation for the e-commerce
 * platform specializing in auto parts.
 * @example
 * const swaggerOptions = require('.middleware/swaggerOptions');
 * const options = swaggerOptions(3000);
 * console.log(options);
 * @see {@link https://swagger.io/docs/specification/} for more information on Swagger/OpenAPI specifications.
 * @see {@link https://www.npmjs.com/package/swagger-jsdoc} for the Swagger JSDoc package used to generate the documentation.
 * @see {@link https://www.npmjs.com/package/swagger-ui-express} for the Swagger UI Express package used to server the documentation.
 * @see {@link https://www.npmjs.com/package/swagger-jsdoc#readme} for the Swagger JSDoc documentation.
 * @see {@link https://www.npmjs.com/package/swagger-ui-express#readme} for the Swagger UI Express documentation.
*/
function swaggerOptions(PORT: string) {
    if (!PORT) {
        throw new Error('PORT is not defined');
    }

    const swaggerOptions = {
        definition: {
            openapi: '3.0.4',
            info: {
                title: 'WJ Parts API',
                version: '1.0.0',
                description: 'E-commerce API for auto parts',
                contact: {
                    name: 'WJ Parts Support',
                    email: 'support@wjparts.com'
                }
            },
            servers: [
                {
                    url: `http://localhost:${PORT}/api`,
                    description: 'Development server'
                }
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            }
        },
        apis: ['./routes/*.ts']
    };
    
    return swaggerOptions;
}

module.exports = swaggerOptions;