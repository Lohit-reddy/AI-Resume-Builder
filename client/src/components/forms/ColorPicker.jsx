import React from 'react';

const presetColors = [
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Indigo', hex: '#6366f1' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Cyan', hex: '#06b6d4' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Slate', hex: '#64748b' },
];

export default function ColorPicker({ selectedColor = '#3b82f6', onChange }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-300">Choose Accent Color</h3>
      
      <div className="flex flex-wrap gap-2.5">
        {presetColors.map((color) => (
          <button
            key={color.hex}
            type="button"
            onClick={() => onChange(color.hex)}
            className={`w-7 h-7 rounded-full transition-all duration-200 border-2 ${
              selectedColor.toLowerCase() === color.hex.toLowerCase()
                ? 'border-white scale-110 shadow-md shadow-slate-900'
                : 'border-transparent hover:scale-105'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}

        {/* Custom hex selector */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2 py-0.5">
          <span className="text-slate-600 text-xs font-semibold">#</span>
          <input
            type="text"
            value={selectedColor.replace('#', '')}
            onChange={(e) => onChange(`#${e.target.value}`)}
            className="w-16 bg-transparent text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none uppercase font-mono"
            placeholder="3B82F6"
            maxLength={6}
          />
          <input
            type="color"
            value={selectedColor.startsWith('#') && selectedColor.length === 7 ? selectedColor : '#3b82f6'}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 rounded-full border-0 cursor-pointer overflow-hidden p-0 bg-transparent shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
