import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';
import { ui } from '../i18n';

interface ExperienceProps {
  data: PortfolioData;
  themeColor: ThemeColor;
}

export const Experience: React.FC<ExperienceProps> = ({ data, themeColor }) => {
  const theme = themeConfigs[themeColor];
  const { experience } = data;

  return (
    <section id="experiencia" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Briefcase className={`w-3.5 h-3.5 ${theme.accentText}`} />
            <span>{ui.exp.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {ui.exp.title}
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {ui.exp.subtitle}
          </p>
        </div>

        {/* Timeline list */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 sm:ml-6 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.id || idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Indicator Node */}
              <div
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 transition-transform group-hover:scale-125 ${
                  item.current ? theme.dotColor : 'bg-slate-400 dark:bg-slate-600'
                }`}
              />

              {/* Content Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
                {/* Header row: Role, Company, Period */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {item.company}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-normal">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.current && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {ui.exp.current}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-3 py-1 rounded-lg">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* Role description */}
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Quantified Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2 mb-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {ui.exp.achievements}
                    </h4>
                    <ul className="space-y-1.5">
                      {item.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2
                            className={`w-4 h-4 mt-0.5 shrink-0 ${theme.accentText}`}
                          />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies used */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1">
                      {ui.exp.areas}
                    </span>
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
