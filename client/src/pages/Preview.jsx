import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../configs/api';
import ResumePreview from '../components/ui/ResumePreview';
import Loader from '../components/ui/Loader';
import toast from 'react-hot-toast';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Preview() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        setLoading(true);
        // Call the unprotected public endpoint
        const response = await api.get(`/resume/public/${id}`);
        setResume(response.data);

        // Dynamically set metadata for SEO/link sharing previews
        if (response.data) {
          const name = response.data.personalInfo?.name || 'Professional CV';
          const summary = response.data.summary || 'View this professional CV built with AI Resume Builder.';
          
          document.title = `${name} - Resume`;
          
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
          }
          metaDescription.setAttribute('content', summary);
        }
      } catch (error) {
        console.error('Error fetching public resume:', error);
        toast.error('Could not load public resume preview. The link may be invalid.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();

    // Reset title on unmount
    return () => {
      document.title = 'AI Resume Builder';
    };
  }, [id]);

  if (loading) return <Loader fullScreen />;

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-300">Resume Not Found</h2>
        <p className="text-slate-500 text-sm max-w-sm">
          The link you followed may be incorrect, expired, or the resume owner has deleted it.
        </p>
        <Link to="/" className="text-blue-400 text-sm font-semibold hover:underline flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* Top Header info (non-printable or styled separately) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-900 print:hidden max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600/10 text-blue-400 p-1.5 rounded-lg">
            <Sparkles size={14} />
          </div>
          <span className="text-xs font-semibold text-slate-300">
            Public View — Shared by {resume.personalInfo?.name || 'the owner'}
          </span>
        </div>

        <button
          onClick={() => window.print()}
          className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold px-4 py-2 rounded-lg border border-slate-700/60 transition-colors"
        >
          Print Web View
        </button>
      </div>

      {/* Main Resume Render */}
      <div className="max-w-4xl mx-auto">
        <ResumePreview
          resumeData={resume}
          template={resume.template}
          color={resume.color}
        />
      </div>
    </div>
  );
}
