import React from 'react';
import { Plus, Trash, Link2 } from 'lucide-react';

export default function ProjectForm({ data = [], onChange, errors = {} }) {
  const handleAdd = () => {
    const newProj = {
      name: '',
      description: '',
      technologies: '',
      link: '',
    };
    onChange([...data, newProj]);
  };

  const handleRemove = (index) => {
    const updated = data.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = data.map((proj, idx) => {
      if (idx === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-100">Projects</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-slate-800/80 border-dashed text-slate-500 text-sm">
          No projects listed yet. Click "Add Project" to showcase your work.
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((proj, index) => {
            const projErrors = errors.projects?.[index] || {};
            return (
              <div
                key={index}
                className="relative bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-4 hover:border-slate-700/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove project"
                >
                  <Trash size={16} />
                </button>

                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  Project #{index + 1}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Project Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={proj.name || ''}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                      placeholder="e.g. Portfolio Website"
                      className={`w-full bg-slate-900 border ${projErrors.name ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 ${projErrors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    />
                    {projErrors.name && <p className="text-[10px] text-red-500">{projErrors.name}</p>}
                  </div>

                  {/* Project URL */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Project Link (URL)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={proj.link || ''}
                        onChange={(e) => handleChange(index, 'link', e.target.value)}
                        placeholder="https://myproject.com"
                        className={`w-full bg-slate-900 border ${projErrors.link ? 'border-red-500' : 'border-slate-800'} rounded-lg pl-3.5 pr-10 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 ${projErrors.link ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      />
                      <Link2 size={14} className="absolute right-3.5 top-3.5 text-slate-600" />
                    </div>
                    {projErrors.link && <p className="text-[10px] text-red-500">{projErrors.link}</p>}
                  </div>

                  {/* Technologies */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-slate-400 font-medium">Technologies Used (comma separated)</label>
                    <input
                      type="text"
                      value={proj.technologies || ''}
                      onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                      placeholder="React, Redux, Express, MongoDB"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-slate-400 font-medium">Project Description</label>
                    <textarea
                      value={proj.description || ''}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      rows={3}
                      placeholder="Describe the project goal, your implementation details, and outcomes..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
