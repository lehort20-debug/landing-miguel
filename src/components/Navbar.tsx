import React, { useState } from 'react';
import {
  Moon,
  Sun,
  Palette,
  Edit3,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface NavbarProps {
  data: PortfolioData;
  onOpenCvModal: () => void;
  onOpenQrModal: () => void;
  onOpenEditorModal: () => void;
  onOpenExportModal: () => void;
  onThemeColorChange: (color: ThemeColor) => void;
  onToggleDarkMode: () => void;
  activeColor: ThemeColor;
  darkMode: boolean;
  isEditMode?: boolean;
}

const navItems = [
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Especialidades', href: '#proyectos' },
  { label: 'Competencias', href: '#habilidades' },
  { label: 'Formación', href: '#educacion' },
  { label: 'Contacto', href: '#contacto' },
];

const colorOptions: { id: ThemeColor; label: string; bg: string }[] = [
  { id: 'indigo', label: 'Índigo', bg: 'bg-indigo-600' },
  { id: 'emerald', label: 'Esmeralda', bg: 'bg-emerald-600' },
  { id: 'violet', label: 'Violeta', bg: 'bg-violet-600' },
  { id: 'amber', label: 'Ámbar', bg: 'bg-amber-600' },
  { id: 'rose', label: 'Rosa', bg: 'bg-rose-600' },
  { id: 'slate', label: 'Minimal', bg: 'bg-slate-900' },
];

export const Navbar: React.FC<NavbarProps> = ({
  data,
  onOpenCvModal,
  onOpenQrModal,
  onOpenEditorModal,
  onOpenExportModal,
  onThemeColorChange,
  onToggleDarkMode,
  activeColor,
  darkMode,
  isEditMode = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);

  const theme = themeConfigs[activeColor];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Logo / Brand Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white tracking-tight group shrink-0"
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-lg tracking-wide shadow-sm transition-transform group-hover:scale-105 ${theme.accentBg}`}
          >
            MG
          </div>
          <div className="flex flex-col shrink-0">
            <span className="text-[15px] sm:text-[17px] font-bold leading-tight whitespace-nowrap">
              Miguel <span className={theme.accentText}>García Amador</span>
            </span>
          </div>
        </a>

        {/* Right Section: Enlaces pegados a la derecha junto al icono */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap transition-colors py-1 hover:text-slate-900 dark:hover:text-white ${theme.accentHover}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Admin & Content Editing Controls (Visible only when ?edit=1) */}
            {isEditMode && (
              <>
                {/* Quick Edit */}
                <button
                  id="btn-edit-landing"
                  onClick={onOpenEditorModal}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Editar contenido"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {/* Color Palette Menu */}
                <div className="relative">
                  <button
                    id="btn-toggle-color-menu"
                    onClick={() => setColorMenuOpen(!colorMenuOpen)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Cambiar color del tema"
                  >
                    <Palette className="w-4 h-4" />
                  </button>

                  {colorMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 py-1 tracking-wider">
                        Color de acento
                      </div>
                      <div className="space-y-1 mt-1">
                        {colorOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => {
                              onThemeColorChange(opt.id);
                              setColorMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                              activeColor === opt.id
                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-3.5 h-3.5 rounded-full ${opt.bg}`} />
                              <span>{opt.label}</span>
                            </div>
                            {activeColor === opt.id && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-200" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Dark Mode Toggle */}
            <button
              id="btn-toggle-dark-mode"
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile hamburger (solo en modo edición) */}
            {isEditMode && (
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: enlaces siempre visibles */}
      <nav className="md:hidden flex flex-wrap justify-center gap-x-4 gap-y-1.5 px-4 pb-2.5 text-[13px] font-medium text-slate-600 dark:text-slate-300">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${theme.accentHover}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {item.label}
            </a>
          ))}
          {isEditMode && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  onOpenEditorModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 px-3 py-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                Editar contenido
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
