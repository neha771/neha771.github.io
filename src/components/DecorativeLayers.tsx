import { useMemo } from 'react';

export function DecorativeLayers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        left: `${Math.random() * 100}vw`,
        duration: `${14 + Math.random() * 16}s`,
        delay: `${-Math.random() * 30}s`,
      })),
    []
  );

  return (
    <>
      <div className="grid-tex" />
      <div className="orbs">
        <div className="orb a" />
        <div className="orb b" />
        <div className="orb c" />
      </div>
      <div className="embers" id="embers">
        {embers.map((e, i) => (
          <div
            key={i}
            className="ember"
            style={{ left: e.left, bottom: '-10px', animationDuration: e.duration, animationDelay: e.delay, opacity: 0 }}
          />
        ))}
      </div>
      <div className="vignette" />
    </>
  );
}
