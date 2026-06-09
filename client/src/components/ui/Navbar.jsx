import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../../features/authSlice';
import { Sparkles, LogOut, User, Folder } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <nav className="glass-panel sticky top-0 z-40 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
            <Sparkles size={18} />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Resume Builder
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-slate-300 hover:text-slate-100 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-slate-900 transition-colors"
              >
                <Folder size={14} /> My Resumes
              </Link>
              
              <div className="h-4 w-[1px] bg-slate-800" />
              
              <div className="flex items-center gap-2">
                <div className="bg-slate-800 p-1.5 rounded-full text-slate-400">
                  <User size={13} />
                </div>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {user?.name || 'User'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 text-xs font-semibold px-3 py-2 rounded-lg border border-red-500/20 transition-all duration-200"
              >
                <LogOut size={13} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-slate-300 hover:text-slate-100 text-xs font-semibold px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/10"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
