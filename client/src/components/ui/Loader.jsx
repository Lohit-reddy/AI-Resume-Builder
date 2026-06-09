import React from 'react';

export default function Loader({ size = 'md', fullScreen = false }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className={`rounded-full border-t-blue-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin ${sizeClasses[size]}`}></div>
        {/* Inner static ring */}
        <div className={`absolute top-0 left-0 rounded-full border-slate-800 opacity-20 ${sizeClasses[size]}`}></div>
      </div>
      <p className="text-slate-400 text-sm font-medium tracking-wide animate-pulse">Loading...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
        {loaderContent}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-6">{loaderContent}</div>;
}
