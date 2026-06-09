import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../configs/api';
import useDebounce from '../hooks/useDebounce';
import toast from 'react-hot-toast';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from '../components/pdf/PDFDocument';

// Components
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ProfessionalSummaryForm from '../components/forms/ProfessionalSummaryForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectForm from '../components/forms/ProjectForm';
import ColorPicker from '../components/forms/ColorPicker';
import TemplatesSelector from '../components/ui/TemplatesSelector';
import ResumePreview from '../components/ui/ResumePreview';
import Loader from '../components/ui/Loader';

// Icons
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit,
  Palette,
  Sparkles,
  Upload,
  Download,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

const tabs = [
  { id: 'personal', name: 'Personal Info', icon: User },
  { id: 'summary', name: 'Summary', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'education', name: 'Education', icon: GraduationCap },
  { id: 'skills', name: 'Skills', icon: Wrench },
  { id: 'projects', name: 'Projects', icon: FolderGit },
  { id: 'customize', name: 'Customize', icon: Palette },
];

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  
  // Main resume state
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const [errors, setErrors] = useState({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  // Auto-save control flags
  const isInitialLoad = useRef(true);
  const lastSavedData = useRef('');

  // Debounced resume state
  const debouncedResume = useDebounce(resume, 800);

  // Fetch initial resume data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/resume/${id}`);
        setResume(response.data);
        lastSavedData.current = JSON.stringify(response.data);
      } catch (error) {
        console.error('Error fetching resume:', error);
        toast.error('Failed to load resume details');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id, navigate]);

  // Client-side Validation helper
  const validateResume = (data) => {
    const tempErrors = {};
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // Personal Info validation
    const info = data.personalInfo || {};
    if (!info.name || !info.name.trim()) {
      tempErrors.name = 'Name is required';
    }
    if (!info.email || !info.email.trim()) {
      tempErrors.email = 'Email is required';
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(info.email)) {
        tempErrors.email = 'Please enter a valid email';
      }
    }
    if (!info.phone || !info.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    }
    if (info.linkedin && !urlRegex.test(info.linkedin)) {
      tempErrors.linkedin = 'Please enter a valid URL';
    }
    if (info.github && !urlRegex.test(info.github)) {
      tempErrors.github = 'Please enter a valid URL';
    }
    if (info.website && !urlRegex.test(info.website)) {
      tempErrors.website = 'Please enter a valid URL';
    }

    // Experience validation
    if (data.experience && data.experience.length > 0) {
      const expErrors = {};
      data.experience.forEach((exp, index) => {
        const singleErr = {};
        if (!exp.position || !exp.position.trim()) singleErr.position = 'Title is required';
        if (!exp.company || !exp.company.trim()) singleErr.company = 'Company is required';
        if (!exp.startDate || !exp.startDate.trim()) singleErr.startDate = 'Start date is required';
        if (Object.keys(singleErr).length > 0) {
          expErrors[index] = singleErr;
        }
      });
      if (Object.keys(expErrors).length > 0) {
        tempErrors.experience = expErrors;
      }
    }

    // Education validation
    if (data.education && data.education.length > 0) {
      const eduErrors = {};
      data.education.forEach((edu, index) => {
        const singleErr = {};
        if (!edu.institution || !edu.institution.trim()) singleErr.institution = 'Institution is required';
        if (!edu.degree || !edu.degree.trim()) singleErr.degree = 'Degree is required';
        if (!edu.startDate || !edu.startDate.trim()) singleErr.startDate = 'Start date is required';
        if (Object.keys(singleErr).length > 0) {
          eduErrors[index] = singleErr;
        }
      });
      if (Object.keys(eduErrors).length > 0) {
        tempErrors.education = eduErrors;
      }
    }

    // Skills validation
    if (data.skills && data.skills.length > 0) {
      const skillErrors = {};
      data.skills.forEach((skill, index) => {
        const singleErr = {};
        if (!skill.name || !skill.name.trim()) singleErr.name = 'Skill name is required';
        if (Object.keys(singleErr).length > 0) {
          skillErrors[index] = singleErr;
        }
      });
      if (Object.keys(skillErrors).length > 0) {
        tempErrors.skills = skillErrors;
      }
    }

    // Projects validation
    if (data.projects && data.projects.length > 0) {
      const projErrors = {};
      data.projects.forEach((proj, index) => {
        const singleErr = {};
        if (!proj.name || !proj.name.trim()) singleErr.name = 'Project name is required';
        if (proj.link && !urlRegex.test(proj.link)) singleErr.link = 'Please enter a valid URL';
        if (Object.keys(singleErr).length > 0) {
          projErrors[index] = singleErr;
        }
      });
      if (Object.keys(projErrors).length > 0) {
        tempErrors.projects = projErrors;
      }
    }

    return tempErrors;
  };

  // Perform validation on form changes (shows feedback immediately)
  useEffect(() => {
    if (resume) {
      const tempErrors = validateResume(resume);
      setErrors(tempErrors);
    }
  }, [resume]);

  // Debounced auto-save effect
  useEffect(() => {
    if (isInitialLoad.current) {
      if (resume) {
        isInitialLoad.current = false;
      }
      return;
    }

    const saveResume = async () => {
      const currentDataStr = JSON.stringify(debouncedResume);
      if (currentDataStr === lastSavedData.current) return;

      // Run validation before saving
      const validationErrors = validateResume(debouncedResume);
      if (Object.keys(validationErrors).length > 0) {
        setSaveStatus('error');
        return;
      }

      setSaveStatus('saving');
      try {
        await api.put(`/resume/${id}`, debouncedResume);
        lastSavedData.current = currentDataStr;
        setSaveStatus('saved');
      } catch (error) {
        console.error('Error saving resume:', error);
        setSaveStatus('error');
        toast.error('Failed to auto-save changes');
      }
    };

    if (debouncedResume) {
      saveResume();
    }
  }, [debouncedResume, id]);

  // AI Optimize Resume Call
  const handleAIOptimize = async () => {
    if (!resume) return;

    setIsOptimizing(true);
    const toastId = toast.loading('Gemini AI is analyzing and rewriting your resume...');
    try {
      const response = await api.post('/ai/optimize', resume);
      
      // Update local resume data. The schema-conformed object overrides.
      const optimizedResume = {
        ...resume,
        ...response.data,
      };

      setResume(optimizedResume);
      toast.success('Resume optimized successfully!', { id: toastId });
    } catch (error) {
      console.error('AI optimization error:', error);
      toast.error(error.response?.data?.message || 'Failed to optimize resume', { id: toastId });
    } finally {
      setIsOptimizing(false);
    }
  };

  // AI PDF Upload & Parse Call
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    setIsParsing(true);
    const toastId = toast.loading('Uploading and analyzing PDF structure with Gemini AI...');

    try {
      const response = await api.post('/ai/analyze-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Preserve title, template, and color configurations
      const parsedResume = {
        ...resume,
        personalInfo: response.data.personalInfo || {},
        summary: response.data.summary || '',
        experience: response.data.experience || [],
        education: response.data.education || [],
        skills: response.data.skills || [],
        projects: response.data.projects || [],
      };

      setResume(parsedResume);
      toast.success('Successfully structured your resume PDF!', { id: toastId });
    } catch (error) {
      console.error('PDF Analysis error:', error);
      toast.error(error.response?.data?.message || 'Failed to parse PDF', { id: toastId });
    } finally {
      setIsParsing(false);
      e.target.value = null; // Reset input field
    }
  };

  const handleFieldChange = (section, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  if (loading) return <Loader fullScreen />;
  if (!resume) return null;

  return (
    <div className="flex flex-col gap-6 py-4 h-full">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <input
            type="text"
            value={resume.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="bg-transparent text-lg font-bold text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-b border-blue-500 max-w-[280px] sm:max-w-xs"
          />
          
          {/* Saved indicator */}
          <div className="flex items-center gap-1.5 text-xs">
            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1 text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle size={12} /> Saved
              </span>
            )}
            {saveStatus === 'saving' && (
              <span className="flex items-center gap-1 text-amber-400 font-medium bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 animate-pulse">
                <Loader size="sm" /> Auto-Saving...
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="flex items-center gap-1 text-red-400 font-medium bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                <AlertTriangle size={12} /> Errors Present
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* AI Optimize */}
          <button
            onClick={handleAIOptimize}
            disabled={isOptimizing}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md hover:scale-[1.01]"
          >
            <Sparkles size={14} /> AI Optimize (Gemini)
          </button>

          {/* Import PDF */}
          <label className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 cursor-pointer transition-all">
            <Upload size={14} /> Upload PDF
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handlePdfUpload}
              disabled={isParsing}
            />
          </label>

          {/* PDF Download Link */}
          {Object.keys(errors).length === 0 ? (
            <PDFDownloadLink
              document={<PDFDocument resumeData={resume} color={resume.color} />}
              fileName={`${resume.personalInfo?.name || 'resume'}.pdf`}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
            >
              {({ loading }) => (
                <>
                  <Download size={14} />
                  <span>{loading ? 'Preparing...' : 'Download PDF'}</span>
                </>
              )}
            </PDFDownloadLink>
          ) : (
            <button
              onClick={() => toast.error('Fix form validation errors before downloading.')}
              className="flex items-center gap-1.5 bg-slate-850 text-slate-500 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-800/80 cursor-not-allowed shrink-0"
            >
              <Download size={14} /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* Main split work space */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form Inputs (Lg col span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Tab Selector Buttons */}
          <div className="glass-panel p-2 rounded-2xl border border-slate-900 bg-slate-900/10 flex flex-wrap gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const hasTabError =
                tab.id === 'personal'
                  ? errors.name || errors.email || errors.phone || errors.linkedin || errors.github || errors.website
                  : tab.id === 'experience'
                  ? errors.experience
                  : tab.id === 'education'
                  ? errors.education
                  : tab.id === 'skills'
                  ? errors.skills
                  : tab.id === 'projects'
                  ? errors.projects
                  : null;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.name}</span>
                  {hasTabError && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Tab Form Panel */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-900 bg-slate-900/10 min-h-[400px]">
            {activeTab === 'personal' && (
              <PersonalInfoForm
                data={resume.personalInfo}
                onChange={(val) => handleFieldChange('personalInfo', val)}
                errors={errors}
              />
            )}
            {activeTab === 'summary' && (
              <ProfessionalSummaryForm
                data={resume.summary}
                onChange={(val) => handleFieldChange('summary', val)}
                errors={errors}
              />
            )}
            {activeTab === 'experience' && (
              <ExperienceForm
                data={resume.experience}
                onChange={(val) => handleFieldChange('experience', val)}
                errors={errors}
              />
            )}
            {activeTab === 'education' && (
              <EducationForm
                data={resume.education}
                onChange={(val) => handleFieldChange('education', val)}
                errors={errors}
              />
            )}
            {activeTab === 'skills' && (
              <SkillsForm
                data={resume.skills}
                onChange={(val) => handleFieldChange('skills', val)}
                errors={errors}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectForm
                data={resume.projects}
                onChange={(val) => handleFieldChange('projects', val)}
                errors={errors}
              />
            )}
            {activeTab === 'customize' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-100">Customize Design</h3>
                <TemplatesSelector
                  selectedTemplate={resume.template}
                  onSelect={(val) => handleFieldChange('template', val)}
                />
                <hr className="border-slate-900" />
                <ColorPicker
                  selectedColor={resume.color}
                  onChange={(val) => handleFieldChange('color', val)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Preview Panel (Lg col span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-3 sticky top-28">
          <div className="flex justify-between items-center text-xs text-slate-500 px-2 font-medium">
            <span>Live CV Preview (Page view width constrained)</span>
            {saveStatus === 'saving' && <span className="animate-pulse text-amber-500">updating...</span>}
          </div>
          <ResumePreview
            resumeData={resume}
            template={resume.template}
            color={resume.color}
          />
        </div>
      </div>
    </div>
  );
}
