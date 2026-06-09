import multer from 'multer';

const storage = multer.memoryStorage();

// Set up file size and type filters if necessary. For general usage, memory storage is clean.
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export default upload;
