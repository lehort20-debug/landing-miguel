import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { ProjectItem, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';
import { ui } from '../i18n';

interface ProjectsProps {
  projects: ProjectItem[];
  themeColor: ThemeColor;
  onOpenEditorModal: () => void;
}

const ORDERED_CATEGORIES = [
  'Todos',
  'Estrategia & Contenidos',
  'Analítica & CRM',
  'Marketing Estratégico',
  'Innovación & IA',
];

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  themeColor,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(ui.proj.all);
  const theme = themeConfigs[themeColor];

  // Derive categories dynamically from existing projects while keeping 'Todos' first
  const projectCats = Array.from(new Set(projects.map((p) => p.category))).filter(Boolean);
  const categories = [ui.proj.all, ...projectCats];

  const filteredProjects =
    activeCategory === ui.proj.all
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="proyectos" className="py-20 bg-slate-100/40 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <FolderGit2 className={`w-3.5 h-3.5 ${theme.accentText}`} />
              <span>{ui.proj.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {ui.proj.title}
            </h2>
            <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {ui.proj.subtitle}
            </p>
          </div>

          {/* Categories Pill Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? theme.accentBg
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-3xl p-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Category & Action Links */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${theme.badge}`}
                  >
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Ver Código Fuente"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Ver Proyecto en Vivo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Mi aportación Highlight */}
                {project.impact && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-5 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${theme.accentText}`} />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{ui.proj.impact} </span>
                        <span>{project.impact.replace(/^Mi aportación:\s*/i, '')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom: Tags */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                {project.tags.map((tag, tIdx) => {
                  const cleanTag = tag.startsWith('#') ? tag : `#${tag}`;
                  return (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {cleanTag}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
