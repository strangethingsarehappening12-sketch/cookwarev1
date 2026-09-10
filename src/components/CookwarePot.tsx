export default function CookwarePot({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 260"
      className={`animate-wobble ${className}`}
      role="img"
      aria-label="Illustration of a cooking pot, the Cookware mascot"
    >
      {/* steam */}
      <path
        d="M120 40c-8 12 8 18 0 30M160 30c-8 12 8 18 0 30M200 40c-8 12 8 18 0 30"
        stroke="#141311"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* handles */}
      <rect x="20" y="120" width="42" height="16" rx="8" fill="#141311" />
      <rect x="258" y="120" width="42" height="16" rx="8" fill="#141311" />
      {/* pot body */}
      <path
        d="M58 120h204v40c0 44-46 80-102 80S58 204 58 164v-44z"
        fill="#E8560F"
        stroke="#141311"
        strokeWidth="6"
      />
      {/* lid */}
      <rect x="50" y="104" width="220" height="20" rx="10" fill="#141311" />
      <rect x="150" y="82" width="20" height="22" rx="6" fill="#141311" />
      {/* shine */}
      <path
        d="M84 140c0 30 20 56 48 66"
        stroke="#F7F3EA"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
    </svg>
  )
}
