import { useEffect, useRef, type RefObject } from 'react';
import { FOLDERS } from '../data/folders';
import { ITEMS, RESUME_LINK, type DeskItem as DeskItemData } from '../data/items';
import { LIGHT_FOLDER_COLORS, type Theme } from '../hooks/useTheme';
import { useDraggable } from '../hooks/useDraggable';
import type { WindowKey } from '../hooks/useWindowManager';
import { loadPosition, savePosition } from '../lib/deskPositions';
import nehaPhoto from '../assets/neha.jpg';

interface DesktopProps {
  theme: Theme;
  onOpenWin: (key: WindowKey) => void;
}

export function Desktop({ theme, onOpenWin }: DesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const zTopRef = useRef(10);
  const nextZIndex = () => ++zTopRef.current;

  return (
    <div id="desktop" ref={desktopRef}>
      {ITEMS.map((item, i) => (
        <DeskItemView
          key={i}
          item={item}
          index={i}
          desktopRef={desktopRef}
          theme={theme}
          nextZIndex={nextZIndex}
          onOpenWin={onOpenWin}
        />
      ))}
    </div>
  );
}

interface DeskItemViewProps {
  item: DeskItemData;
  index: number;
  desktopRef: RefObject<HTMLDivElement | null>;
  theme: Theme;
  nextZIndex: () => number;
  onOpenWin: (key: WindowKey) => void;
}

function DeskItemView({ item, index, desktopRef, theme, nextZIndex, onOpenWin }: DeskItemViewProps) {
  const onTap = () => {
    if (item.type === 'folder') onOpenWin(item.key);
    else if (item.type === 'journal') onOpenWin('guestbook');
    else if (item.type === 'resume') window.open(RESUME_LINK, '_blank');
  };

  const { handleRef } = useDraggable<HTMLDivElement>({
    onTap,
    getZIndex: nextZIndex,
    onDragEnd: (pos) => savePosition(index, pos),
  });

  useEffect(() => {
    const el = handleRef.current;
    const desktop = desktopRef.current;
    if (!el || !desktop) return;

    const position = () => {
      if (window.innerWidth <= 860) {
        el.style.left = '';
        el.style.top = '';
        return;
      }
      if (el.dataset.moved) return;
      const saved = loadPosition(index);
      if (saved) {
        el.style.left = `${saved.left}px`;
        el.style.top = `${saved.top}px`;
        el.dataset.moved = '1';
        return;
      }
      const W = desktop.clientWidth;
      const H = desktop.clientHeight;
      el.style.left = `${Math.min((item.x / 100) * W, W - 190)}px`;
      el.style.top = `${Math.min((item.y / 100) * H, H - 170)}px`;
    };
    position();
    window.addEventListener('resize', position);
    return () => window.removeEventListener('resize', position);
  }, [desktopRef, handleRef, item.x, item.y, index]);

  const swayTypes = item.type === 'folder' || item.type === 'journal' || item.type === 'resume';
  const animDelay = `${(index * 0.34).toFixed(1)}s`;
  const animDuration = `${(5.8 + index * 0.4).toFixed(1)}s`;

  return (
    <div className="desk-item" ref={handleRef}>
      <div
        className={`desk-inner${swayTypes ? ' sway' : ''}`}
        style={{ animationDelay: animDelay, animationDuration: animDuration }}
      >
        {renderItem(item, theme)}
      </div>
    </div>
  );
}

function renderItem(item: DeskItemData, theme: Theme) {
  switch (item.type) {
    case 'note':
      return (
        <div className={`note ${item.variant}`} style={{ '--rot': `${item.rot}deg` } as React.CSSProperties}>
          <div className="eyebrow">{item.eyebrow}</div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          {item.chip && (
            <div className="chip">
              <span className="dot" />
              {item.chip}
            </div>
          )}
        </div>
      );
    case 'portrait':
      return (
        <div className="portrait">
          <div className="pin" />
          <div className="frame-in">
            <img src={nehaPhoto} alt="Neha Susan Manoj" />
          </div>
          <div className="cap">Neha</div>
        </div>
      );
    case 'folder': {
      const f = FOLDERS[item.key];
      const colors =
        theme === 'light' && LIGHT_FOLDER_COLORS[item.key]
          ? LIGHT_FOLDER_COLORS[item.key]
          : { f1: f.f1, f2: f.f2, tab: f.tab };
      const ct = f.subfolders ? f.subfolders.length : f.files?.length ?? 0;
      const meta = f.subfolders ? `${ct} folders` : `${ct} items`;
      return (
        <>
          <div className="folder" style={{ '--f1': colors.f1, '--f2': colors.f2 } as React.CSSProperties}>
            <span className="em">{f.em}</span>
            <div className="ct">{ct}</div>
          </div>
          <div className="desk-label">{f.name}</div>
          <div className="desk-meta">{meta}</div>
        </>
      );
    }
    case 'journal':
      return (
        <>
          <div className="journal">
            <span className="jt">
              GUEST
              <br />
              BOOK
            </span>
            <span className="jpen">✍️</span>
          </div>
          <div className="desk-label">Guest Book</div>
          <div className="desk-meta">leave a note</div>
        </>
      );
    case 'resume':
      return (
        <>
          <div className="resume-icon">
            <span className="tag">PDF</span>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div className="desk-label">resume.pdf</div>
          <div className="desk-meta">view ↗</div>
        </>
      );
  }
}
