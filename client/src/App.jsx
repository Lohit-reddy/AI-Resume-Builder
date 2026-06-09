import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Layout (not lazy — it's the shell)
import Layout from './pages/Layout';

// Lightweight route guard (not lazy)
import PrivateRoute from './components/ui/PrivateRoute';

// Inline loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs text-slate-500 font-medium">Loading...</span>
    </div>
  </div>
);

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const Preview = lazy(() => import('./pages/Preview'));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="preview/:id" element={<Preview />} />

              {/* Protected routes */}
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="resume-builder/:id"
                element={
                  <PrivateRoute>
                    <ResumeBuilder />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      
      {/* Global Toast notifications config */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-slate-900 text-slate-100 border border-slate-800 text-xs font-medium py-2.5 px-4 rounded-xl',
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#0f172a',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0f172a',
            },
          },
        }}
      />
    </Provider>
  );
}
