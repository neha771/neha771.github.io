import { useCallback, useEffect, useRef, useState } from 'react';
import { Hero } from './components/Hero';
import { CardWheel, type WheelHandle } from './components/CardWheel';
import { Deck } from './components/Deck';
import { LINKS, SECTIONS } from './data/sections';

export default function App() {
  const stageRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<WheelHandle>(null);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) return;
      if (e.key === 'ArrowRight') wheelRef.current?.go(1);
      else if (e.key === 'ArrowLeft') wheelRef.current?.go(-1);
      else if (e.key === 'Enter' && document.activeElement === document.body) setOpen(wheelRef.current?.active() ?? 0);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Tall section: scrolling through it turns the card wheel while the stage stays pinned. */}
      <section
        className="stage"
        id="top"
        ref={stageRef}
        style={{ height: `calc(100vh + ${(SECTIONS.length - 1) * 42}vh)` }}
      >
        <div className="stage-pin">
          <Hero onPrev={() => wheelRef.current?.go(-1)} onNext={() => wheelRef.current?.go(1)} />
          <CardWheel ref={wheelRef} sections={SECTIONS} stageRef={stageRef} onOpen={setOpen} />
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

      {open !== null && <Deck section={SECTIONS[open]} index={open} total={SECTIONS.length} onClose={close} />}
    </>
  );
}
