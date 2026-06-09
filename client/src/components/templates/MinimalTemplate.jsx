import React, { memo } from 'react';

const MinimalTemplate = memo(({ resumeData = {}, color = '#3b82f6' }) => {
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
    <div className="bg-white text-slate-800 p-8 shadow-lg max-w-full font-sans min-h-[1100px] text-xs space-y-6">
      {/* Name and Basic Contact */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-4">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-slate-900 leading-none">
            {name || 'Your Name'}
          </h1>
        </div>
        <div className="flex flex-wrap md:flex-col items-start md:items-end gap-x-3 gap-y-0.5 text-[10px] text-slate-500 mt-2 md:mt-0 font-light">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
          <div className="flex gap-2 mt-1">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-700">
                LinkedIn
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-700">
                GitHub
              </a>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline text-slate-700">
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="grid grid-cols-4 gap-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            About
          </div>
          <div className="col-span-3 text-slate-600 leading-relaxed text-justify">
            {summary}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Experience
          </div>
          <div className="col-span-3 space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-800 text-xs">{exp.company || 'Company'}</span>
                    <span className="text-slate-400 mx-1.5">•</span>
                    <span className="text-slate-600 text-xs italic">{exp.position || 'Position'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-600 leading-relaxed text-justify pl-3 border-l border-slate-100">
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
        <div className="grid grid-cols-4 gap-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Projects
          </div>
          <div className="col-span-3 space-y-4">
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
                  <p className="text-slate-600 leading-relaxed text-justify pl-3 border-l border-slate-100">
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
        <div className="grid grid-cols-4 gap-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Education
          </div>
          <div className="col-span-3 space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-800 text-xs">{edu.institution || 'Institution'}</span>
                  <span className="text-slate-400 mx-1.5">•</span>
                  <span className="text-slate-600 text-xs">
                    {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Skills
          </div>
          <div className="col-span-3">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                  <span className="text-slate-700 text-xs font-medium">
                    {skill.name} <span className="text-[9px] text-slate-400">({skill.level})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

MinimalTemplate.displayName = 'MinimalTemplate';

export default MinimalTemplate;
