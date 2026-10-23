/** Bougainvillea mark: four bracts around a small flower, with an "N" at the centre. */
export function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <g fill="currentColor">
        {[0, 90, 180, 270].map((r) => (
          <path key={r} transform={`rotate(${r} 32 32)`} d="M32 30C24 26 20 16 26 8c3 6 9 8 6 22z" />
        ))}
      </g>
      <circle cx="32" cy="32" r="11" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
      <text x="32" y="37" textAnchor="middle" fontFamily="Unbounded, sans-serif" fontWeight="800" fontSize="13" fill="currentColor">
        N
      </text>
    </svg>
  );
}
