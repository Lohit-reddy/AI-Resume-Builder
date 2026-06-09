import React from 'react';
import { Plus, Trash } from 'lucide-react';

export default function SkillsForm({ data = [], onChange, errors = {} }) {
  const handleAdd = () => {
    const newSkill = {
      name: '',
      level: 'Intermediate',
    };
    onChange([...data, newSkill]);
  };

  const handleRemove = (index) => {
    const updated = data.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = data.map((skill, idx) => {
      if (idx === index) {
        return { ...skill, [field]: value };
      }
      return skill;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-100">Skills</h3>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={14} /> Add Skill
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-slate-800/80 border-dashed text-slate-500 text-sm">
          No skills listed yet. Click "Add Skill" to add your core competencies.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((skill, index) => {
            const skillErrors = errors.skills?.[index] || {};
            return (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="e.g. JavaScript"
                    className={`w-full bg-slate-900 border ${skillErrors.name ? 'border-red-500' : 'border-slate-800'} rounded-lg px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-1 ${skillErrors.name ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  />
                  {skillErrors.name && <p className="text-[9px] text-red-500">{skillErrors.name}</p>}
                </div>

                <select
                  value={skill.level || 'Intermediate'}
                  onChange={(e) => handleChange(index, 'level', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-slate-500 hover:text-red-400 p-1.5 transition-colors"
                  title="Remove skill"
                >
                  <Trash size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
