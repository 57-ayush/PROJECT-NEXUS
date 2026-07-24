import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protect = async (req, res, next) => {
  // ... your existing Day 4 code
};

export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error('Authentication error: no token provided'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-passwordHash');

    if (!user) {
      return next(new Error('Authentication error: user no longer exists'));
    }

    socket.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new Error('Authentication error: session expired'));
    }
    if (err.name === 'JsonWebTokenError') {
      return next(new Error('Authentication error: invalid token'));
    }
    console.error(err);
    return next(new Error('Authentication error: server error'));
  }
};