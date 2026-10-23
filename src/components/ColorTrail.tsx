import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  born: number;
  life: number;
}

const MAX_DOTS = 220;

/**
 * A soft rainbow trail that follows the cursor across the desk, plus a colour
 * splash when you click empty desk space. Sits between the background layers
 * and the desk items, so it never covers content. The animation loop only runs
 * while there are dots on screen.
 */
export function ColorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!matchMedia('(pointer: fine)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dots: Dot[] = [];
    let raf = 0;
    let lastX = -1;
    let lastY = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const hueNow = () => (performance.now() / 12) % 360;

    // `rainbow` fans the hues around the whole wheel (splash); otherwise they cluster (trail).
    const spawn = (x: number, y: number, n: number, speed: number, hue: number, life: number, rainbow = false) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * speed;
        dots.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - speed * 0.25,
          r: 4 + Math.random() * 9,
          hue: (hue + (rainbow ? (i / n) * 360 : Math.random() * 40)) % 360,
          born: performance.now(),
          life: life * (0.7 + Math.random() * 0.6),
        });
      }
      if (dots.length > MAX_DOTS) dots.splice(0, dots.length - MAX_DOTS);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      const now = performance.now();
      const light = document.documentElement.dataset.theme === 'light';
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = light ? 'source-over' : 'lighter';
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        const t = (now - d.born) / d.life;
        if (t >= 1) {
          dots.splice(i, 1);
          continue;
        }
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.96;
        d.vy = d.vy * 0.96 - 0.02;
        const r = d.r * (1 - t * 0.6);
        const alpha = (1 - t) * (light ? 0.6 : 0.7);
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r);
        g.addColorStop(0, `hsla(${d.hue},90%,${light ? 58 : 66}%,${alpha})`);
        g.addColorStop(1, `hsla(${d.hue},90%,${light ? 58 : 66}%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = dots.length ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      // Stay quiet while a folder window is open — the trail is for the desk.
      if (document.querySelector('.window.show')) return;
      const dist = lastX < 0 ? 0 : Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY, Math.min(3, 1 + Math.floor(dist / 18)), 0.8, hueNow(), 900);
    };

    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.id !== 'desktop') return;
      spawn(e.clientX, e.clientY, 42, 7, hueNow(), 1300, true);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas className="color-trail" ref={canvasRef} aria-hidden="true" />;
}
