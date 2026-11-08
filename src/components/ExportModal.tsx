import React, { useState } from 'react';
import {
  X,
  Download,
  Code,
  Printer,
  Copy,
  CheckCircle2,
  FileJson,
  Sparkles,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  themeColor: ThemeColor;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
  themeColor,
}) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const theme = themeConfigs[themeColor];

  if (!isOpen) return null;

  // Download JSON
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '-')}-portfolio.json`;
    link.click();
    URL.revokeObjectURL(url);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Print PDF
  const handlePrint = () => {
    window.print();
  };

  // Generate Standalone HTML
  const generateStandaloneHtml = () => {
    const p = data.personal;
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.fullName} - ${p.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <div class="max-w-4xl mx-auto px-6 py-16 space-y-16">
    <!-- Header / Hero -->
    <header class="space-y-4">
      <div class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">${p.availabilityText}</div>
      <h1 class="text-5xl font-extrabold tracking-tight">${p.fullName}</h1>
      <p class="text-2xl text-slate-700 font-semibold">${p.title}</p>
      <p class="text-slate-600 text-lg">${p.tagline}</p>
      <div class="flex gap-4 text-sm text-slate-500 pt-2">
        <span>📍 ${p.location}</span>
        <span>✉️ ${p.email}</span>
      </div>
    </header>

    <!-- Experiencia -->
    <section class="space-y-6">
      <h2 class="text-3xl font-bold border-b pb-2">Experiencia</h2>
      <div class="space-y-8">
        ${data.experience
          .map(
            (exp) => `
        <div class="p-6 bg-white rounded-2xl border border-slate-200">
          <div class="flex justify-between items-center mb-1">
            <h3 class="text-xl font-bold">${exp.role} · <span class="text-slate-600">${exp.company}</span></h3>
            <span class="text-xs bg-slate-100 px-2 py-1 rounded">${exp.period}</span>
          </div>
          <p class="text-slate-600 text-sm mb-3">${exp.description}</p>
          ${
            exp.achievements && exp.achievements.length
              ? `<ul class="list-disc list-inside text-sm text-slate-700 space-y-1">${exp.achievements.map((a) => `<li>${a}</li>`).join('')}</ul>`
              : ''
          }
        </div>`
          )
          .join('')}
      </div>
    </section>

    <!-- Proyectos -->
    <section class="space-y-6">
      <h2 class="text-3xl font-bold border-b pb-2">Proyectos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${data.projects
          .map(
            (proj) => `
        <div class="p-6 bg-white rounded-2xl border border-slate-200">
          <span class="text-xs font-bold uppercase text-indigo-600">${proj.category}</span>
          <h3 class="text-xl font-bold mt-1 mb-2">${proj.title}</h3>
          <p class="text-sm text-slate-600 mb-3">${proj.description}</p>
          ${proj.impact ? `<p class="text-xs font-semibold text-emerald-700">⚡ ${proj.impact}</p>` : ''}
        </div>`
          )
          .join('')}
      </div>
    </section>
  </div>
</body>
</html>`;
  };

  const handleCopyHtml = () => {
    const html = generateStandaloneHtml();
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${theme.accentLight}`}>
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Exportar o Descargar Landing
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lleva tu landing page a cualquier hosting o guárdala en PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Options */}
        <div className="p-6 space-y-4">
          {/* Option 1: Standalone HTML */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Código HTML Autocontenido
                </h3>
                <p className="text-xs text-slate-500">
                  Archivo HTML listo para subir a GitHub Pages, Vercel o Netlify
                </p>
              </div>
            </div>
            <button
              onClick={handleCopyHtml}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                copiedHtml
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
              }`}
            >
              {copiedHtml ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Option 2: Download JSON Profile */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Datos de Perfil (JSON)
                </h3>
                <p className="text-xs text-slate-500">
                  Respaldo completo de todos tus textos, métricas y enlaces
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
            >
              {copiedJson ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>¡Descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar</span>
                </>
              )}
            </button>
          </div>

          {/* Option 3: Print / PDF */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Guardar como PDF / Imprimir
                </h3>
                <p className="text-xs text-slate-500">
                  Abre el diálogo del navegador para exportar directamente a PDF
                </p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
