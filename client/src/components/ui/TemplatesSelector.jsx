import React from 'react';
import { Layout, FileText, Image, Grid } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern Split',
    description: 'A professional dual-column format highlighting skills & credentials.',
    icon: Grid,
  },
  {
    id: 'classic',
    name: 'Classic Serif',
    description: 'A traditional format optimized for executive and formal roles.',
    icon: FileText,
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'A lightweight structure with elegant spacing and subtle elements.',
    icon: Layout,
  },
  {
    id: 'minimalImage',
    name: 'Creative Portrait',
    description: 'A clean layout incorporating your profile picture.',
    icon: Image,
  },
];

export default function TemplatesSelector({ selectedTemplate = 'modern', onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-300">Select Template Design</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((tpl) => {
          const IconComponent = tpl.icon;
          const isSelected = selectedTemplate === tpl.id;

          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelect(tpl.id)}
              className={`flex flex-col items-start text-left p-4 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600/10 border-blue-500 shadow-md shadow-blue-500/5'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700/80'
              }`}
            >
              <div
                className={`p-2 rounded-lg mb-3 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <IconComponent size={18} />
              </div>
              <h4 className="text-xs font-bold text-slate-100 mb-1">{tpl.name}</h4>
              <p className="text-[10px] text-slate-500 leading-normal">{tpl.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
