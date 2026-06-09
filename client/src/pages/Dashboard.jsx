import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../configs/api';
import toast from 'react-hot-toast';
import Skeleton from '../components/ui/Skeleton';
import { Plus, Edit2, Trash2, ExternalLink, Calendar, FileText, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/resume');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResume = async () => {
    const toastId = toast.loading('Creating new resume...');
    try {
      const response = await api.post('/resume', { title: 'New Professional Resume' });
      const newResume = response.data;
      toast.success('Resume created!', { id: toastId });
      navigate(`/resume-builder/${newResume._id}`);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume', { id: toastId });
    }
  };

  const handleDeleteResume = async (id, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;

    // Optimistic UI update: remove from local state immediately
    const originalResumes = [...resumes];
    setResumes(resumes.filter((r) => r._id !== id));
    toast.success('Resume deleted successfully');

    try {
      await api.delete(`/resume/${id}`);
    } catch (error) {
      console.error('Error deleting resume:', error);
      // Revert state on error
      setResumes(originalResumes);
      toast.error('Failed to delete resume. Reverting...');
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Upper header action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/30 p-6 rounded-2xl border border-slate-900">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
            My Resumes <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-medium">{resumes.length}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage, optimize, and share your professional resumes.</p>
        </div>
        <button
          onClick={handleCreateResume}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl shadow-lg shadow-blue-500/10 transition-colors"
        >
          <Plus size={16} /> Create Resume
        </button>
      </div>

      {/* Grid of Resumes */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Skeleton type="card" count={3} />
        </div>
      ) : resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-900/20 rounded-3xl border border-slate-900/60 border-dashed max-w-lg mx-auto space-y-4">
          <div className="bg-slate-900 p-4 rounded-2xl text-slate-600">
            <FileText size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200">No resumes yet</h3>
            <p className="text-xs text-slate-500">Kickstart your career journey by creating your first CV.</p>
          </div>
          <button
            onClick={handleCreateResume}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all"
          >
            <Plus size={15} /> Create Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="glass-panel group rounded-2xl border border-slate-900 bg-slate-900/10 hover:border-slate-800/80 transition-all duration-350 p-5 flex flex-col justify-between space-y-4 shadow-xl"
            >
              {/* Card visual template tag */}
              <div className="h-32 bg-slate-950/60 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-900/80">
                {/* Accent line based on template color config */}
                <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: resume.color || '#3b82f6' }} />
                
                <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg select-none">
                  {resume.template || 'modern'} template
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                  {resume.title || 'Untitled Resume'}
                </h3>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Calendar size={11} />
                  <span>
                    Updated {new Date(resume.updatedAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-900">
                <div className="flex gap-2">
                  <Link
                    to={`/resume-builder/${resume._id}`}
                    className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700/60 transition-colors"
                  >
                    <Edit2 size={12} /> Edit
                  </Link>
                  <Link
                    to={`/preview/${resume._id}`}
                    target="_blank"
                    className="flex items-center gap-1 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-slate-800/80"
                  >
                    <ExternalLink size={12} /> Share
                  </Link>
                </div>

                <button
                  onClick={() => handleDeleteResume(resume._id, resume.title)}
                  className="text-slate-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                  title="Delete resume"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
