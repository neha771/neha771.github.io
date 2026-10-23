import { useCallback, useEffect, useRef, useState } from 'react';
import { burst } from '../lib/burst';
import nehaPhoto from '../assets/neha.jpg';

const HOLES = 9;
const ROUND_MS = 20000;
const BEST_KEY = 'nsm_catch_best';

type Phase = 'idle' | 'playing' | 'over';

interface Pop {
  id: number;
  hole: number;
  gold: boolean;
}

function loadBest(): number {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(n: number) {
  try {
    localStorage.setItem(BEST_KEY, String(n));
  } catch {
    // storage unavailable, so the best score just won't persist
  }
}

function verdict(score: number) {
  if (score === 0) return 'Neha slipped away! Give it another go 🙈';
  if (score < 8) return "Warm-up round. She's quick!";
  if (score < 16) return 'Nice reflexes! 👀';
  if (score < 26) return 'Okay, you’re good at this. ⚡️';
  return 'Product-manager-level focus 🏆';
}

/** Whack-a-mole, but it's Neha popping out of the holes. */
export function CatchGame() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(loadBest);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const [pop, setPop] = useState<Pop | null>(null);
  const [bonked, setBonked] = useState<number | null>(null);
  const [floater, setFloater] = useState<{ id: number; hole: number; text: string } | null>(null);

  const scoreRef = useRef(0);
  const lastHole = useRef(-1);
  const popId = useRef(0);
  const timers = useRef<number[]>([]);
  const endAt = useRef(0);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Faster pops as the score climbs, but never faster than a human can manage.
  const upMs = () => Math.max(520, 1050 - scoreRef.current * 26);

  const nextPop = useCallback(() => {
    if (performance.now() >= endAt.current) return;
    let hole = Math.floor(Math.random() * HOLES);
    if (hole === lastHole.current) hole = (hole + 1 + Math.floor(Math.random() * (HOLES - 1))) % HOLES;
    lastHole.current = hole;
    const id = ++popId.current;
    setPop({ id, hole, gold: Math.random() < 0.14 });
    later(() => {
      setPop((p) => (p && p.id === id ? null : p));
      later(nextPop, 200 + Math.random() * 280);
    }, upMs());
  }, []);

  const start = () => {
    clearAll();
    scoreRef.current = 0;
    setScore(0);
    setPop(null);
    setBonked(null);
    setFloater(null);
    endAt.current = performance.now() + ROUND_MS;
    setTimeLeft(ROUND_MS);
    setPhase('playing');
    later(nextPop, 450);
  };

  // Round clock.
  useEffect(() => {
    if (phase !== 'playing') return;
    const iv = window.setInterval(() => {
      const left = Math.max(0, endAt.current - performance.now());
      setTimeLeft(left);
      if (left <= 0) {
        clearAll();
        setPop(null);
        setPhase('over');
        if (scoreRef.current > loadBest()) {
          saveBest(scoreRef.current);
          setBest(scoreRef.current);
        }
      }
    }, 100);
    return () => clearInterval(iv);
  }, [phase]);

  useEffect(() => clearAll, []);

  const whack = (x: number, y: number, p: Pop) => {
    if (phase !== 'playing' || bonked === p.id) return;
    const pts = p.gold ? 3 : 1;
    scoreRef.current += pts;
    setScore(scoreRef.current);
    setBonked(p.id);
    setFloater({ id: p.id, hole: p.hole, text: `+${pts}` });
    burst(x, y);
    clearAll();
    later(() => {
      setPop(null);
      setBonked(null);
      later(nextPop, 180);
    }, 170);
  };

  const pct = (timeLeft / ROUND_MS) * 100;

  return (
    <div className="game">
      <div className="game-hud">
        <div className="hud-stat">
          <span className="hud-k">score</span>
          <span className="hud-v" key={score}>
            {score}
          </span>
        </div>
        <div className="hud-time" aria-label={`${Math.ceil(timeLeft / 1000)} seconds left`}>
          <div className="hud-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="hud-stat">
          <span className="hud-k">best</span>
          <span className="hud-v">{best}</span>
        </div>
      </div>

      <div className={`game-field${phase !== 'playing' ? ' dim' : ''}`}>
        {Array.from({ length: HOLES }, (_, i) => {
          const here = pop && pop.hole === i ? pop : null;
          return (
            // The whole hole is the tap target: a rising face is partly behind the lip,
            // and a generous hit area keeps the game feeling fair.
            <div className="hole" key={i} onPointerDown={here ? (e) => whack(e.clientX, e.clientY, here) : undefined}>
              <div className="hole-back" />
              <button
                type="button"
                className={`mole${here ? ' up' : ''}${here?.gold ? ' gold' : ''}${here && bonked === here.id ? ' bonk' : ''}`}
                tabIndex={here ? 0 : -1}
                aria-label={here ? 'Catch Neha!' : 'empty hole'}
                onClick={(e) => {
                  // keyboard activation only (detail is 0); pointer taps are handled by the hole
                  if (!here || e.detail !== 0) return;
                  const b = e.currentTarget.getBoundingClientRect();
                  whack(b.x + b.width / 2, b.y + b.height / 2, here);
                }}
              >
                <img src={nehaPhoto} alt="" draggable={false} />
                {here?.gold && <span className="mole-spark">✨</span>}
              </button>
              <div className="hole-lip" />
              {floater && floater.hole === i && (
                <span className="floater" key={floater.id}>
                  {floater.text}
                </span>
              )}
            </div>
          );
        })}

        {phase !== 'playing' && (
          <div className="game-overlay">
            {phase === 'idle' ? (
              <>
                <h4>Catch Neha!</h4>
                <p>She pops up, you tap her. 20 seconds. Golden Neha ✨ is worth 3.</p>
              </>
            ) : (
              <>
                <h4>{score} caught</h4>
                <p>{verdict(score)}</p>
              </>
            )}
            <button type="button" className="game-btn" onClick={start}>
              {phase === 'idle' ? 'Play ▶' : 'Play again ↻'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
