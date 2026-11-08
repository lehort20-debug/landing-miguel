import React, { useState } from 'react';
import {
  X,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  Save,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { PortfolioData, ThemeColor, ExperienceItem, ProjectItem } from '../types';
import { themeConfigs } from '../lib/theme';

interface LiveEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  themeColor: ThemeColor;
}

type TabType = 'personal' | 'experience' | 'projects' | 'skills' | 'education';

export const LiveEditorModal: React.FC<LiveEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  themeColor,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const theme = themeConfigs[themeColor];

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  // Add new experience
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Nuevo Cargo',
      company: 'Nombre Empresa',
      location: 'Ubicación',
      period: '2024 - Presente',
      current: true,
      description: 'Descripción de las responsabilidades principales...',
      achievements: ['Logro cuantificable 1'],
      technologies: ['React', 'Node.js'],
    };
    setFormData({
      ...formData,
      experience: [newExp, ...formData.experience],
    });
  };

  // Remove experience
  const handleRemoveExperience = (id: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((e) => e.id !== id),
    });
  };

  // Add project
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'Nuevo Proyecto',
      description: 'Breve explicación de la solución...',
      impact: 'Impacto o resultado clave',
      category: 'Web',
      tags: ['TypeScript', 'Tailwind'],
      liveUrl: 'https://ejemplo.com',
      repoUrl: 'https://github.com',
      featured: true,
    };
    setFormData({
      ...formData,
      projects: [newProj, ...formData.projects],
    });
  };

  // Remove project
  const handleRemoveProject = (id: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((p) => p.id !== id),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Editor de Contenido de Landing
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personaliza manualmente cualquier sección o dato de tu página
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 gap-2 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto">
          {[
            { id: 'personal', label: 'Datos Personales', icon: User },
            { id: 'experience', label: 'Experiencia', icon: Briefcase },
            { id: 'projects', label: 'Proyectos', icon: FolderGit2 },
            { id: 'skills', label: 'Habilidades', icon: Cpu },
            { id: 'education', label: 'Educación', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: Personal Details */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.personal.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personal: { ...formData.personal, fullName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título Profesional / Especialidad
                  </label>
                  <input
                    type="text"
                    value={formData.personal.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personal: { ...formData.personal, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tagline / Frase de Impacto
                </label>
                <input
                  type="text"
                  value={formData.personal.tagline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, tagline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={formData.personal.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personal: { ...formData.personal, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={formData.personal.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personal: { ...formData.personal, location: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Biografía / Resumen
                </label>
                <textarea
                  rows={4}
                  value={formData.personal.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, bio: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  URL de Foto / Avatar
                </label>
                <input
                  type="text"
                  value={formData.personal.avatarUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personal: { ...formData.personal, avatarUrl: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Puestos ({formData.experience.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Experiencia</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.experience.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.role}
                          placeholder="Cargo"
                          onChange={(e) => {
                            const updated = [...formData.experience];
                            updated[idx].role = e.target.value;
                            setFormData({ ...formData, experience: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          placeholder="Empresa"
                          onChange={(e) => {
                            const updated = [...formData.experience];
                            updated[idx].company = e.target.value;
                            setFormData({ ...formData, experience: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg"
                        title="Eliminar puesto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.period}
                        placeholder="Periodo (ej: 2021 - Presente)"
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx].period = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                      <input
                        type="text"
                        value={exp.location || ''}
                        placeholder="Ubicación (ej: Madrid / Remoto)"
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[idx].location = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={exp.description}
                      placeholder="Descripción de tareas y funciones..."
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, experience: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Proyectos ({formData.projects.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Proyecto</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={proj.title}
                        placeholder="Título del Proyecto"
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={proj.category}
                        placeholder="Categoría"
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[idx].category = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-36 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={proj.description}
                      placeholder="Descripción del proyecto..."
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].description = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />

                    <input
                      type="text"
                      value={proj.impact || ''}
                      placeholder="Impacto cuantificable (ej: Ahorro del 30% en costes)"
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].impact = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Categorías de habilidades y niveles de dominio:
              </p>
              {formData.skillCategories.map((cat, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                >
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => {
                      const updated = [...formData.skillCategories];
                      updated[cIdx].category = e.target.value;
                      setFormData({ ...formData, skillCategories: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold mb-2"
                  />
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...formData.skillCategories];
                            updated[cIdx].skills[sIdx].name = e.target.value;
                            setFormData({ ...formData, skillCategories: updated });
                          }}
                          className="w-28 bg-transparent text-xs focus:outline-hidden"
                        />
                        <button
                          onClick={() => {
                            const updated = [...formData.skillCategories];
                            updated[cIdx].skills.splice(sIdx, 1);
                            setFormData({ ...formData, skillCategories: updated });
                          }}
                          className="text-slate-400 hover:text-rose-500"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...formData.skillCategories];
                        updated[cIdx].skills.push({ name: 'Nueva Habilidad', level: 85 });
                        setFormData({ ...formData, skillCategories: updated });
                      }}
                      className="px-2.5 py-1 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 hover:border-indigo-500 hover:text-indigo-600"
                    >
                      + Habilidad
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              {formData.education.map((edu, eIdx) => (
                <div
                  key={edu.id || eIdx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 space-y-2"
                >
                  <input
                    type="text"
                    value={edu.degree}
                    placeholder="Grado o Certificación"
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[eIdx].degree = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={edu.institution}
                      placeholder="Institución o Emisor"
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[eIdx].institution = e.target.value;
                        setFormData({ ...formData, education: updated });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                    <input
                      type="text"
                      value={edu.period}
                      placeholder="Periodo"
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[eIdx].period = e.target.value;
                        setFormData({ ...formData, education: updated });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          >
            Cerrar sin guardar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-2 ${theme.accentBg}`}
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Cambios Guardados!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
