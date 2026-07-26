import type { Theme } from '../hooks/useTheme';

interface TopbarProps {
  theme: Theme;
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Topbar({ theme, onToggleTheme }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="id">
        <span className="mono">NM</span>
        <span className="nm">Neha Susan Manoj</span>
        <span className="sep">·</span>
        <span className="rl">Product Manager</span>
      </div>
      <div className="socials">
        <a className="soc" href="https://linkedin.com/in/nehasusanmanoj" target="_blank" rel="noreferrer" title="LinkedIn">
          in
        </a>
        <a
          className="soc"
          href="https://medium.com/@nehasusan369"
          target="_blank"
          rel="noreferrer"
          title="Medium"
          style={{ fontSize: '.74rem', letterSpacing: '-.4px' }}
        >
          Med
        </a>
        <a
          className="soc"
          href="https://github.com/neha771"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          style={{ fontSize: '.7rem' }}
        >
          gh
        </a>
        <a className="soc" href="mailto:nehasusan369@gmail.com" title="Email">
          ✉
        </a>
        <a
          className="soc"
          href="https://drive.google.com/drive/folders/1-29jxZ1Bmcezz1jgA6Lh9IOsGdxfpy07?usp=sharing"
          target="_blank"
          rel="noreferrer"
          title="Resume"
          style={{ fontSize: '.68rem' }}
        >
          CV
        </a>
        <button className="theme-toggle" title="Toggle light / dark" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
      </div>
    </div>
  );
}
