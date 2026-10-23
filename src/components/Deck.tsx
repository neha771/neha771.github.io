import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { FolderFile } from '../data/folders';
import type { Section } from '../data/sections';
import { useTilt } from '../hooks/useTilt';

interface DeckProps {
  section: Section;
  index: number;
  total: number;
  onClose: () => void;
}

const HEADS = ['magenta', 'navy', 'paper'] as const;

/** A set of cards that pops out of the wheel for one section. */
export function Deck({ section, index, total, onClose }: DeckProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const scrollBy = (dir: number) => {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: dir * row.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <div className="deck" role="dialog" aria-modal="true" aria-labelledby="deck-title" onClick={onClose}>
      <div className="deck-inner" onClick={(e) => e.stopPropagation()}>
        <div className="deck-head">
          <div>
            <span className="deck-kicker">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <h2 id="deck-title" className="deck-title">
              {section.title}
            </h2>
            <p className="deck-blurb">{section.blurb}</p>
          </div>
          <div className="deck-tools">
            <button type="button" className="round-btn" onClick={() => scrollBy(-1)} aria-label="Scroll cards left">
              ←
            </button>
            <button type="button" className="round-btn" onClick={() => scrollBy(1)} aria-label="Scroll cards right">
              →
            </button>
            <button type="button" className="round-btn close" ref={closeRef} onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        <div className="deck-row" ref={rowRef}>
          {section.files.map((f, i) => (
            <DeckCard key={`${section.id}-${i}`} file={f} i={i} />
          ))}
        </div>
        <p className="deck-hint">Tap a card to flip it</p>
      </div>
    </div>
  );
}

function DeckCard({ file, i }: { file: FolderFile; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useTilt<HTMLDivElement>(true, 9);
  const head = HEADS[i % HEADS.length];
  // a hand-dealt look: small alternating rotations that straighten on hover
  const rot = ((i % 2 ? 1 : -1) * (1.2 + (i % 3) * 0.6)).toFixed(1);
  const style = { '--i': Math.min(i, 10), '--r': `${rot}deg` } as CSSProperties;
  const firstWord = file.title.split(/[\s,:]/)[0];

  return (
    <div className="dcard" style={style}>
      {/* hit area (stable) → tilt + hover lift layer → flip layer */}
      <div className="dcard-hit" ref={tiltRef}>
        <div className="dcard-tilt">
          <button
            type="button"
            className={`dcard-flip${flipped ? ' flipped' : ''}`}
            onClick={() => setFlipped((v) => !v)}
            aria-pressed={flipped}
            aria-label={`${file.title}: ${flipped ? 'show front' : 'show details'}`}
          >
            <div className="dcard-face front">
              {file.img ? (
                <div className="dcard-media">
                  <img src={file.img} alt="" loading="lazy" draggable={false} />
                </div>
              ) : (
                <div className={`dcard-media type head-${head}`}>
                  <span className="type-word">{firstWord}</span>
                  <span className="tri tl" />
                  <span className="tri br" />
                </div>
              )}
              <div className="dcard-body">
                {file.sub && <span className="dcard-sub">{file.sub}</span>}
                <h3 className="dcard-title">{file.title}</h3>
                {file.desc && <p className="dcard-peek">{file.desc}</p>}
                <div className="dcard-tags">
                  {file.tags.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <span className="glare" />
            </div>

            <div className="dcard-face back">
              <span className="dcard-sub">{file.sub ?? 'Details'}</span>
              <h3 className="dcard-title">{file.title}</h3>
              {file.desc && <p className="dcard-desc">{file.desc}</p>}
              {file.tags.length > 3 && (
                <div className="dcard-tags light">
                  {file.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
              {!file.desc && file.tags.length <= 3 && (
                <div className="dcard-tags light">
                  {file.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </button>
          {file.link && (
            <a
              className="dcard-link"
              href={file.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Open ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
