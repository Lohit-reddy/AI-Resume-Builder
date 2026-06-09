import React from 'react';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import MinimalImageTemplate from '../templates/MinimalImageTemplate';

export default function ResumePreview({ resumeData = {}, template = 'modern', color = '#3b82f6' }) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate resumeData={resumeData} color={color} />;
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} color={color} />;
      case 'minimal':
        return <MinimalTemplate resumeData={resumeData} color={color} />;
      case 'minimalImage':
        return <MinimalImageTemplate resumeData={resumeData} color={color} />;
      default:
        return <ModernTemplate resumeData={resumeData} color={color} />;
    }
  };

  return (
    <div className="w-full overflow-auto custom-scrollbar rounded-xl border border-slate-800 bg-slate-900/10">
      {/* Container simulating A4 width constraint visually */}
      <div className="min-w-[700px] w-full max-w-4xl mx-auto shadow-2xl">
        {renderTemplate()}
      </div>
    </div>
  );
}
