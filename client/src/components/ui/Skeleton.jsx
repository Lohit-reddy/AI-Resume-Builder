import React from 'react';

export default function Skeleton({ type = 'card', count = 1 }) {
  const renderSkeleton = (key) => {
    if (type === 'card') {
      return (
        <div key={key} className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-900/40 space-y-4 animate-pulse">
          <div className="h-40 bg-slate-800/80 rounded-xl w-full"></div>
          <div className="space-y-3">
            <div className="h-5 bg-slate-800/80 rounded w-2/3"></div>
            <div className="h-4 bg-slate-800/80 rounded w-1/2"></div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-8 bg-slate-800/80 rounded w-20"></div>
            <div className="h-8 bg-slate-800/80 rounded w-20"></div>
          </div>
        </div>
      );
    }

    if (type === 'form') {
      return (
        <div key={key} className="space-y-6 animate-pulse">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-slate-800/80 rounded w-1/4"></div>
              <div className="h-10 bg-slate-800/80 rounded w-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-800/80 rounded w-1/4"></div>
              <div className="h-10 bg-slate-800/80 rounded w-full"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-800/80 rounded w-12"></div>
            <div className="h-24 bg-slate-800/80 rounded w-full"></div>
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="h-4 bg-slate-800/80 rounded animate-pulse w-full"></div>
    );
  };

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => renderSkeleton(idx))}
    </>
  );
}
