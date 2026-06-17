"use client";

export default function RootLoading() {
  const ringColors = ["#4A70A9", "#8fabd4", "#bbd5da", "#EFECE3", "#4A70A9", "#8fabd4"];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f5f5f5]"
      aria-busy
      aria-label="Loading Aurelio…"
    >
      <div className="relative size-28" aria-hidden>
        {/* Plate ring */}
        <svg
          viewBox="0 0 112 112"
          className="absolute inset-0 size-full"
          fill="none"
          style={{ animation: "au-plate-spin 2.4s linear infinite" }}
        >
          <circle cx="56" cy="56" r="48" stroke="rgba(187,213,218,0.4)" strokeWidth="1.5" />
          <circle
            cx="56" cy="56" r="48"
            stroke="url(#plate-grad-light)"
            strokeWidth="1.5"
            strokeDasharray="90 220"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="plate-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A70A9" />
              <stop offset="50%" stopColor="#8fabd4" />
              <stop offset="100%" stopColor="#EFECE3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbital dots */}
        {ringColors.map((c, i) => {
          const angle = (i / ringColors.length) * 360;
          const rad = (angle * Math.PI) / 180;
          const r = 40;
          const cx = 56 + r * Math.cos(rad);
          const cy = 56 + r * Math.sin(rad);
          return (
            <span
              key={i}
              className="absolute size-2.5 rounded-full"
              style={{
                background: c,
                top: `${cy - 5}px`,
                left: `${cx - 5}px`,
                animation: `au-dot-pulse 1.8s ease-in-out ${i * 0.12}s infinite`,
                boxShadow: `0 0 6px ${c}88`,
              }}
            />
          );
        })}

        {/* Fork center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 28 36" width="28" height="36" fill="none" className="opacity-60">
            <path d="M 6 3 L 6 15 M 6 15 C 6 19, 10 19, 10 15 L 10 3"
              stroke="#8fabd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 8 15 L 8 33" stroke="#8fabd4" strokeWidth="2" strokeLinecap="round" />
            <path d="M 20 3 L 20 33" stroke="#4A70A9" strokeWidth="2" strokeLinecap="round" />
            <path d="M 20 3 C 25 3, 27 8, 25 13 C 23 17, 20 17, 20 17"
              stroke="#4A70A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p className="mt-8 font-heading text-[1.6rem] tracking-[0.28em] text-foreground"
        style={{ animation: "au-fade-up 0.8s ease-out 0.3s both" }}>
        AURELIO
      </p>
      <p className="mt-1 text-[0.58rem] uppercase tracking-[0.5em] text-muted-foreground"
        style={{ animation: "au-fade-up 0.8s ease-out 0.55s both" }}>
        Chennai · Iyyappanthangal
      </p>

      <style>{`
        @keyframes au-plate-spin { to { transform: rotate(360deg); } }
        @keyframes au-dot-pulse {
          0%,100% { opacity: 0.3; transform: scale(0.75); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes au-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
