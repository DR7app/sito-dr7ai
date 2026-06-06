import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'neon';
  showSubText?: boolean;
}

export default function BrandLogo({ className = 'h-12', variant = 'neon', showSubText = true }: BrandLogoProps) {
  // Glow filter and gradients definitions are embedded in the SVG
  return (
    <div className={`flex flex-col items-center justify-center select-none ${variant === 'dark' ? 'text-slate-900' : 'text-white'}`}>
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 320 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow effect for neon lines */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Brain circuit glow */}
            <filter id="glow-bright" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.0   0 0 0 0 0.78  0 0 0 0 1.0  0 0 0 1.2 0" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient for standard elements */}
            <linearGradient id="primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" /> {/* sky-400 */}
              <stop offset="100%" stopColor="#00C884" /> {/* brand green */}
            </linearGradient>

            <linearGradient id="neon-blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#00C884" />
            </linearGradient>
            
            <linearGradient id="brain-grad-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#005B94" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <linearGradient id="brain-grad-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#00C884" />
            </linearGradient>
          </defs>

          {/* BACKGROUND SYSTEM GRID (Extremely subtle) */}
          <g opacity="0.06">
            <line x1="10" y1="60" x2="310" y2="60" stroke="#00C884" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="160" cy="50" r="40" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="2 2" />
          </g>

          {/* 1. THE BRAIN SHAPE AND CIRCUITS (Center Left / Center) */}
          {/* Left Brain - Soft Organic Curves (reconstructed abstractly in SVG) */}
          <g transform="translate(68, 15)">
            {/* Outer lobe shape with gradient */}
            <path
              d="M38,45 C28,45 20,40 20,30 C20,18 30,12 42,12 C44,12 48,13 50,15 C52,10 58,6 66,6 C76,6 80,12 82,18 C86,17 92,18 95,23 C98,28 96,36 91,40 C89,42 86,43 84,43"
              stroke="url(#brain-grad-left)"
              strokeWidth="2.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            {/* Internal gyri (brain folds) */}
            <path
              d="M36,30 C30,30 28,26 30,22 C32,20 38,22 42,24 M46,16 C48,22 42,26 44,32 M66,10 C62,18 56,20 54,28 M64,28 C68,22 75,22 78,16"
              stroke="#0284C7"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.65"
            />

            {/* Right Brain - Cybernetic Tech Circuits */}
            <g transform="translate(48, 0)" opacity="0.95">
              {/* Vertical trunk line */}
              <line x1="38" y1="8" x2="38" y2="48" stroke="url(#brain-grad-right)" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Circuit paths branching out */}
              <path
                d="M38,12 L56,12 L64,18 L76,18 M38,24 L50,24 L56,30 L68,30 M38,36 L44,36 L50,42 L66,42 M38,44 L54,44 L60,48"
                stroke="url(#brain-grad-right)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              
              {/* Node points (with glow filters) */}
              <circle cx="76" cy="18" r="3.5" fill="#00C884" filter="url(#glow)" />
              <circle cx="68" cy="30" r="3.2" fill="#38BDF8" filter="url(#glow)" />
              <circle cx="66" cy="42" r="3" fill="#00C884" />
              <circle cx="60" cy="48" r="2.5" fill="#38BDF8" />
              <circle cx="56" cy="12" r="2" fill="#0284C7" />
              <circle cx="50" cy="24" r="2" fill="#0284C7" />
            </g>
          </g>

          {/* 2. THE HEARTBEAT ECG / EKG PULSE WAVE (Symmetrical through the middle) */}
          <path
            d="M 12 60 L 98 60 L 105 52 L 112 68 L 120 20 L 128 85 L 135 60 L 142 60 L 148 50 L 154 72 L 159 60 L 176 60 L 182 32 L 188 78 L 194 60 L 210 60 C 220 60 230 60 308 60"
            stroke="url(#neon-blue-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow)"
          />
          
          {/* Glowing particle traveler on ECG line */}
          <circle cx="120" cy="20" r="3" fill="#FFFFFF" filter="url(#glow)" />
          <circle cx="182" cy="32" r="2.5" fill="#FFFFFF" />

          {/* 3. LOGO TYPOGRAPHY TEXT (Middle Bottom) */}
          <g transform="translate(160, 92)" textAnchor="middle">
            {/* "DR7" Big text with futuristic spacing */}
            <text
              x="0"
              y="0"
              fill="url(#primary-grad)"
              fontSize="24"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="7"
              className="tracking-widest"
              filter="url(#glow-bright)"
              opacity="0.95"
            >
              DR7
            </text>
            
            {/* The dot indicator and AI separator */}
            <text
              x="52"
              y="-1"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              fontFamily="monospace"
              opacity="0.8"
            >
              A.I.
            </text>

            {/* Flat white shadow replica for crisp printing */}
            <text
              x="0"
              y="0"
              fill="#FFFFFF"
              fontSize="24"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="7"
              className="tracking-widest"
              opacity="0.3"
            >
              DR7
            </text>
          </g>
        </svg>
      </div>

      {/* 4. UNDERSTATED FOOTER BRAND SLOGAN PROMPT DIRECTIVE */}
      {showSubText && (
        <div className="flex flex-col items-center mt-1.5 space-y-1">
          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#00C884] font-bold text-center">
            INTELLIGENZA • CONTROLLO • RISULTATI
          </span>
        </div>
      )}
    </div>
  );
}
