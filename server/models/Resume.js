import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, default: '' },
  position: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  description: { type: String, default: '' },
  current: { type: Boolean, default: false },
});

const educationSchema = new mongoose.Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  field: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
});

const skillSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  level: { type: String, default: 'Beginner' }, // Beginner, Intermediate, Expert, etc.
});

const projectSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  technologies: { type: String, default: '' },
  link: { type: String, default: '' },
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      default: 'Untitled Resume',
    },
    template: {
      type: String,
      enum: ['modern', 'classic', 'minimal', 'minimalImage'],
      default: 'modern',
    },
    color: {
      type: String,
      default: '#3b82f6', // Tailwind blue-500 default
    },
    personalInfo: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
      profileImage: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
    projects: [projectSchema],
  },
  {
    timestamps: true,
  }
);

// Add explicit index on userId and updatedAt for query performance
resumeSchema.index({ userId: 1, updatedAt: -1 });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
