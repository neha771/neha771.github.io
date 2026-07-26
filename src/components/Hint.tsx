import { useEffect, useState } from 'react';

export function Hint() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 5600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`hint${gone ? ' gone' : ''}`}>
      <span className="k">drag</span> things around <span style={{ color: 'var(--ink-soft)' }}>·</span>{' '}
      <span className="k">click</span> to open ✦
    </div>
  );
}
