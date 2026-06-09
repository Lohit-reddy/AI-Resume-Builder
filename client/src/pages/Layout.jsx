import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/60 bg-slate-950/60 relative z-10 py-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
