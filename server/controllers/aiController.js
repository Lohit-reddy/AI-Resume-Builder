import { model } from '../configs/ai.js';
import { imagekit } from '../configs/imageKit.js';
import pdf from 'pdf-parse';

// Define the JSON schema for Gemini structured output
const resumeSchema = {
  type: 'object',
  properties: {
    personalInfo: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        location: { type: 'string' },
        linkedin: { type: 'string' },
        github: { type: 'string' },
        website: { type: 'string' },
        profileImage: { type: 'string' },
      },
      required: ['name', 'email', 'phone', 'location', 'linkedin', 'github', 'website', 'profileImage'],
    },
    summary: { type: 'string' },
    experience: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          company: { type: 'string' },
          position: { type: 'string' },
          startDate: { type: 'string' },
          endDate: { type: 'string' },
          description: { type: 'string' },
          current: { type: 'boolean' },
        },
        required: ['company', 'position', 'startDate', 'endDate', 'description', 'current'],
      },
    },
    education: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          institution: { type: 'string' },
          degree: { type: 'string' },
          field: { type: 'string' },
          startDate: { type: 'string' },
          endDate: { type: 'string' },
        },
        required: ['institution', 'degree', 'field', 'startDate', 'endDate'],
      },
    },
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          level: { type: 'string' },
        },
        required: ['name', 'level'],
      },
    },
    projects: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          technologies: { type: 'string' },
          link: { type: 'string' },
        },
        required: ['name', 'description', 'technologies', 'link'],
      },
    },
  },
  required: ['personalInfo', 'summary', 'experience', 'education', 'skills', 'projects'],
};

// Helper function to call Gemini with a prompt and force JSON response
const generateStructuredJSON = async (promptText) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: resumeSchema,
      },
    });

    const textResponse = result.response.text();
    return JSON.parse(textResponse);
  } catch (error) {
    console.error('Gemini API call or JSON parse error:', error);
    // Fallback search inside response if it has extra text
    try {
      const result = await model.generateContent(promptText + '\nReturn ONLY valid JSON matching this schema: ' + JSON.stringify(resumeSchema));
      const rawText = result.response.text();
      // Clean up potential markdown code fences
      const cleanJsonStr = rawText.replace(/```json/i, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJsonStr);
    } catch (fallbackError) {
      throw new Error('Failed to generate structured data from Gemini: ' + fallbackError.message);
    }
  }
};

// Feature 1 - AI Resume Optimize
export const optimizeResume = async (req, res, next) => {
  try {
    const resumeData = req.body;

    if (!resumeData) {
      return res.status(400).json({ message: 'Resume data is required for optimization' });
    }

    const prompt = `
      You are a professional resume optimizer and career coach. Review and rewrite this resume data.
      Here is the input resume JSON:
      ${JSON.stringify(resumeData, null, 2)}

      Please follow these instructions:
      1. Keep the personal info intact, but fill in missing sections or sanitize standard values.
      2. Rewrite the professional summary to be highly compelling, professional, and dense with high-impact keywords tailored for ATS (Applicant Tracking Systems).
      3. For every work experience, rewrite the description bullet points to start with strong action verbs and, where possible, add or estimate quantifiable metrics (e.g., "Increased sales by 15%", "Reduced load times by 40%"). Do not write generic statements.
      4. Rewrite the project descriptions to showcase technologies clearly and detail specific contributions.
      5. Suggest 4-6 relevant technical or soft skills and populate them in the skills array based on the experience and projects provided.
      6. Return a complete resume object that matches the structure of the input and conforms to the required JSON schema.
    `;

    const optimizedData = await generateStructuredJSON(prompt);
    return res.status(200).json(optimizedData);
  } catch (error) {
    next(error);
  }
};

// Feature 2 - Upload & Optimize Existing PDF
export const analyzePDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    // Extract text from PDF buffer
    let pdfText = '';
    try {
      const parsedData = await pdf(req.file.buffer);
      pdfText = parsedData.text;
    } catch (parseError) {
      console.error('PDF Parse Error:', parseError);
      return res.status(400).json({ message: 'Failed to read PDF file content. Ensure it is a text-based PDF.' });
    }

    if (!pdfText || pdfText.trim().length === 0) {
      return res.status(400).json({ message: 'No readable text could be extracted from the PDF.' });
    }

    const prompt = `
      You are an ATS parser. Extract and structure information from the raw text of a resume PDF.
      Parse all contact details, work experience, education history, technical and soft skills, and projects.
      Map the parsed data into the resume JSON schema.
      If a section is not present in the PDF, return an empty array or empty string, do not invent records.

      Here is the extracted raw PDF text:
      --- START OF TEXT ---
      ${pdfText}
      --- END OF TEXT ---
    `;

    const structuredData = await generateStructuredJSON(prompt);
    return res.status(200).json(structuredData);
  } catch (error) {
    next(error);
  }
};

// Background removal via ImageKit transformation API
export const removeBackground = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    // Generate transformed URL using ImageKit URL API
    const newImageUrl = imagekit.url({
      src: imageUrl,
      transformation: [
        {
          e: 'removedotbg', // ImageKit background removal extension
        },
      ],
    });

    return res.status(200).json({ newImageUrl });
  } catch (error) {
    next(error);
  }
};
