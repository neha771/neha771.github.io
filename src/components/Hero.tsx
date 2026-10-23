import { INTRO } from '../data/sections';

const WORD = 'PORTFOLIO';

interface HeroProps {
  onPrev: () => void;
  onNext: () => void;
}

/** The welcome block: title, colour bar, name, role and a short intro. */
export function Hero({ onPrev, onNext }: HeroProps) {
  return (
    <header className="hero">
      <span className="plus" style={{ left: '4%', top: '6%' }} aria-hidden="true" />
      <span className="plus" style={{ right: '4%', top: '6%' }} aria-hidden="true" />
      <span className="plus" style={{ left: '4%', bottom: '4%' }} aria-hidden="true" />
      <span className="plus" style={{ right: '4%', bottom: '4%' }} aria-hidden="true" />

      <div className="hero-top">
        <p className="eyebrow">
          Welcome
          <br />
          to my
        </p>
        <span className="status-chip">
          <span className="dot" aria-hidden="true" />
          Open to product roles
        </span>
      </div>

      <div className="title-wrap">
        <button type="button" className="side-arrow left" onClick={onPrev} aria-label="Previous card" />
        <div className="title-bar" aria-hidden="true" />
        <h1 className="title" aria-label={WORD}>
          {WORD.split('').map((ch, i) => (
            <span className="flip" key={i} style={{ animationDelay: `${(i * 0.09).toFixed(2)}s` }} aria-hidden="true">
              <span className="flip-front">{ch}</span>
              <span className="flip-back">{ch}</span>
            </span>
          ))}
        </h1>
        <button type="button" className="side-arrow right" onClick={onNext} aria-label="Next card" />
      </div>

      <div className="hero-bottom">
        <span className="meta">Neha Susan Manoj</span>
        <div className="intro-col">
          <p className="intro">{INTRO}</p>
          <span className="scroll-cue" aria-hidden="true">
            Scroll to turn the cards · Click the top one to open
          </span>
        </div>
        <span className="meta right">Product Manager</span>
      </div>
    </header>
  );
}
