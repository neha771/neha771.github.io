const CHARS = ['✦', '✧', '⭑', '❋', '✺'];

export function burst(px: number, py: number) {
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'pop';
    p.textContent = CHARS[i % CHARS.length];
    p.style.cssText = `left:${px}px;top:${py}px;font-size:${12 + Math.random() * 14}px;color:hsl(${42 + Math.random() * 20},65%,${60 + Math.random() * 12}%)`;
    const a = Math.random() * Math.PI * 2;
    const d = 45 + Math.random() * 65;
    p.animate(
      [
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 28}px) scale(.2)`, opacity: 0 },
      ],
      { duration: 820, easing: 'ease-out' }
    );
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 820);
  }
}
