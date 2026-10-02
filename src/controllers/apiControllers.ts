'use strict';
/**
 * This file contains the functions for creating CRUD routes and authentication routes for the API.
 * It exports functions to create these routes based on the provided controllers and request URLs.
 * @module apiControllers
 * @requires Express
 * @requires apiExpress
 * @requires typeCRUDController
 * @requires typeAuthController
 * @version 1.0.0
 * @since 2025-08-08
 */

const apiConExpress = require('express');

interface typeCRUDController {
    (req: any, res: any): void;
    itemType?: string;
    method?: string;
    specs?: [];
    price: number;
    freight: number;
    description?: string;
    image?: string;
    returnPolicy?: string;
    warranty?: string;
}

interface typeAuthController {
    (req: any, res: any): void;
    action?: string;
    user?: {
        id: string;
        email: string;
        password: string;
        role: string;
        totpSecret?: string;
    };
    token?: string;
}


/**
 * This function creates authentication routes for the API.
 * It sets up routes for signing up, logging in, signing out, and user management.
 * It uses the provided controller and request URL to define the routes.
 * @param controller 
 * @param reqURL  
 * @returns {void}
 * @example
 * createAUTHRoutes('/auth', authController, 'User Authentication');
 */
export function createAUTHRoutes(
  reqURL:String,
  controller: typeAuthController,
  itemType: String
  ) 
{
  const routes = apiConExpress.Router();

  // Create
  routes.post(reqURL, controller);
  
  // Read (All)
  routes.get(reqURL, controller);

  // Read (Single)
  routes.get(`${reqURL}/:id`, controller);

  // Update
  routes.put(`${reqURL}/:id`, controller);

  // Delete
  routes.delete(`${reqURL}/:id`, controller);
}


/**
 * This function creates CRUD routes for the API.
 * It sets up routes for creating, reading, updating, and deleting items.
 * It uses the provided controller and request URL to define the routes.
 * @param {typeCRUDController} controller - The controller to handle the CRUD operations (from ./controllers).
 * @param {String} reqURL - The request URL for the CRUD operations.
 * @returns {void}
 */
export function createCRUDRoutes(
  reqURL: String,
  controller: typeCRUDController,
  itemType: String
) 
{
  const routes = apiConExpress.Router();

  // Create
  routes.post(reqURL, controller);
  
  // Read (All)
  routes.get(reqURL, controller);

  // Read (Single)
  routes.get(`${reqURL}/:id`, controller);

  // Update
  routes.put(`${reqURL}/:id`, controller);

  // Delete
  routes.delete(`${reqURL}/:id`, controller);
}
