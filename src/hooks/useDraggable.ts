import { useEffect, useRef } from 'react';

interface UseDraggableOptions {
  /** Fired when a pointerdown+up sequence moves less than the tap threshold. */
  onTap?: () => void;
  /** Called on drag start to obtain the z-index to raise the target to. */
  getZIndex?: () => number;
  /** Return false to ignore this pointerdown (e.g. clicks on window traffic-lights). */
  shouldStart?: (e: PointerEvent) => boolean;
  tapThreshold?: number;
  /** Fired with the final left/top (px) after an actual drag (not a tap). */
  onDragEnd?: (pos: { left: number; top: number }) => void;
}

/**
 * Ports the original vanilla-JS makeDrag()/dragWin() behavior: pointer-based
 * drag with a tap-vs-drag threshold, disabled below the 860px mobile breakpoint.
 * `handleRef` is where the pointerdown listener attaches; `targetRef` is what
 * gets repositioned (they're the same element for desktop items, but different
 * for the window — the bar is the handle, the window is the target).
 */
export function useDraggable<H extends HTMLElement = HTMLElement, T extends HTMLElement = H>(
  options: UseDraggableOptions = {}
) {
  const { onTap, getZIndex, shouldStart, tapThreshold = 7, onDragEnd } = options;
  const handleRef = useRef<H>(null);
  const targetRef = useRef<T>(null);
  const optionsRef = useRef(options);
  optionsRef.current = { onTap, getZIndex, shouldStart, tapThreshold, onDragEnd };

  useEffect(() => {
    const handle = handleRef.current;
    const target = targetRef.current ?? (handleRef.current as unknown as T);
    if (!handle || !target) return;

    let sx = 0, sy = 0, ox = 0, oy = 0, moved = 0, active = false;

    const onPointerDown = (e: PointerEvent) => {
      const opts = optionsRef.current;
      if (opts.shouldStart && !opts.shouldStart(e)) return;
      active = true;
      moved = 0;
      sx = e.clientX;
      sy = e.clientY;
      ox = parseFloat(target.style.left) || target.offsetLeft;
      oy = parseFloat(target.style.top) || target.offsetTop;
      if (opts.getZIndex) target.style.zIndex = String(opts.getZIndex());
      handle.classList.add('grabbing');

      const onMove = (ev: PointerEvent) => {
        if (!active) return;
        if (window.innerWidth <= 860) return;
        const dx = ev.clientX - sx;
        const dy = ev.clientY - sy;
        moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
        target.style.left = `${ox + dx}px`;
        target.style.top = `${oy + dy}px`;
      };
      const onUp = () => {
        active = false;
        handle.classList.remove('grabbing');
        target.dataset.moved = '1';
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
        const threshold = opts.tapThreshold ?? 7;
        if (moved < threshold && opts.onTap) opts.onTap();
        else if (moved >= threshold && opts.onDragEnd) {
          opts.onDragEnd({ left: parseFloat(target.style.left) || 0, top: parseFloat(target.style.top) || 0 });
        }
      };
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    };

    handle.addEventListener('pointerdown', onPointerDown);
    return () => handle.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return { handleRef, targetRef };
}
