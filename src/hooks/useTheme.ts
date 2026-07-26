import { useEffect, useState } from 'react';
import { burst } from '../lib/burst';

export type Theme = 'dark' | 'light';

// All colour tokens for each mode — set as inline styles on root so they
// override any CSS-cascade issues and guarantee resolution on var() calls.
const THEME_VARS: Record<Theme, Record<string, string>> = {
  dark: {
    '--bg': '#0b0a0f', '--bg2': '#12101a', '--panel': '#171420', '--panel-2': '#1d1928', '--card': '#1d1925',
    '--line': 'rgba(216,184,120,.16)', '--line-soft': 'rgba(255,255,255,.07)',
    '--ink': '#efecf4', '--ink-mid': '#aaa3b6', '--ink-soft': '#6f6979',
    '--gold': '#d8b878', '--gold-2': '#e7cf9b', '--gold-d': '#b8965a',
    '--emerald': '#3fae8c', '--sapphire': '#5e8fe0', '--amethyst': '#a87cdd',
    '--ruby': '#d77392', '--topaz': '#d8ab53', '--teal': '#46b0a8',
  },
  light: {
    '--bg': '#fefaf8', '--bg2': '#f9f2ff', '--panel': '#ffffff', '--panel-2': '#fef4fb', '--card': '#f5eeff',
    '--line': 'rgba(200,120,200,.22)', '--line-soft': 'rgba(150,100,180,.13)',
    '--ink': '#2a1d3a', '--ink-mid': '#6b5080', '--ink-soft': '#b09ab8',
    '--gold': '#c050a0', '--gold-2': '#de80c8', '--gold-d': '#a03080',
    '--emerald': '#20a87a', '--sapphire': '#4a80d0', '--amethyst': '#9060d0',
    '--ruby': '#d05080', '--topaz': '#c08030', '--teal': '#30a0a8',
  },
};

// Light-mode folder colours (pastel jewels) — keyed by FolderKey.
export const LIGHT_FOLDER_COLORS: Record<string, { f1: string; f2: string; tab: string }> = {
  experience: { f1: '#e8d0ff', f2: '#c8a0f0', tab: '#b080e0' },
  hackathons: { f1: '#ffd0e0', f2: '#ffb0c8', tab: '#f080a8' },
  impact: { f1: '#ffe4cc', f2: '#ffbf90', tab: '#f0986a' },
  projects: { f1: '#c8d8ff', f2: '#a0c0f8', tab: '#6898e8' },
  productResearch: { f1: '#c8d8ff', f2: '#a0c0f8', tab: '#6898e8' },
  achievements: { f1: '#e0d0ff', f2: '#c0a8f0', tab: '#a880e0' },
  leadership: { f1: '#ffe8c0', f2: '#ffd090', tab: '#f0a840' },
  education: { f1: '#c8f0e0', f2: '#90d8c0', tab: '#58b898' },
  skills: { f1: '#c8f0f8', f2: '#90d8e8', tab: '#50b8d8' },
};

function applyVars(theme: Theme) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(THEME_VARS[theme])) {
    root.style.setProperty(k, v);
  }
  // Force style recalc so var() re-evaluates immediately.
  document.body.style.display = 'none';
  void document.body.offsetHeight;
  document.body.style.display = '';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('nsm_theme') as Theme | null) || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    applyVars(theme);
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.body.classList.add('theme-transitioning');
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('nsm_theme', next);
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    setTimeout(() => document.body.classList.remove('theme-transitioning'), 600);
  };

  return { theme, toggleTheme };
}
