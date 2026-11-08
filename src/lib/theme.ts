import { ThemeColor } from '../types';

export interface ThemeConfig {
  name: string;
  badge: string;
  accentText: string;
  accentBg: string;
  accentHover: string;
  accentBorder: string;
  accentLight: string;
  accentRing: string;
  gradientText: string;
  gradientBg: string;
  dotColor: string;
}

export const themeConfigs: Record<ThemeColor, ThemeConfig> = {
  indigo: {
    name: 'Azul marino y dorado',
    badge: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/40',
    accentText: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 text-white',
    accentHover: 'hover:text-indigo-600 dark:hover:text-indigo-400',
    accentBorder: 'border-indigo-500/30 dark:border-indigo-500/40',
    accentLight: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    accentRing: 'focus:ring-indigo-500',
    gradientText: 'from-indigo-700 via-indigo-600 to-amber-600 dark:from-indigo-300 dark:via-amber-200 dark:to-amber-400',
    gradientBg: 'from-indigo-700 to-amber-600',
    dotColor: 'bg-indigo-500',
  },
  emerald: {
    name: 'Esmeralda Tech',
    badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/40',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 text-white',
    accentHover: 'hover:text-emerald-600 dark:hover:text-emerald-400',
    accentBorder: 'border-emerald-500/30 dark:border-emerald-500/40',
    accentLight: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    accentRing: 'focus:ring-emerald-500',
    gradientText: 'from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400',
    gradientBg: 'from-emerald-600 to-teal-700',
    dotColor: 'bg-emerald-500',
  },
  violet: {
    name: 'Violeta Creativo',
    badge: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200/60 dark:border-violet-800/40',
    accentText: 'text-violet-600 dark:text-violet-400',
    accentBg: 'bg-violet-600 dark:bg-violet-500 hover:bg-violet-700 text-white',
    accentHover: 'hover:text-violet-600 dark:hover:text-violet-400',
    accentBorder: 'border-violet-500/30 dark:border-violet-500/40',
    accentLight: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
    accentRing: 'focus:ring-violet-500',
    gradientText: 'from-violet-600 via-purple-600 to-pink-600 dark:from-violet-400 dark:via-purple-300 dark:to-pink-400',
    gradientBg: 'from-violet-600 to-purple-700',
    dotColor: 'bg-violet-500',
  },
  amber: {
    name: 'Ámbar Cálido',
    badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/40',
    accentText: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 text-white',
    accentHover: 'hover:text-amber-600 dark:hover:text-amber-400',
    accentBorder: 'border-amber-500/30 dark:border-amber-500/40',
    accentLight: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    accentRing: 'focus:ring-amber-500',
    gradientText: 'from-amber-600 via-orange-600 to-rose-600 dark:from-amber-400 dark:via-orange-300 dark:to-rose-400',
    gradientBg: 'from-amber-600 to-orange-700',
    dotColor: 'bg-amber-500',
  },
  rose: {
    name: 'Rosa Moderno',
    badge: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/40',
    accentText: 'text-rose-600 dark:text-rose-400',
    accentBg: 'bg-rose-600 dark:bg-rose-500 hover:bg-rose-700 text-white',
    accentHover: 'hover:text-rose-600 dark:hover:text-rose-400',
    accentBorder: 'border-rose-500/30 dark:border-rose-500/40',
    accentLight: 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    accentRing: 'focus:ring-rose-500',
    gradientText: 'from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-300 dark:to-red-400',
    gradientBg: 'from-rose-600 to-pink-700',
    dotColor: 'bg-rose-500',
  },
  slate: {
    name: 'Minimal Negro & Pizarra',
    badge: 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-300 dark:border-zinc-700',
    accentText: 'text-slate-900 dark:text-zinc-100',
    accentBg: 'bg-slate-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-black',
    accentHover: 'hover:text-slate-900 dark:hover:text-white',
    accentBorder: 'border-slate-400 dark:border-zinc-600',
    accentLight: 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200',
    accentRing: 'focus:ring-slate-800',
    gradientText: 'from-slate-900 via-zinc-700 to-slate-800 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-400',
    gradientBg: 'from-slate-900 to-zinc-800',
    dotColor: 'bg-slate-800 dark:bg-zinc-200',
  },
};
