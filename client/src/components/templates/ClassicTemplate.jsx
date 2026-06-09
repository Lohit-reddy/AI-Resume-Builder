import React, { memo } from 'react';

const ClassicTemplate = memo(({ resumeData = {}, color = '#3b82f6' }) => {
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
    <div className="bg-white text-slate-800 p-8 shadow-lg max-w-full font-serif min-h-[1100px] text-sm">
      {/* Header */}
      <div className="text-center border-b-2 pb-5 space-y-2" style={{ borderColor: color }}>
        <h1 className="text-3xl font-bold tracking-tight uppercase" style={{ color: color }}>
          {name || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 font-sans">
          {email && <span>📧 {email}</span>}
          {phone && <span>📞 {phone}</span>}
          {location && <span>📍 {location}</span>}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              💼 LinkedIn
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline">
              💻 GitHub
            </a>
          )}
          {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
              🌐 Website
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="my-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: color }}>
            Professional Summary
          </h2>
          <div className="w-full h-0.5 mb-2 bg-slate-200"></div>
          <p className="text-justify leading-relaxed text-slate-700 font-sans text-[13px]">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="my-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: color }}>
            Professional Experience
          </h2>
          <div className="w-full h-0.5 mb-3 bg-slate-200"></div>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start font-sans">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{exp.position || 'Position'}</h3>
                    <span className="text-xs text-slate-500 italic">{exp.company || 'Company'}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    {exp.startDate || 'Start Date'} – {exp.current ? 'Present' : exp.endDate || 'End Date'}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-slate-700 text-xs font-sans whitespace-pre-line pl-2 border-l-2 border-slate-200 leading-relaxed text-justify">
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
        <div className="my-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: color }}>
            Projects
          </h2>
          <div className="w-full h-0.5 mb-3 bg-slate-200"></div>
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-start font-sans">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">{proj.name || 'Project Name'}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                        [Link]
                      </a>
                    )}
                  </div>
                  {proj.technologies && (
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                      {proj.technologies}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-slate-700 text-xs font-sans pl-2 border-l-2 border-slate-200 leading-relaxed text-justify">
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
        <div className="my-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: color }}>
            Education
          </h2>
          <div className="w-full h-0.5 mb-3 bg-slate-200"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, index) => (
              <div key={index} className="space-y-0.5 font-sans">
                <h3 className="font-bold text-slate-800 text-sm">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{edu.institution || 'Institution'}</span>
                  <span>
                    {edu.startDate || 'Start'} – {edu.endDate || 'End'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="my-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2" style={{ color: color }}>
            Skills
          </h2>
          <div className="w-full h-0.5 mb-3 bg-slate-200"></div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-sans text-slate-700 bg-slate-100 border px-2.5 py-1 rounded"
                style={{ borderColor: `${color}20` }}
              >
                <strong className="text-slate-800">{skill.name}</strong>
                {skill.level && <span className="text-[10px] text-slate-500 ml-1">({skill.level})</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ClassicTemplate.displayName = 'ClassicTemplate';

export default ClassicTemplate;
