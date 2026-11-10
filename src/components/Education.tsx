import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { EducationItem, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';
import { ui } from '../i18n';

interface EducationProps {
  education: EducationItem[];
  themeColor: ThemeColor;
}

export const Education: React.FC<EducationProps> = ({ education, themeColor }) => {
  const theme = themeConfigs[themeColor];

  return (
    <section id="educacion" className="py-20 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <GraduationCap className={`w-3.5 h-3.5 ${theme.accentText}`} />
            <span>{ui.edu.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {ui.edu.title}
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            {ui.edu.subtitle}
          </p>
        </div>

        {/* Education & Certs Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`p-2.5 rounded-xl ${theme.accentLight}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug">
                  {item.degree}
                </h3>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  {item.institution}
                </p>

                {item.details && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
