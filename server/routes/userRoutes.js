import express from 'express';
import rateLimit from 'express-rate-limit';
import { register, login, getProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rate limiter for authentication routes: max 10 requests per 15 minutes
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: 'Too many authentication attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);
router.get('/profile', authMiddleware, getProfile);

export default router;
