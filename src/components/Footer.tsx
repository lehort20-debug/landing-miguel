import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface FooterProps {
  data: PortfolioData;
  themeColor: ThemeColor;
}

export const Footer: React.FC<FooterProps> = ({ data, themeColor }) => {
  const theme = themeConfigs[themeColor];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-xs ${theme.accentBg}`}
            >
              {data.personal.fullName.slice(0, 1) || 'CV'}
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {data.personal.fullName}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {data.personal.title}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span>Diseñado con pasión profesional &bull; &copy; {new Date().getFullYear()}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
