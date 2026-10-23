import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type RefObject } from 'react';
import type { Section } from '../data/sections';
import { useTilt } from '../hooks/useTilt';
import { Logo } from './Logo';

export interface WheelHandle {
  go: (delta: number) => void;
  goTo: (index: number) => void;
  active: () => number;
}

interface CardWheelProps {
  sections: Section[];
  stageRef: RefObject<HTMLElement | null>;
  onOpen: (index: number) => void;
}

interface Geometry {
  cw: number;
  ch: number;
  radius: number;
  step: number; // degrees between neighbouring cards
  pivotY: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * A fan of cards on a big invisible wheel. Scrolling through the sticky stage turns
 * the wheel so the next card rises to the top centre. Positions are written straight
 * to the DOM each frame (no React re-render), easing toward the scroll target.
 */
export const CardWheel = forwardRef<WheelHandle, CardWheelProps>(function CardWheel(
  { sections, stageRef, onOpen },
  handle
) {
  const n = sections.length;
  const wheelRef = useRef<HTMLDivElement>(null);
  const dialTextRef = useRef<SVGGElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const geo = useRef<Geometry>({ cw: 200, ch: 266, radius: 800, step: 12, pivotY: 1400 });
  const pos = useRef(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const scrollRange = () => {
    const stage = stageRef.current;
    if (!stage) return { top: 0, span: 1 };
    const top = stage.getBoundingClientRect().top + window.scrollY;
    return { top, span: Math.max(1, stage.offsetHeight - window.innerHeight) };
  };

  const goTo = (index: number) => {
    const i = clamp(Math.round(index), 0, n - 1);
    const { top, span } = scrollRange();
    window.scrollTo({ top: top + (i / (n - 1)) * span, behavior: 'smooth' });
  };

  useImperativeHandle(handle, () => ({
    go: (delta) => goTo(activeRef.current + delta),
    goTo,
    active: () => activeRef.current,
  }));

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layout = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cw = clamp(w * 0.15, 140, 230);
      const ch = cw * (4 / 3);
      const radius = Math.max(560, w * 0.62);
      const step = ((cw * 0.86) / radius) * (180 / Math.PI);
      const activeCenter = h * (w < 700 ? 0.7 : 0.69);
      geo.current = { cw, ch, radius, step, pivotY: activeCenter + radius };
      const wheel = wheelRef.current;
      if (wheel) {
        wheel.style.setProperty('--cw', `${cw}px`);
        wheel.style.setProperty('--ch', `${ch}px`);
        wheel.style.setProperty('--pivot-y', `${activeCenter + radius}px`);
        wheel.style.setProperty('--dial-top', `${activeCenter + ch * 0.56 + 14}px`);
      }
    };

    const targetFromScroll = () => {
      const { top, span } = scrollRange();
      return clamp((window.scrollY - top) / span, 0, 1) * (n - 1);
    };

    const paint = () => {
      const { radius, step } = geo.current;
      const p = pos.current;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // wrap so cards from the end of the list sit to the left of the first one
        let off = (((i - p) % n) + n) % n;
        if (off > n / 2) off -= n;
        const a = Math.abs(off);
        const scale = 1 + 0.1 * Math.max(0, 1 - a);
        el.style.transform = `translate(-50%, -50%) rotate(${(off * step).toFixed(3)}deg) translateY(${-radius}px) scale(${scale.toFixed(3)})`;
        el.style.zIndex = String(100 - Math.round(a * 10));
        el.style.opacity = String(clamp(3.6 - a, 0, 1));
        el.style.pointerEvents = a > 3.2 ? 'none' : 'auto';
      });
      if (dialTextRef.current) dialTextRef.current.setAttribute('transform', `rotate(${(-p * 24).toFixed(2)} 130 130)`);
      const nowActive = clamp(Math.round(p), 0, n - 1);
      if (nowActive !== activeRef.current) {
        activeRef.current = nowActive;
        setActive(nowActive);
      }
    };

    let raf = 0;
    const tick = () => {
      const target = targetFromScroll();
      const diff = target - pos.current;
      if (Math.abs(diff) > 0.0005) {
        // critically-damped-ish follow: quick to respond, soft to land
        pos.current = reduce ? target : pos.current + diff * 0.14;
        paint();
      }
      raf = requestAnimationFrame(tick);
    };

    layout();
    pos.current = targetFromScroll();
    paint();
    raf = requestAnimationFrame(tick);
    const onResize = () => {
      layout();
      paint();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  return (
    <div className="wheel" ref={wheelRef}>
      {sections.map((s, i) => (
        <WheelCard
          key={s.id}
          section={s}
          index={i}
          total={n}
          active={i === active}
          refCb={(el) => (cardRefs.current[i] = el)}
          onClick={() => {
            if (i !== active) goTo(i);
            else if (s.href) window.open(s.href, '_blank', 'noopener');
            else onOpen(i);
          }}
        />
      ))}

      <div className="dial" aria-hidden="true">
        <svg viewBox="0 0 260 260" className="dial-svg">
          <defs>
            <path id="dial-path" d="M130,130 m-104,0 a104,104 0 1,1 208,0 a104,104 0 1,1 -208,0" />
          </defs>
          <circle cx="130" cy="130" r="122" className="dial-ring" />
          <g ref={dialTextRef}>
            <text className="dial-text">
              <textPath href="#dial-path">PORTFOLIO • NEHA SUSAN MANOJ • PORTFOLIO • PRODUCT • </textPath>
            </text>
          </g>
        </svg>
        <div className="dial-label">
          <span className="dial-tri" />
          <span className="dial-name">{sections[active].title}</span>
          <span className="dial-count">
            {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
});

interface WheelCardProps {
  section: Section;
  index: number;
  total: number;
  active: boolean;
  refCb: (el: HTMLButtonElement | null) => void;
  onClick: () => void;
}

function WheelCard({ section: s, index, active, refCb, onClick }: WheelCardProps) {
  const tiltRef = useTilt<HTMLDivElement>(active, 12);
  const count = String(s.files.length).padStart(2, '0');

  return (
    <button
      type="button"
      ref={refCb}
      className={`wcard tone-${s.tone}${active ? ' active' : ''}`}
      onClick={onClick}
      aria-label={active ? `Open ${s.title}` : `Show ${s.title}`}
    >
      <div className="wcard-hit" ref={tiltRef}>
        <div className="wcard-face">
          {s.cover && <img src={s.cover} alt="" draggable={false} />}

          {s.tone === 'photo' ? (
            <>
              <span className="corner-tag">
                NSM
                <br />
                2026
              </span>
              <span className="wcard-me">Me</span>
            </>
          ) : s.tone === 'image' ? (
            <div className="wcard-caption">
              <span className="wcard-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="wcard-title">{s.title}</span>
              <span className="wcard-count">{count} cards</span>
            </div>
          ) : (
            <>
              <span className="tri tl" />
              <span className="tri br" />
              {s.tone === 'navy' && (
                <span className="wcard-mark">
                  <Logo size={46} />
                </span>
              )}
              {/* shrink long figures (300+, IIIT-H) so they always fit the card */}
              <span
                className="wcard-stat"
                style={{ fontSize: `calc(var(--cw) * ${Math.min(0.3, 1 / ((s.stat?.length ?? 1) * 0.92)).toFixed(3)})` }}
              >
                {s.stat}
              </span>
              <div className="wcard-caption plain">
                <span className="wcard-title">{s.title}</span>
                <span className="wcard-count">{s.href ? 'One page' : `${count} cards`}</span>
              </div>
            </>
          )}
          <span className="glare" />
          {active && <span className="wcard-open">{s.href ? 'Download ↓' : 'Open ↗'}</span>}
        </div>
      </div>
    </button>
  );
}
