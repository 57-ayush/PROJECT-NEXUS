import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/me', protect, (req, res) => res.status(200).json({ user: req.user }));

export default router;

