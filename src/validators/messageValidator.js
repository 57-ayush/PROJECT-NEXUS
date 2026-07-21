import { body } from 'express-validator';

export const sendMessageValidation = [
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty if provided'),
  body('attachmentUrl').optional().trim().isURL().withMessage('Attachment must be a valid URL'),
];