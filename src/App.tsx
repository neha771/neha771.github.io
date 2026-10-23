import { useCallback, useEffect, useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { CardWheel, type WheelHandle } from './components/CardWheel';
import { Deck } from './components/Deck';
import { Glance } from './components/Glance';
import { TopBar } from './components/TopBar';
import { LINKS, SECTIONS } from './data/sections';

interface OpenDeck {
  index: number;
  /** Card to scroll to and show flipped (when arriving from "At a glance"). */
  focus?: number;
  /** Closing the deck goes back to the glance sheet instead of the wheel. */
  fromGlance?: boolean;
}

// "At a glance" lives in the URL hash so it can be shared and the back button closes it.
const glanceInUrl = () => window.location.hash === '#glance';

export default function App() {
  const stageRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<WheelHandle>(null);
  const [open, setOpen] = useState<OpenDeck | null>(null);
  const [glance, setGlanceState] = useState(glanceInUrl);

  const setGlance = useCallback((on: boolean, push = true) => {
    const url = on ? '#glance' : window.location.pathname;
    if (push) window.history.pushState(null, '', url);
    else window.history.replaceState(null, '', url);
    setGlanceState(on);
  }, []);

  const closeDeck = useCallback(() => {
    if (open?.fromGlance) setGlance(true, false);
    setOpen(null);
  }, [open, setGlance]);

  /** From the glance sheet: jump into a section's deck with one card flipped open. */
  const jumpTo = useCallback(
    (sectionId: string, focus: number) => {
      const index = SECTIONS.findIndex((s) => s.id === sectionId);
      if (index < 0) return;
      setGlance(false, false);
      setOpen({ index, focus, fromGlance: true });
    },
    [setGlance]
  );

  useEffect(() => {
    const onPop = () => setGlanceState(glanceInUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) return;
      if (glance) {
        if (e.key === 'Escape') setGlance(false);
        return;
      }
      if (e.key === 'ArrowRight') wheelRef.current?.go(1);
      else if (e.key === 'ArrowLeft') wheelRef.current?.go(-1);
      else if (e.key === 'Enter' && document.activeElement === document.body)
        setOpen({ index: wheelRef.current?.active() ?? 0 });
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, glance, setGlance]);

  return (
    <>
      <TopBar glance={glance} onToggleGlance={() => setGlance(!glance)} />

      {/* Tall section: scrolling through it turns the card wheel while the stage stays pinned. */}
      <section
        className="stage"
        id="top"
        ref={stageRef}
        style={{ height: `calc(100vh + ${(SECTIONS.length - 1) * 42}vh)` }}
      >
        <div className="stage-pin">
          <Hero onPrev={() => wheelRef.current?.go(-1)} onNext={() => wheelRef.current?.go(1)} />
          <CardWheel
            ref={wheelRef}
            sections={SECTIONS}
            stageRef={stageRef}
            onOpen={(index) => setOpen({ index })}
          />
        </div>
      </section>

      <footer className="footer">
        <h2 className="footer-title">Let&apos;s build something people love.</h2>
        <div className="footer-links">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={LINKS.email}>Email</a>
          <a href={LINKS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={LINKS.medium} target="_blank" rel="noreferrer">
            Medium
          </a>
          <a href={LINKS.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
        <span className="footer-note">© 2026 Neha Susan Manoj</span>
      </footer>

      {glance && <Glance onJump={jumpTo} />}

      {open !== null && (
        <Deck
          section={SECTIONS[open.index]}
          index={open.index}
          total={SECTIONS.length}
          focus={open.focus}
          backLabel={open.fromGlance ? 'Back to At a glance' : undefined}
          onClose={closeDeck}
        />
      )}
    </>
  );
}
