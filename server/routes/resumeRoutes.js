import express from 'express';
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  getPublicResume,
  uploadImage,
  getImageKitAuth,
} from '../controllers/resumeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../configs/multer.js';

const router = express.Router();

// Public share link route (No auth)
router.get('/public/:id', getPublicResume);

// Secure routes (Require authMiddleware)
router.post('/', authMiddleware, createResume);
router.get('/', authMiddleware, getResumes);
router.get('/imagekit-auth', authMiddleware, getImageKitAuth);
router.post('/upload-image', authMiddleware, upload.single('image'), uploadImage);
router.get('/:id', authMiddleware, getResumeById);
router.put('/:id', authMiddleware, updateResume);
router.delete('/:id', authMiddleware, deleteResume);

export default router;
