import { useEffect, useState } from 'react';
import { FOLDERS, type FolderDef, type FolderFile, type FolderKey } from '../data/folders';
import { useDraggable } from '../hooks/useDraggable';
import type { WindowKey } from '../hooks/useWindowManager';
import { GuestBook } from './GuestBook';

interface WindowProps {
  openKey: WindowKey | null;
  parentKey: FolderKey | null;
  onClose: () => void;
  onOpenWin: (key: WindowKey, parent?: FolderKey) => void;
}

export function Window({ openKey, parentKey, onClose, onOpenWin }: WindowProps) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  const { handleRef: barRef, targetRef: winRef } = useDraggable<HTMLDivElement, HTMLDivElement>({
    shouldStart: (e) => !(e.target as HTMLElement).classList.contains('l'),
  });

  useEffect(() => {
    if (openKey) {
      setMounted(true);
      setShow(true);
    } else if (mounted) {
      setShow(false);
      const t = setTimeout(() => setMounted(false), 260);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openKey]);

  // Recenter (desktop only) every time a new folder/subfolder/guestbook opens.
  // `mounted` must be a dependency: the first run after openKey changes fires
  // before the window's DOM node exists (mounted is still false that render).
  useEffect(() => {
    const el = winRef.current;
    if (!openKey || !el) return;
    if (window.innerWidth > 860) {
      const w = el.offsetWidth;
      el.style.left = `${(window.innerWidth - w) / 2}px`;
      el.style.top = `${window.innerHeight * 0.1}px`;
    } else {
      el.style.left = '';
      el.style.top = '';
    }
  }, [openKey, parentKey, mounted, winRef]);

  if (!mounted || !openKey) return null;

  const isGuestBook = openKey === 'guestbook';
  const f: FolderDef = isGuestBook ? { name: 'Guest Book', em: '📖', f1: '', f2: '', tab: '' } : FOLDERS[openKey];
  const isGroup = !isGuestBook && !!f.subfolders;
  const count = isGuestBook ? 0 : isGroup ? f.subfolders!.length : f.files?.length ?? 0;
  const countLabel = isGuestBook ? 'leave a note' : isGroup ? `${count} folders` : `${count} items`;
  const parent = !isGuestBook && parentKey ? FOLDERS[parentKey] : null;

  return (
    <div className={`window${show ? ' show' : ''}`} ref={winRef} style={{ display: 'flex' }}>
      <div className="win-bar" ref={barRef}>
        <div className="lights">
          <span className="l red" onClick={onClose} />
          <span className="l yellow" />
          <span className="l green" />
        </div>
        {parent && (
          <button className="wback" onClick={() => onOpenWin(parentKey!)} title={`Back to ${parent.name}`}>
            ← {parent.name}
          </button>
        )}
        <div className="win-title">
          <span className="we">{f.em}</span> {f.name} <span className="win-count">{countLabel}</span>
        </div>
        <div className="win-tools">⌕ ⚙</div>
      </div>
      {isGuestBook ? (
        <GuestBook />
      ) : (
        <FolderBody folderKey={openKey as FolderKey} onOpenWin={onOpenWin} />
      )}
    </div>
  );
}

function FolderBody({
  folderKey,
  onOpenWin,
}: {
  folderKey: FolderKey;
  onOpenWin: (key: WindowKey, parent?: FolderKey) => void;
}) {
  const f = FOLDERS[folderKey];
  if (f.subfolders) {
    return (
      <div className="win-body">
        {f.subfolders.map((key) => (
          <SubfolderCard key={key} folderKey={key} parentKey={folderKey} onOpenWin={onOpenWin} />
        ))}
      </div>
    );
  }
  return (
    <div className="win-body">
      {(f.files ?? []).map((file, i) => (
        <FileCard key={i} file={file} index={i} />
      ))}
    </div>
  );
}

const GRADIENT_CLASSES = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'];

function FileCard({ file, index }: { file: FolderFile; index: number }) {
  const g = GRADIENT_CLASSES[index % GRADIENT_CLASSES.length];
  const [loaded, setLoaded] = useState(false);
  const inner = (
    <>
      <div className={`thumb ${g}`}>
        {file.img ? (
          <>
            <img
              className={`thumb-img${loaded ? ' loaded' : ''}`}
              src={file.img}
              alt={file.title}
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
            <span className="thumb-badge">{file.ico}</span>
          </>
        ) : (
          <span className="te">{file.ico}</span>
        )}
        {file.link && <span className="arr">↗</span>}
      </div>
      <div className="file-title">{file.title}</div>
      {file.sub && <div className="file-sub">{file.sub}</div>}
      {file.desc && <div className="file-desc">{file.desc}</div>}
      {file.tags && (
        <div className="file-tags">
          {file.tags.map((t) => (
            <span className="ftag" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
  if (file.link) {
    const link = file.link;
    return (
      <div className="file link" onClick={() => window.open(link, '_blank')}>
        {inner}
      </div>
    );
  }
  return <div className="file">{inner}</div>;
}

function SubfolderCard({
  folderKey,
  parentKey,
  onOpenWin,
}: {
  folderKey: FolderKey;
  parentKey: FolderKey;
  onOpenWin: (key: WindowKey, parent?: FolderKey) => void;
}) {
  const f = FOLDERS[folderKey];
  const ct = f.files ? f.files.length : 0;
  return (
    <div className="file link sub" onClick={() => onOpenWin(folderKey, parentKey)}>
      <div className="thumb" style={{ background: `linear-gradient(140deg,${f.f1},${f.f2})` }}>
        <span className="te">{f.em}</span>
        <span className="arr">→</span>
      </div>
      <div className="file-title">{f.name}</div>
      <div className="file-sub">{ct} items</div>
      {f.desc && <div className="file-desc">{f.desc}</div>}
    </div>
  );
}
