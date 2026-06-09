import React, { memo } from 'react';

const ModernTemplate = memo(({ resumeData = {}, color = '#3b82f6' }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
  } = resumeData;

  const {
    name = '',
    email = '',
    phone = '',
    location = '',
    linkedin = '',
    github = '',
    website = '',
  } = personalInfo;

  return (
    <div className="bg-white text-slate-800 shadow-lg max-w-full font-sans min-h-[1100px] text-sm flex flex-col md:flex-row">
      {/* Left Sidebar (Accented background) */}
      <div className="w-full md:w-1/3 bg-slate-50 p-6 md:p-8 flex flex-col justify-between border-r border-slate-100">
        <div className="space-y-6">
          {/* Header/Info */}
          <div className="space-y-3">
            <h1 className="text-2xl font-extrabold tracking-tight leading-none" style={{ color: color }}>
              {name || 'Your Name'}
            </h1>
            <div className="space-y-2 text-xs text-slate-600 mt-4 break-all">
              {email && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📧</span>
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📞</span>
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">📍</span>
                  <span>{location}</span>
                </div>
              )}
              {linkedin && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">💼</span>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                    LinkedIn
                  </a>
                </div>
              )}
              {github && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">💻</span>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                    GitHub
                  </a>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">🌐</span>
                  <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-0.5">
                    <h3 className="font-semibold text-slate-800 text-xs">{edu.degree || 'Degree'}</h3>
                    <p className="text-[11px] text-slate-500 font-medium">{edu.field || 'Field'}</p>
                    <p className="text-[11px] text-slate-400">{edu.institution || 'Institution'}</p>
                    <p className="text-[10px] text-slate-400 italic">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Skills
              </h2>
              <div className="flex flex-col gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-700">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-[10px] text-slate-400">{skill.level}</span>
                    </div>
                    {/* Visual skill levels bar */}
                    <div className="w-full bg-slate-200 h-1 rounded overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          backgroundColor: color,
                          width:
                            skill.level === 'Expert' || skill.level === 'Advanced'
                              ? '100%'
                              : skill.level === 'Intermediate'
                              ? '70%'
                              : '40%',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6 md:p-8 space-y-6">
        {/* Summary */}
        {summary && (
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: color, borderColor: `${color}30` }}>
              Profile
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: color, borderColor: `${color}30` }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-1 relative pl-4 border-l-2" style={{ borderColor: `${color}40` }}>
                  <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1.5 border" style={{ backgroundColor: color, borderColor: '#ffffff' }}></div>
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-800 text-xs">{exp.position || 'Position'}</h3>
                      <p className="text-xs text-slate-500 font-medium">{exp.company || 'Company'}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-600 text-xs leading-relaxed text-justify whitespace-pre-line mt-1">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider border-b pb-1" style={{ color: color, borderColor: `${color}30` }}>
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((proj, index) => (
                <div key={index} className="space-y-1 relative pl-4 border-l-2" style={{ borderColor: `${color}40` }}>
                  <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1.5 border" style={{ backgroundColor: color, borderColor: '#ffffff' }}></div>
                  <div className="flex flex-wrap justify-between items-start">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-800 text-xs">{proj.name || 'Project Name'}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-600 hover:underline">
                          [Link]
                        </a>
                      )}
                    </div>
                    {proj.technologies && (
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                        {proj.technologies}
                      </span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-slate-600 text-xs leading-relaxed text-justify mt-1">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

export default ModernTemplate;
