export function LogoMark({ className = "h-9 w-9", id = "hdr" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`sRibbon-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EF4444" />
          <stop offset="0.5" stopColor="#DC2626" />
          <stop offset="1" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      <path
        d="M35.5 11.5 C35.5 9.5 33.2 8 30 8 L19.5 8 C15 8 11.5 11.2 11.5 15.5 C11.5 19.6 14.6 21.9 19.4 23 L28.2 25 C33.4 26.2 36.5 29 36.5 33.4 C36.5 38.8 32.2 42 26.6 42 L17.8 42 C14.6 42 12.4 40.4 12.4 38.2"
        fill="none"
        stroke={`url(#sRibbon-${id})`}
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <path
        d="M35.5 11.5 C35.5 9.5 33.2 8 30 8 L19.5 8 C15 8 11.5 11.2 11.5 15.5"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ light = true, className = "" }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" id={light ? "d" : "l"} />
      <span className="leading-none">
        <span
          className={`block font-display text-[15px] font-extrabold tracking-tight ${
            light ? "text-white" : "text-slate-900"
          }`}
        >
          SAACHI INFOSOFT
        </span>
        <span
          className={`mt-1 block text-[8.5px] font-semibold uppercase tracking-[0.42em] ${
            light ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Technologies
        </span>
      </span>
    </span>
  );
}
