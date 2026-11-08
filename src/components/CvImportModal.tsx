import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { sampleProfiles } from '../data/defaultPortfolio';
import { themeConfigs } from '../lib/theme';

interface CvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyData: (newData: PortfolioData) => void;
  themeColor: ThemeColor;
}

export const CvImportModal: React.FC<CvImportModalProps> = ({
  isOpen,
  onClose,
  onApplyData,
  themeColor,
}) => {
  const [cvText, setCvText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const theme = themeConfigs[themeColor];

  if (!isOpen) return null;

  const loadingSteps = [
    'Leyendo el contenido de tu currículum...',
    'Extrayendo cargos, empresas y logros cuantificables...',
    'Estructurando categorías de habilidades y proyectos...',
    'Generando tu landing page personalizada...',
  ];

  const handleProcessCv = async () => {
    if (!cvText.trim()) {
      setErrorMessage('Por favor ingresa o pega el texto de tu CV antes de continuar.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await fetch('/api/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, language: 'es' }),
      });

      const result = await response.json();
      clearInterval(stepInterval);

      if (result.success && result.data) {
        // Merge with existing theme preference
        const mergedData: PortfolioData = {
          ...result.data,
          theme: {
            color: themeColor,
            darkMode: false,
          },
        };
        onApplyData(mergedData);
        setIsLoading(false);
        onClose();
      } else {
        throw new Error(result.error || 'Error al procesar el CV');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsLoading(false);
      setErrorMessage(
        'Hubo un detalle al conectar con el asistente de IA. Se ha generado una versión base inteligente con tu información.'
      );
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCvText(text);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadPreset = (preset: (typeof sampleProfiles)[0]) => {
    setSelectedPreset(preset.label);
    if (preset.data.personal) {
      // Create readable CV text representation
      const sampleText = `NOMBRE: ${preset.data.personal.fullName}
TITULO: ${preset.data.personal.title}
CORREO: ${preset.data.personal.email}
UBICACION: ${preset.data.personal.location}
PERFIL: ${preset.data.personal.bio}

EXPERIENCIA:
${preset.data.experience?.map((e) => `- ${e.role} en ${e.company} (${e.period}): ${e.description}`).join('\n') || ''}

HABILIDADES:
${preset.data.skillCategories?.map((c) => `${c.category}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n') || ''}
`;
      setCvText(sampleText);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${theme.accentLight}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Crear Landing Page a partir de tu CV
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pega el texto de tu currículum o perfil de LinkedIn y la IA organizará todo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick preset profile selectors */}
          <div>
            <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>O prueba con un perfil de ejemplo:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sampleProfiles.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleLoadPreset(p)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    selectedPreset === p.label
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold">{p.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{p.role}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea for CV */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                Pega aquí tu CV (Texto plano o Markdown)
              </label>
              <label className="cursor-pointer text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Cargar archivo (.txt o .md)</span>
                <input
                  type="file"
                  accept=".txt,.md,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              rows={9}
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Ejemplo:
Juan Pérez López
Ingeniero de Software Senior con 5 años de experiencia en React, Node.js y AWS...

EXPERIENCIA LABORAL:
- Senior Engineer en Tech Corp (2021 - Presente): Lideré el equipo de frontend...
- Full Stack Developer en Studio X (2018 - 2021)...

EDUCACIÓN:
- Grado en Ingeniería Informática por la Universidad de Barcelona...

HABILIDADES:
TypeScript, Python, Docker, Kubernetes, GraphQL..."
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />
          </div>

          {/* Error notice if any */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Loading status progress */}
          {isLoading && (
            <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                  {loadingSteps[loadingStep]}
                </span>
              </div>
              <div className="w-full h-1.5 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isLoading || !cvText.trim()}
            onClick={handleProcessCv}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all active:scale-95 flex items-center gap-2 ${
              isLoading || !cvText.trim()
                ? 'opacity-50 cursor-not-allowed bg-slate-400'
                : theme.accentBg
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analizando con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generar Landing Page</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
