import express from 'express';
import { optimizeResume, analyzePDF, removeBackground } from '../controllers/aiController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';

const router = express.Router();

// Apply authMiddleware to all AI routes
router.use(authMiddleware);

router.post('/optimize', optimizeResume);
router.post('/analyze-pdf', upload.single('pdf'), analyzePDF);
router.post('/remove-background', removeBackground);

export default router;
