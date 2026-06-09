import Resume from '../models/Resume.js';
import { imagekit } from '../configs/imageKit.js';
import crypto from 'crypto';

export const createResume = async (req, res, next) => {
  try {
    const { title } = req.body;
    const resume = new Resume({
      userId: req.user.id,
      title: title || 'Untitled Resume',
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
        profileImage: '',
      },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
    });
    await resume.save();
    return res.status(201).json(resume);
  } catch (error) {
    next(error);
  }
};

export const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    return res.status(200).json(resumes);
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOne({ _id: id, userId: req.user.id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or unauthorized' });
    }

    return res.status(200).json(resume);
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or unauthorized' });
    }

    return res.status(200).json(resume);
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found or unauthorized' });
    }

    return res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Public read-only preview (no auth required)
export const getPublicResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id).lean();

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    return res.status(200).json(resume);
  } catch (error) {
    next(error);
  }
};

// Multer upload endpoint -> ImageKit upload
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Convert buffer to base64
    const base64File = req.file.buffer.toString('base64');
    const fileName = `profile-${crypto.randomBytes(6).toString('hex')}-${req.file.originalname}`;

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: base64File,
      fileName,
      folder: '/resumes',
    });

    return res.status(200).json({ imageUrl: result.url });
  } catch (error) {
    console.error('ImageKit Upload Error:', error);
    next(error);
  }
};

// ImageKit authentication token endpoint for optional direct client-side uploads
export const getImageKitAuth = (req, res, next) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return res.status(200).json(authParams);
  } catch (error) {
    next(error);
  }
};
