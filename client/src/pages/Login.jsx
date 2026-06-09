import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setLoading } from '../features/authSlice';
import api from '../configs/api';
import toast from 'react-hot-toast';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const tempErrors = {};
    if (!formData.email) {
      tempErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = 'Please provide a valid email format';
      }
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters long';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(setLoading(true));
    const toastId = toast.loading('Signing in...');

    try {
      const response = await api.post('/user/login', formData);
      const { token, user } = response.data;

      dispatch(setCredentials({ token, user }));
      toast.success(`Welcome back, ${user.name}!`, { id: toastId });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please verify credentials.', { id: toastId });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-6">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-slate-900 bg-slate-900/10 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex bg-blue-600/10 text-blue-400 p-2.5 rounded-xl mb-2">
            <Sparkles size={20} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-100">Sign In</h2>
          <p className="text-slate-500 text-xs">Enter your details to manage your CVs</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full bg-slate-900/60 border ${
                  errors.email ? 'border-red-500/70' : 'border-slate-800 focus:border-blue-500'
                } rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-0 transition-colors`}
              />
              <Mail size={14} className="absolute left-3.5 top-3.5 text-slate-600" />
            </div>
            {errors.email && <p className="text-[10.5px] text-red-500 font-medium">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full bg-slate-900/60 border ${
                  errors.password ? 'border-red-500/70' : 'border-slate-800 focus:border-blue-500'
                } rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-0 transition-colors`}
              />
              <Lock size={14} className="absolute left-3.5 top-3.5 text-slate-600" />
            </div>
            {errors.password && <p className="text-[10.5px] text-red-500 font-medium">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/15"
          >
            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={14} />
          </button>
        </form>

        {/* Redirect */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-900/60">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline font-semibold">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
