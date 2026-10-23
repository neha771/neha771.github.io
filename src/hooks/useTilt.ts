import { useEffect, useRef } from 'react';

/**
 * Pointer-follow 3D tilt with a moving glare. Writes --rx, --ry, --gx, --gy on the
 * element so CSS can rotate an inner layer; the element itself never moves, so the
 * hit area stays stable. Disabled for touch and reduced-motion users.
 */
export function useTilt<T extends HTMLElement>(enabled = true, maxDeg = 10) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${((0.5 - y) * maxDeg).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${((x - 0.5) * maxDeg * 1.3).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      el.classList.add('tilting');
    };
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.classList.remove('tilting');
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, maxDeg]);

  return ref;
}
