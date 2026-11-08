import React, { useRef, useState } from 'react';
import {
  MapPin,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Globe,
  ArrowRight,
  Sparkles,
  Download,
  Phone,
  Camera,
  Upload,
  UserCheck,
  QrCode,
  Sliders,
  Maximize2,
  Check,
  Calendar,
} from 'lucide-react';
import { PortfolioData, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';

interface HeroProps {
  data: PortfolioData;
  themeColor: ThemeColor;
  onOpenCvModal: () => void;
  onOpenQrModal: () => void;
  onUpdateAvatar?: (url: string) => void;
  isEditMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  data,
  themeColor,
  onOpenCvModal,
  onOpenQrModal,
  onUpdateAvatar,
  isEditMode = false,
}) => {
  const theme = themeConfigs[themeColor];
  const { personal, stats } = data;

  const resolveImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const clean = url.startsWith('/') ? url.slice(1) : url;
    const baseUrl = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL || './';
    return `${baseUrl}${clean}`;
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedRealPhoto, setUploadedRealPhoto] = useState<string | null>(() => {
    return localStorage.getItem('miguel_custom_real_photo') || null;
  });

  // Vertical position for photo centering (default 15% focuses on head/face in portraits)
  const [photoPositionY, setPhotoPositionY] = useState<number>(() => {
    const saved = localStorage.getItem('miguel_photo_pos_y');
    return saved !== null ? parseInt(saved, 10) : 15;
  });

  // Aspect ratio: 'portrait' (4:5) or 'square' (1:1)
  const [photoAspect, setPhotoAspect] = useState<'portrait' | 'square'>(() => {
    return (localStorage.getItem('miguel_photo_aspect') as 'portrait' | 'square') || 'portrait';
  });

  const [showFramingTools, setShowFramingTools] = useState(false);

  const handleUpdatePosY = (newY: number) => {
    setPhotoPositionY(newY);
    localStorage.setItem('miguel_photo_pos_y', newY.toString());
  };

  const handleUpdateAspect = (aspect: 'portrait' | 'square') => {
    setPhotoAspect(aspect);
    localStorage.setItem('miguel_photo_aspect', aspect);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setUploadedRealPhoto(result);
      localStorage.setItem('miguel_custom_real_photo', result);
      if (onUpdateAvatar) {
        onUpdateAvatar(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPortrait = (type: 'ai' | 'real') => {
    if (type === 'ai') {
      if (onUpdateAvatar) onUpdateAvatar('/foto-miguel.jpg');
    } else {
      if (uploadedRealPhoto) {
        if (onUpdateAvatar) onUpdateAvatar(uploadedRealPhoto);
      } else {
        fileInputRef.current?.click();
      }
    }
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-slate-200/40 via-indigo-100/30 to-blue-100/20 dark:from-slate-900/40 dark:via-indigo-950/20 dark:to-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm mb-6 shadow-xs transition-transform hover:scale-102 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.availabilityText || 'Disponible para nuevos proyectos · Presencial o híbrido'}</span>
            </div>

            {/* Name & Title */}
            <div className="@container w-full">
              <h1 className="whitespace-nowrap text-[clamp(20px,calc(100cqi/15.2),60px)] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4">
                Hola, soy{' '}
                <span className={`bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}>
                  {personal.fullName}
                </span>
              </h1>
            </div>

            <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4 tracking-tight">
              {personal.title}
            </p>

            {/* Tagline / Bio summary */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-6 leading-relaxed">
              {personal.tagline}
            </p>

            {/* Location & Quick Info */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-sm text-slate-500 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Español · English · Français · Português
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="https://calendar.app.google/MctgYjLJqXKND6279"
                target="_blank"
                rel="noreferrer"
                id="btn-hero-contact"
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all hover:shadow-lg active:scale-95 ${theme.accentBg}`}
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar una llamada</span>
              </a>

              <a
                href="#proyectos"
                id="btn-hero-projects"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs transition-colors"
              >
                <span>Ver especialidades</span>
              </a>

              <button
                id="btn-hero-qr-share"
                onClick={onOpenQrModal}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border-2 border-indigo-600 dark:border-indigo-500 bg-transparent text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 hover:border-indigo-700 dark:hover:border-indigo-400 shadow-xs transition-all cursor-pointer active:scale-95"
                title="Ver y compartir código QR de mi landing page"
              >
                <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-indigo-600 dark:text-indigo-400">Compartir QR</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Redes:
              </span>
              {personal.socialLinks.linkedin && (
                <a
                  href={personal.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {personal.socialLinks.github && (
                <a
                  href={personal.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {personal.socialLinks.twitter && (
                <a
                  href={personal.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {personal.socialLinks.website && (
                <a
                  href={personal.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Sitio Web"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Avatar Card & Highlights */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Decorative background glow */}
              <div
                className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-tr ${theme.gradientBg}`}
              />

              {/* Card Container */}
              <div className="relative rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Avatar Image with overlay styling */}
                <div
                  className={`relative w-full ${
                    photoAspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'
                  } rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 group transition-all duration-300 shadow-inner`}
                >
                  <img
                    src={resolveImageUrl(personal.avatarUrl)}
                    alt={personal.fullName}
                    className="w-full h-full object-cover transform transition-all duration-300 group-hover:scale-105"
                    style={{
                      objectPosition: `center ${photoPositionY}%`,
                    }}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/foto-miguel.jpg';
                    }}
                  />

                  {/* Photo Edit Controls (Visible only when ?edit=1) */}
                  {isEditMode && (
                    <>
                      {/* Top-left "Centrar foto" button */}
                      <button
                        onClick={() => setShowFramingTools(!showFramingTools)}
                        type="button"
                        className="absolute top-2.5 left-2.5 px-2.5 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer z-10"
                        title="Ajustar centrado y encuadre de la foto"
                      >
                        <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{showFramingTools ? 'Cerrar ajuste' : 'Centrar foto'}</span>
                      </button>

                      {/* Top-right "Cambiar foto" button */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                        className="absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer z-10"
                        title="Subir o cambiar por mi foto real"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>Cambiar foto</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Interactive Framing & Centering Panel (Visible only when ?edit=1) */}
                {isEditMode && showFramingTools && (
                  <div className="mb-4 p-3 rounded-2xl bg-indigo-50/90 dark:bg-slate-800/95 border border-indigo-200 dark:border-indigo-900/50 text-xs animate-in fade-in zoom-in-95 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-[11px]">
                        <Sliders className="w-3 h-3 text-indigo-500" />
                        Centrado vertical de la cara:
                      </span>
                      <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                        {photoPositionY}%
                      </span>
                    </div>

                    {/* Quick position presets */}
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <button
                        type="button"
                        onClick={() => handleUpdatePosY(10)}
                        className={`py-1 px-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                          photoPositionY <= 15
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Cara arriba (10%)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdatePosY(30)}
                        className={`py-1 px-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                          photoPositionY > 15 && photoPositionY < 50
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Medio (30%)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdatePosY(50)}
                        className={`py-1 px-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                          photoPositionY >= 50
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Centro (50%)
                      </button>
                    </div>

                    {/* Vertical fine slider */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="2"
                        value={photoPositionY}
                        onChange={(e) => handleUpdatePosY(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                      />
                      <div className="flex justify-between text-[9px] text-slate-500 dark:text-slate-400">
                        <span>↑ Arriba (0%)</span>
                        <span>Centro (50%)</span>
                        <span>↓ Abajo (100%)</span>
                      </div>
                    </div>

                    {/* Aspect Ratio Toggle */}
                    <div className="pt-2 border-t border-indigo-100 dark:border-slate-700 flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Formato:</span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateAspect('portrait')}
                          className={`px-2 py-0.5 rounded-md font-semibold cursor-pointer ${
                            photoAspect === 'portrait'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          Vertical (4:5)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateAspect('square')}
                          className={`px-2 py-0.5 rounded-md font-semibold cursor-pointer ${
                            photoAspect === 'square'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          Cuadrado (1:1)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                {/* Quick Info pills inside card */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Estado</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {personal.availability === 'available' ? 'Disponible' : 'En proyectos'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400">Modalidad</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Presencial / Híbrido
                    </span>
                  </div>

                  <div className="pt-2">
                    <a
                      href="#experiencia"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                      <span>Ver Trayectoria Profesional</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-0.5">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
