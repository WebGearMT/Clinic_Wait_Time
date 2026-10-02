'use strict';
/**
* This file contains the controllers used for authentication in the API.
* It exports functions to handle user sign-up, login, logout, and user permissions management.
* @module authControllers
* @requires bcryptjs
* @requires sequelize
* @version 1.0.0
* @since 2025-08-11
*/
import { String } from 'lodash';
const passport = require('passport');
const LocalStrategy = require('passport-local');
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const GoogleAuthenticator = require('passport-2fa-totp').GoogleAuthenticator;
const MFA = require('passport-2fa-totp').Strategy;
const userSession = require('express-session');
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import UserAttributes from '../../models/user'
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { profile } from 'console';

/*
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.CALLBACK_URL}/api/v1/auth/google/callback`
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    where: { username } 
                });

                if (!user) {
                    user.create(
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        avatar: profile.photos[0].value
                    );
                    return done(null, user);
                }
            } catch (error: Error) {
                console.log('Google authentication error: ', error);
                return done(error);
            }
        }
    )
);
*/

passport.use(
	new MFA(
		async (username: string, password: string, done: Function) => {
			try {
                const user: UserAttributes | null = await User.findOne({ where: { username } });

                if (!user) {
                    return done(null, false);
                }

                const isMatch = await user.validatePassword(password);

                if (!isMatch) {
                    return done(null, user);
                }  



            } catch (error) {
                return done(error);
            }
		},
		
		function (user: UserAttributes, done: Function) {
            const userAuth = GoogleAuthenticator.register(user);
			if (!userAuth.secret) {
				done(new Error("Google Authenticator is not setup yet."));
			} else {
				const secret = GoogleAuthenticator.decodeSecret(userAuth.secret);
				done(null, secret, 10);
			}
		}
	)
);
/*
passport.use(
    new LocalStrategy(
        async (username: string, password: string, done: Function) => {
            try {
                const user: UserAttributes | null = await User.findOne({ where: { username } });
                if (!user) {
                    return done(null, false, { message: 'Incorrect username or password.' });
                }
                const isMatch = await user.validatePassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect username or password.'});
                }
                return done(null, user);
            }
            catch (error) {
                return done(error);
            }
        }
    )
);
*/

export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('2fa-totp', (err: any, user: UserAttributes | null, info: any) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: info.message || 'Authentication failed' });
        }
        req.logIn(user, (loginErr: any) => {
            if (loginErr) {
            	res.redirect('/login');
                return res.status(500).json({ message: 'Login failed' });
            }
        });
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        })
        res.send('/login');
    })(req, res, next);
};

passport.serializeUser(( user: UserAttributes, done: Function) => {
    done(null, user.id);
} );

passport.deserializeUser(async (id: string, done: Function) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            done(null, user);
        } else {
            done(new Error('User not found'));
        }
    } catch (error) {
        done(error);
    }
});

export default passport;

export const logout = (req: Request, res: Response) => {
    req.logout((err: any) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'User logged out successfully' });
    })
    res.send('/logout');
};

export const signUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userId = uuidv4();
    try {
        const existingUser = await User.findOne({ where: {username}});
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists. Please choose another one.'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            userId,
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password
            }
        })
    }
    catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    res.send('/sign-up');
};

