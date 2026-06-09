import React from 'react';

export default function ProfessionalSummaryForm({ data = '', onChange, errors = {} }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-100">Professional Summary</h3>
      </div>
      <div className="space-y-1">
        <label className="text-xs text-slate-400 font-medium">Write a brief overview of your career, skills, and goals</label>
        <textarea
          value={data || ''}
          onChange={handleChange}
          rows={6}
          placeholder="Dynamic MERN stack developer with 3+ years of experience building scalable applications..."
          className={`w-full bg-slate-900 border ${errors.summary ? 'border-red-500' : 'border-slate-800'} rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 ${errors.summary ? 'focus:ring-red-500' : 'focus:ring-blue-500'} resize-y`}
        />
        {errors.summary && <p className="text-[11px] text-red-500">{errors.summary}</p>}
      </div>
    </div>
  );
}
