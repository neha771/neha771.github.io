import { Logo } from './Logo';
import { LINKS } from '../data/sections';

interface TopBarProps {
  glance: boolean;
  onToggleGlance: () => void;
}

/** Always-visible contacts, resume download and the "At a glance" switch. */
export function TopBar({ glance, onToggleGlance }: TopBarProps) {
  return (
    <nav className="topbar" aria-label="Contact and view">
      <a
        className="tb-brand"
        href="#top"
        aria-label="Neha Susan Manoj, back to top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <Logo size={34} />
        <span className="tb-name">Neha Susan Manoj</span>
      </a>

      <button type="button" role="switch" aria-checked={glance} className="glance-switch" onClick={onToggleGlance}>
        <span className="gs-label">At a glance</span>
        <span className="gs-track" aria-hidden="true">
          <span className="gs-knob" />
        </span>
      </button>

      <div className="tb-links">
        <a className="tb-icon" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.62 4.77 6.04V21h-4v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4V9.75Z" />
          </svg>
        </a>
        <a className="tb-icon" href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
            <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
          </svg>
        </a>
        <a className="tb-icon" href={LINKS.email} aria-label="Email nehasusan369@gmail.com">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
        <a className="tb-resume" href={LINKS.resume} target="_blank" rel="noreferrer">
          Resume <span aria-hidden="true">↓</span>
        </a>
      </div>
    </nav>
  );
}
