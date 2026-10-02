/**
 * This file contains the middleware used for authentication.
 * It contains the handlers used for logging in and registering.
 * @isAuthenticated a handler used for authenticating user login.
 * @author Mathys Taljaard
 * @version 1.0.0
 * @since 2025-08-12
 */

import { Request, Response, NextFunction } from "express";


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
     
    if (req.isAuthenticated()) {
         return next();
     }

     res.status(401).json({ message: 'Unauthorized' });
}