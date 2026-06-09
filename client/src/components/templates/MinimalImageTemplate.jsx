import React, { memo } from 'react';

const MinimalImageTemplate = memo(({ resumeData = {}, color = '#3b82f6' }) => {
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
    profileImage = '',
  } = personalInfo;

  return (
    <div className="bg-white text-slate-800 p-8 shadow-lg max-w-full font-sans min-h-[1100px] text-xs space-y-6">
      {/* Header with Profile Image */}
      <div className="flex flex-col sm:flex-row gap-5 items-center pb-4 border-b border-slate-100">
        {profileImage ? (
          <img
            src={profileImage}
            alt={name || 'Profile'}
            className="w-20 h-20 rounded-full object-cover border-2 shadow-sm shrink-0"
            style={{ borderColor: color }}
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 font-bold uppercase text-2xl border-2 shrink-0 shadow-sm"
            style={{ borderColor: `${color}20` }}
          >
            {(name || 'U')[0]}
          </div>
        )}

        <div className="text-center sm:text-left flex-1 space-y-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
            {name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-1 text-[10px] text-slate-500 font-light">
            {email && <span>📧 {email}</span>}
            {phone && <span>📞 {phone}</span>}
            {location && <span>📍 {location}</span>}
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-[10px] mt-1">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                LinkedIn
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                GitHub
              </a>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="space-y-1.5">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            About Me
          </h2>
          <p className="text-slate-600 leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-800 text-xs">{exp.position || 'Position'}</span>
                    <span className="text-slate-400 mx-1.5">|</span>
                    <span className="text-slate-600 text-xs font-semibold">{exp.company || 'Company'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
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
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Key Projects
          </h2>
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800 text-xs">{proj.name || 'Project Name'}</span>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline">
                        [Link]
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <span className="text-[9px] text-slate-400 font-mono">
                      {proj.technologies}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-slate-600 leading-relaxed text-justify">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {education.map((edu, index) => (
              <div key={index} className="space-y-0.5">
                <h3 className="font-bold text-slate-800 text-xs">{edu.degree || 'Degree'}</h3>
                {edu.field && <p className="text-[10px] text-slate-500 font-medium">{edu.field}</p>}
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{edu.institution || 'Institution'}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Skills Inventory
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-[10px] font-sans text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-100"
              >
                {skill.name} <span className="text-[8px] text-slate-400">({skill.level})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

MinimalImageTemplate.displayName = 'MinimalImageTemplate';

export default MinimalImageTemplate;
