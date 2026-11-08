import React from 'react';
import { Cpu, Check } from 'lucide-react';
import { SkillCategory, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface SkillsProps {
  categories: SkillCategory[];
  themeColor: ThemeColor;
}

export const Skills: React.FC<SkillsProps> = ({ categories, themeColor }) => {
  const theme = themeConfigs[themeColor];

  return (
    <section id="habilidades" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Cpu className={`w-3.5 h-3.5 ${theme.accentText}`} />
            <span>Competencias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Competencias de dirección
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-xl">
            Lo que aporto en cada proyecto, construido dirigiendo empresas y proyectos en 26 países.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${theme.dotColor}`} />
                {cat.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                  >
                    <Check className={`w-3.5 h-3.5 ${theme.accentText}`} />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
