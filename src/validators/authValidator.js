import { body } from 'express-validator';

export const registerValidation = [
  body('username')
    .trim()
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidation = [
  body('email').trim().isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];