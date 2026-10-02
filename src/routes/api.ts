/**
 * API Routes for Vehicle Parts Management and User Authentication
 * This module sets up the routes for managing old parts, new parts, and stripped cars for spares,
 * as well as user authentication routes such as sign-up, login, and user management.
 * Each category has its own set of CRUD operations defined.
 * @module apiRoutes 
 * @requires express
 * @requires express.Router
 * @requires createCRUDRoutes
 * @requires oldPartsRouter
 * @requires newPartsRouter
 * @requires stripForSparesRouter
 * @requires signUpRouter
 * @requires loginRouter
 * @requires signOutRouter
 * @requires userManagementRouter
 * @requires TOTPRouter
 * @version 1.0.0
 * @since 2025-08-08
 */
const apiExpress = require('express');
const Router = apiExpress.Router();
//const createAPIRoutes = require('./controllers/apiControllers');
import { createCRUDRoutes, createAUTHRoutes } from '../controllers/apiControllers';
import passport, { login, signUp, logout } from '../controllers/auth/authControllers';

// Initialize routers for each category
const oldPartsRouter = apiExpress.Router();
const newPartsRouter = apiExpress.Router();
const stripForSparesRouter = apiExpress.Router();

// Initialize routers for authentication and user management
const signUpRouter = apiExpress.Router();
const loginRouter = apiExpress.Router();
const logoutRouter = apiExpress.Router();
const TOTPRouter = apiExpress.Router();

// Authentication Routes
signUpRouter.use('/signUp', signUp);
loginRouter.use('/login', login);
logoutRouter.use('/logout', logout);

// Old Parts Routes
// oldPartsRouter.use('/engine-components', createCRUDRoutes('/engine-components', controller, 'Engine Component'));
// oldPartsRouter.use('/body-panels', createCRUDRoutes('/body-panels', controller, 'Body Panel'));
// oldPartsRouter.use('/interior-parts', createCRUDRoutes('/interior-parts', controller, 'Interior Part'));
// oldPartsRouter.use('/electrical-components', createCRUDRoutes('/electrical-components', controller, 'Electrical Component'));
// oldPartsRouter.use('/suspension-parts', createCRUDRoutes('/suspension-parts', controller, 'Suspension Part'));

// New Parts Routes
// newPartsRouter.use('/braking-system', createCRUDRoutes('/braking-system', controller, 'Braking System'));
// newPartsRouter.use('/filters-and-fluids', createCRUDRoutes('/filters-and-fluids', controller, 'Filter and Fluid'));
// newPartsRouter.use('/lighting-and-electrical', createCRUDRoutes('/lighting-and-electrical', controller, 'Lighting and Electrical'));
// newPartsRouter.use('/engine-components', createCRUDRoutes('/engine-components', controller, 'Engine Component'));
// newPartsRouter.use('/exterior-accessories', createCRUDRoutes('/exterior-accessories', controller, 'Exterior Accessory'));

// Strip for Spares Routes
// stripForSparesRouter.use('/toyota-hilux-stripped-cars', createCRUDRoutes('/toyota-hilux-stripped-cars', controller, 'Toyota Hilux Stripped Car'));
// stripForSparesRouter.use('/toyota-landcruiser-stripped-cars', createCRUDRoutes('/toyota-landcruiser-stripped-cars', controller, 'Toyota Landcruiser Stripped Car'));
// stripForSparesRouter.use('/engine-assemblies', createCRUDRoutes('/engine-assemblies', controller, 'Engine Assembly'));
// stripForSparesRouter.use('/body-frames', createCRUDRoutes('/body-frames', controller, 'Body Frame'));
// stripForSparesRouter.use('/interior-trim', createCRUDRoutes('/interior-trim', controller, 'Interior Trim'));

// Function to create CRUD routes for a given item type
//createAPIRoutes.createCRUDRoutes('/old-parts', oldPartsRouter)


// Use the routers in your main Express app
// const apiRoutes = express();
// apiRoutes.use('/old-parts', oldPartsRouter);
// apiRoutes.use('/new-parts', newPartsRouter);
// apiRoutes.use('/strip-for-spares', stripForSparesRouter);



export const categoryRoutes = {
  oldParts: oldPartsRouter,
  newParts: newPartsRouter,
  stripSpares: stripForSparesRouter,
};
export const authRoutes = {
  signUp: signUpRouter,
  login: loginRouter,
  logout: logoutRouter,
  totp: TOTPRouter,
};

export const apiRoutes = {
  categories: categoryRoutes,
  auth: authRoutes,
};
