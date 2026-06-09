import React from 'react';
import { Plus, Trash, Calendar } from 'lucide-react';

export default function ExperienceForm({ data = [], onChange, errors = {} }) {
  const handleAdd = () => {
    const newExp = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    };
    onChange([...data, newExp]);
  };

  const handleRemove = (index) => {
    const updated = data.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = data.map((exp, idx) => {
      if (idx === index) {
        // If current is checked, end date is cleared
        if (field === 'current' && value === true) {
          return { ...exp, [field]: value, endDate: '' };
        }
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-100">Work Experience</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-slate-800/80 border-dashed text-slate-500 text-sm">
          No experience listed yet. Click "Add Experience" to add one.
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp, index) => {
            const expErrors = errors.experience?.[index] || {};
            return (
              <div
                key={index}
                className="relative bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-4 hover:border-slate-700/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove experience"
                >
                  <Trash size={16} />
                </button>

                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  Job #{index + 1}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Job Title / Position <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => handleChange(index, 'position', e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className={`w-full bg-slate-900 border ${expErrors.position ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 ${expErrors.position ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    />
                    {expErrors.position && <p className="text-[10px] text-red-500">{expErrors.position}</p>}
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Company Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      placeholder="e.g. Google"
                      className={`w-full bg-slate-900 border ${expErrors.company ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 ${expErrors.company ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    />
                    {expErrors.company && <p className="text-[10px] text-red-500">{expErrors.company}</p>}
                  </div>

                  {/* Start Date */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Start Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        value={exp.startDate || ''}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        placeholder="e.g. Jan 2023"
                        className={`w-full bg-slate-900 border ${expErrors.startDate ? 'border-red-500' : 'border-slate-800'} rounded-lg pl-3.5 pr-10 py-2 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 ${expErrors.startDate ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                      />
                      <Calendar size={14} className="absolute right-3.5 top-3 text-slate-600" />
                    </div>
                    {expErrors.startDate && <p className="text-[10px] text-red-500">{expErrors.startDate}</p>}
                  </div>

                  {/* End Date */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-slate-400 font-medium">End Date</label>
                      <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={exp.current || false}
                          onChange={(e) => handleChange(index, 'current', e.target.checked)}
                          className="rounded bg-slate-900 border-slate-800 text-blue-500 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                        />
                        <span>Current</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={exp.endDate || ''}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        placeholder={exp.current ? 'Present' : 'e.g. Dec 2024'}
                        disabled={exp.current}
                        className={`w-full bg-slate-900 border ${expErrors.endDate ? 'border-red-500' : 'border-slate-800'} rounded-lg pl-3.5 pr-10 py-2 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 ${expErrors.endDate ? 'focus:ring-red-500' : 'focus:ring-blue-500'} disabled:opacity-50`}
                      />
                      <Calendar size={14} className="absolute right-3.5 top-3 text-slate-600" />
                    </div>
                    {expErrors.endDate && <p className="text-[10px] text-red-500">{expErrors.endDate}</p>}
                  </div>

                  {/* Description */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs text-slate-400 font-medium">Description</label>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      rows={4}
                      placeholder="• Led development of user-facing components using React 19.&#10;• Collaborated with cross-functional teams to deliver 15% system efficiency improvements."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-750 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y font-mono"
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
