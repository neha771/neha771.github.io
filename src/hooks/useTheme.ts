import { useEffect, useState } from 'react';
import { burst } from '../lib/burst';

export type Theme = 'dark' | 'light';

// All colour tokens for each mode, set as inline styles on root so they
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
    '--bg': '#eaf2fa', '--bg2': '#dceaf6', '--panel': '#ffffff', '--panel-2': '#f7f6f2', '--card': '#f1f1ef',
    '--line': 'rgba(34,34,32,.14)', '--line-soft': 'rgba(34,34,32,.07)',
    '--ink': '#232322', '--ink-mid': '#5b5b57', '--ink-soft': '#8d8d87',
    '--gold': '#8a6b1c', '--gold-2': '#d7b13f', '--gold-d': '#6b520f',
    '--emerald': '#2f8f6b', '--sapphire': '#3f77b8', '--amethyst': '#7a5fae',
    '--ruby': '#b85570', '--topaz': '#b8892c', '--teal': '#2f8f8a',
  },
};

// Light-mode folder colours (muted sand / sky / sage), keyed by FolderKey.
export const LIGHT_FOLDER_COLORS: Record<string, { f1: string; f2: string; tab: string }> = {
  experience: { f1: '#ece8de', f2: '#d2caba', tab: '#b9ae99' },
  hackathons: { f1: '#f6e4d6', f2: '#eccbb0', tab: '#dcae8a' },
  impact: { f1: '#fdf1c6', f2: '#f6dd90', tab: '#e8c45c' },
  projects: { f1: '#dbe9f7', f2: '#b0cce9', tab: '#8ab3dc' },
  productResearch: { f1: '#dbe9f7', f2: '#b0cce9', tab: '#8ab3dc' },
  achievements: { f1: '#e2eaed', f2: '#bfcfd7', tab: '#9fb5c0' },
  leadership: { f1: '#f9ecd0', f2: '#efd6a0', tab: '#ddb96a' },
  education: { f1: '#dcece2', f2: '#b4d6c4', tab: '#8dbfa4' },
  skills: { f1: '#dceaea', f2: '#b2d3d3', tab: '#8bbcbc' },
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
