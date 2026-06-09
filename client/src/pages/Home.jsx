import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  FileText,
  Cpu,
  ImageOff,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Download,
  Layers,
  Star,
  TrendingUp,
} from 'lucide-react';
import { useSelector } from 'react-redux';

const stats = [
  { label: 'Templates', value: '4+', icon: Layers },
  { label: 'AI Features', value: '3', icon: Sparkles },
  { label: 'PDF Export', value: 'Free', icon: Download },
  { label: 'ATS Score', value: '95%+', icon: TrendingUp },
];

const features = [
  {
    icon: Cpu,
    title: 'Gemini AI Optimization',
    description: 'Rewrite job bullet points with strong action verbs and estimated impact metrics. Optimize headers for ATS keyword density automatically.',
    color: 'blue',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: FileText,
    title: 'PDF Structure Parsing',
    description: 'Upload your old text-based PDF resume and let our backend parser convert extracted content into a structured JSON schema in seconds.',
    color: 'indigo',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
  {
    icon: ImageOff,
    title: 'AI Background Eraser',
    description: 'Upload your profile photo and instantly remove distracting background elements using integrated ImageKit transform functions.',
    color: 'purple',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: Download,
    title: 'Instant PDF Downloads',
    description: 'Render multiple elegant designs (Classic, Modern, Minimal) and download fully responsive, high-fidelity PDFs client-side in one click.',
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
];

const benefits = [
  { icon: CheckCircle2, text: 'ATS-compatible templates optimized for recruiter parsing' },
  { icon: Zap, text: 'AI writing assistance powered by Google Gemini' },
  { icon: Shield, text: 'Enterprise-grade security with JWT & bcrypt' },
  { icon: Star, text: 'No subscription required — completely free to use' },
];

export default function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="space-y-28 py-12 gradient-mesh">
      {/* ======== HERO SECTION ======== */}
      <section className="relative text-center max-w-4xl mx-auto space-y-8 overflow-visible">
        {/* Background decorative orbs */}
        <div className="absolute -top-20 -left-32 w-72 h-72 bg-blue-600/10 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute -bottom-16 -right-28 w-64 h-64 bg-purple-600/10 rounded-full animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Badge */}
        <div className="animate-slide-up">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/15 to-indigo-600/15 border border-blue-500/25 text-blue-400 text-xs font-semibold px-5 py-2 rounded-full tracking-wide shimmer">
            <Sparkles size={13} /> Powered by Google Gemini AI & ImageKit
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] animate-slide-up-delay-1">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Build a Job-Winning
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Resume with{' '}
          </span>
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
            AI Technology
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed animate-slide-up-delay-2">
          Create, edit, and optimize your professional CV with Google Gemini.
          Restructure older PDFs, clean up profile backgrounds with ImageKit,
          and export stunning ATS-ready PDFs — all for free.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 animate-slide-up-delay-3">
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            id="cta-get-started"
            className="group flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30"
          >
            Get Started For Free
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/login"
            id="cta-sign-in"
            className="group flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 text-sm font-semibold px-8 py-4 rounded-xl transition-all duration-300"
          >
            Sign In
            <ArrowRight size={14} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
          </Link>
        </div>

        {/* Stat counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 animate-slide-up-delay-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-panel stat-glow py-4 px-5 rounded-2xl border border-slate-800/60 flex flex-col items-center gap-1.5 hover:border-slate-700 transition-colors">
                <Icon size={16} className="text-blue-400" />
                <span className="text-xl font-extrabold text-slate-100 tracking-tight">{stat.value}</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======== FEATURE GRID ======== */}
      <section className="space-y-10">
        <div className="text-center max-w-lg mx-auto space-y-3 animate-fade-in">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/80">Core Features</span>
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
            Powerful AI Capabilities
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Everything you need to craft an outstanding professional portfolio, powered by cutting-edge AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card-hover glass-panel p-7 rounded-2xl border border-slate-800/60 bg-slate-900/20 group relative overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                <div className="relative z-10">
                  <div className={`${feature.iconBg} ${feature.iconColor} p-3.5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mt-5 mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======== HOW IT WORKS ======== */}
      <section className="space-y-10">
        <div className="text-center max-w-lg mx-auto space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/80">Workflow</span>
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
            Three Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: '01', title: 'Create or Import', desc: 'Start from scratch or upload an existing PDF resume. Our AI parser extracts and structures your data automatically.' },
            { step: '02', title: 'AI Optimize', desc: 'Let Gemini AI rewrite your content with powerful action verbs, quantified metrics, and ATS-optimized keywords.' },
            { step: '03', title: 'Export & Share', desc: 'Pick a stunning template, customize colors, and download a polished PDF or share a live preview link.' },
          ].map((item, i) => (
            <div key={item.step} className="text-center space-y-4 group">
              <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center group-hover:border-blue-500/40 transition-colors duration-300">
                <span className="text-xl font-extrabold gradient-text">{item.step}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-200">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[260px] mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======== CTA SECTION ======== */}
      <section className="relative overflow-hidden">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-slate-800/60 bg-slate-900/20 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Decorative accent */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-5 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-snug tracking-tight">
              Ready to build your next career move?
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stop struggling with template spacing, poor alignments, and generic bullet points.
              Focus on your content while AI handles the optimization and styling.
            </p>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              id="cta-bottom-get-started"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-blue-500/15"
            >
              Create Your Resume Now <ArrowRight size={15} />
            </Link>
          </div>

          <div className="space-y-4 shrink-0 w-full lg:w-auto">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.text} className="flex items-start gap-3 text-slate-300">
                  <Icon size={17} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
