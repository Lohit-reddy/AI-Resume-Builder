import React from 'react';
import { Plus, Trash, Calendar } from 'lucide-react';

export default function EducationForm({ data = [], onChange, errors = {} }) {
  const handleAdd = () => {
    const newEdu = {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    onChange([...data, newEdu]);
  };

  const handleRemove = (index) => {
    const updated = data.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = data.map((edu, idx) => {
      if (idx === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-100">Education</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-slate-800/80 border-dashed text-slate-500 text-sm">
          No education listed yet. Click "Add Education" to add one.
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((edu, index) => {
            const eduErrors = errors.education?.[index] || {};
            return (
              <div
                key={index}
                className="relative bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 space-y-4 hover:border-slate-700/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                  title="Remove education"
                >
                  <Trash size={16} />
                </button>

                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  Education #{index + 1}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Institution */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Institution / University <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={edu.institution || ''}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      placeholder="e.g. Stanford University"
                      className={`w-full bg-slate-900 border ${eduErrors.institution ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 ${eduErrors.institution ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    />
                    {eduErrors.institution && <p className="text-[10px] text-red-500">{eduErrors.institution}</p>}
                  </div>

                  {/* Degree */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Degree <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                      className={`w-full bg-slate-900 border ${eduErrors.degree ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 ${eduErrors.degree ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                    />
                    {eduErrors.degree && <p className="text-[10px] text-red-500">{eduErrors.degree}</p>}
                  </div>

                  {/* Field of Study */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-medium">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field || ''}
                      onChange={(e) => handleChange(index, 'field', e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Start / End Dates */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">Start Date <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          type="text"
                          value={edu.startDate || ''}
                          onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                          placeholder="e.g. 2019"
                          className={`w-full bg-slate-900 border ${eduErrors.startDate ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 ${eduErrors.startDate ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                        />
                      </div>
                      {eduErrors.startDate && <p className="text-[10px] text-red-500">{eduErrors.startDate}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 font-medium">End Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={edu.endDate || ''}
                          onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                          placeholder="e.g. 2023"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-705 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
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
