import React, { useState, useEffect } from 'react';
import { defaultPortfolio as esPortfolio } from './data/defaultPortfolio';
import { portfolioEn, portfolioFr } from './data/portfolioI18n';
import { lang } from './i18n';

const defaultPortfolio = lang === 'en' ? portfolioEn : lang === 'fr' ? portfolioFr : esPortfolio;
import { PortfolioData, ThemeColor } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CvImportModal } from './components/CvImportModal';
import { LiveEditorModal } from './components/LiveEditorModal';
import { ExportModal } from './components/ExportModal';
import { QRCodeModal } from './components/QRCodeModal';
import { Sparkles, X } from 'lucide-react';

const STORAGE_KEY = `landing_miguel_garcia_v9_${lang}`;

export default function App() {
  // Load saved state or default
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.personal?.fullName?.toLowerCase().includes('miguel')) {
          const prevAvatar = parsed?.personal?.avatarUrl;
          const cleanAvatar =
            prevAvatar &&
            prevAvatar !== '/leymis-profile.jpg' &&
            prevAvatar !== '/leymis-real-headshot.jpg' &&
            prevAvatar !== '/Foto.png'
              ? prevAvatar
              : '/foto-miguel.jpg';
          return {
            ...defaultPortfolio,
            personal: {
              ...defaultPortfolio.personal,
              avatarUrl: cleanAvatar,
            },
          };
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return defaultPortfolio;
  });

  const [activeColor, setActiveColor] = useState<ThemeColor>(
    data.theme?.color || 'indigo'
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    data.theme?.darkMode || false
  );

  // Edit Mode: only active if the URL carries ?edit=1 (or edit=true)
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const editParam = params.get('edit');
    return editParam === '1' || editParam === 'true';
  });

  useEffect(() => {
    const checkEditMode = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const editParam = params.get('edit');
      setIsEditMode(editParam === '1' || editParam === 'true');
    };

    window.addEventListener('popstate', checkEditMode);
    window.addEventListener('hashchange', checkEditMode);
    return () => {
      window.removeEventListener('popstate', checkEditMode);
      window.removeEventListener('hashchange', checkEditMode);
    };
  }, []);

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Sync darkMode with HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist changes to localStorage
  const handleUpdateData = (newData: PortfolioData) => {
    setData(newData);
    if (newData.theme?.color) {
      setActiveColor(newData.theme.color);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleThemeColorChange = (color: ThemeColor) => {
    setActiveColor(color);
    const updated = {
      ...data,
      theme: {
        ...data.theme,
        color,
      },
    };
    handleUpdateData(updated);
  };

  const handleToggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    const updated = {
      ...data,
      theme: {
        ...data.theme,
        darkMode: nextDark,
      },
    };
    handleUpdateData(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        data={data}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenEditorModal={() => {
          if (isEditMode) setIsEditorModalOpen(true);
        }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onThemeColorChange={handleThemeColorChange}
        onToggleDarkMode={handleToggleDarkMode}
        activeColor={activeColor}
        darkMode={darkMode}
        isEditMode={isEditMode}
      />

      {/* Main Landing Page Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          data={data}
          themeColor={activeColor}
          isEditMode={isEditMode}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenQrModal={() => setIsQrModalOpen(true)}
          onUpdateAvatar={(newUrl: string) => {
            handleUpdateData({
              ...data,
              personal: {
                ...data.personal,
                avatarUrl: newUrl,
              },
            });
          }}
        />

        {/* 2. About Me Section */}
        <About
          data={data}
          themeColor={activeColor}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        {/* 3. Professional Experience & Achievements */}
        <Experience data={data} themeColor={activeColor} />

        {/* 4. Featured Projects Showcase */}
        <Projects
          projects={data.projects}
          themeColor={activeColor}
          onOpenEditorModal={() => setIsEditorModalOpen(true)}
        />

        {/* 5. Skills Matrix */}
        <Skills
          categories={data.skillCategories}
          themeColor={activeColor}
        />

        {/* 6. Education & Certifications */}
        <Education
          education={data.education}
          themeColor={activeColor}
        />

        {/* 7. Interactive Contact Section */}
        <Contact personal={data.personal} themeColor={activeColor} />
      </main>

      {/* Footer */}
      <Footer data={data} themeColor={activeColor} />

      {/* Modals */}
      <CvImportModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        onApplyData={handleUpdateData}
        themeColor={activeColor}
      />

      <LiveEditorModal
        isOpen={isEditorModalOpen && isEditMode}
        onClose={() => setIsEditorModalOpen(false)}
        data={data}
        onSave={handleUpdateData}
        themeColor={activeColor}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        data={data}
        themeColor={activeColor}
      />

      <QRCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        data={data}
        themeColor={activeColor}
      />

      {/* Floating indicator when ?edit=1 is active */}
      {isEditMode && (
        <aside
          aria-label="Panel de modo edición"
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 text-white text-xs backdrop-blur-md border border-slate-700/80 shadow-2xl animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">Modo edición activo (?edit=1)</span>
          <button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete('edit');
              window.history.replaceState({}, '', url.pathname + (url.hash || ''));
              setIsEditMode(false);
            }}
            className="ml-2 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            title="Ver la landing como visitante público (ocultar controles de edición)"
          >
            Vista visitante
          </button>
        </aside>
      )}
    </div>
  );
}
