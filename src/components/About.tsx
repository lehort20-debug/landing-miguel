import React from 'react';
import { CheckCircle, Globe2, Award, Sparkles, Download } from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface AboutProps {
  data: PortfolioData;
  themeColor: ThemeColor;
  onOpenCvModal: () => void;
  onOpenExportModal: () => void;
}

export const About: React.FC<AboutProps> = ({
  data,
  themeColor,
  onOpenCvModal,
  onOpenExportModal,
}) => {
  const theme = themeConfigs[themeColor];
  const { about, personal } = data;

  return (
    <section id="sobre-mi" className="py-20 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sobre mí y forma de trabajar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experiencia de gran empresa, al servicio de la pyme
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story / Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Por qué trabajar conmigo
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base whitespace-pre-line">
                {about.story || personal.bio}
              </p>

              {/* Key Bullet Points */}
              {about.keyPoints && about.keyPoints.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Qué Puedo Aportar
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {about.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${theme.accentText}`} />
                        <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Languages & Summary Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Languages card */}
            {about.languages && about.languages.length > 0 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Globe2 className={`w-5 h-5 ${theme.accentText}`} />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Idiomas</h3>
                </div>
                <div className="space-y-3">
                  {about.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      <span>{lang}</span>
                      <Award className="w-4 h-4 text-amber-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
