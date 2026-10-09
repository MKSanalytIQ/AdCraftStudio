import React from 'react';

interface ProductArtworkProps {
  type?: 'headphones' | 'smartwatch' | 'skincare' | 'sneakers' | 'chair' | 'custom';
  imageUrl?: string;
  className?: string;
  primaryColor?: string;
  accentColor?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  type = 'headphones',
  imageUrl,
  className = 'w-full h-full object-contain',
  primaryColor = '#38bdf8',
  accentColor = '#60a5fa',
}) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt="Product visual"
        referrerPolicy="no-referrer"
        className={className}
      />
    );
  }

  // High-fidelity scalable vector artwork for presets
  switch (type) {
    case 'headphones':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="hp-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hp-headband" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="hp-metal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
            <linearGradient id="hp-cushion" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <filter id="hp-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Ambient glow behind product */}
          <circle cx="200" cy="200" r="160" fill="url(#hp-glow)" />

          {/* Pedestal / Ground reflection */}
          <ellipse cx="200" cy="330" rx="140" ry="24" fill="#030712" opacity="0.8" />
          <ellipse cx="200" cy="326" rx="100" ry="12" fill={primaryColor} opacity="0.25" />

          <g filter="url(#hp-shadow)">
            {/* Outer Headband Arc */}
            <path
              d="M 100 220 C 100 90, 300 90, 300 220"
              stroke="url(#hp-headband)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Headband Inner Cushion */}
            <path
              d="M 125 180 C 125 110, 275 110, 275 180"
              stroke="#0f172a"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Left Fork / Hinge */}
            <path d="M 100 210 L 100 240" stroke="url(#hp-metal)" strokeWidth="8" strokeLinecap="round" />
            {/* Right Fork / Hinge */}
            <path d="M 300 210 L 300 240" stroke="url(#hp-metal)" strokeWidth="8" strokeLinecap="round" />

            {/* Left Ear Cup */}
            <g transform="rotate(-6 100 250)">
              {/* Outer chassis */}
              <ellipse cx="100" cy="250" rx="42" ry="62" fill="#1e293b" stroke="#334155" strokeWidth="3" />
              {/* Accent metallic ring */}
              <ellipse cx="100" cy="250" rx="36" ry="54" fill="none" stroke="url(#hp-metal)" strokeWidth="3.5" />
              {/* Center disc */}
              <circle cx="100" cy="250" r="24" fill="#0f172a" />
              <circle cx="100" cy="250" r="8" fill={primaryColor} opacity="0.9" />
              <circle cx="97" cy="247" r="2.5" fill="#ffffff" />
            </g>

            {/* Right Ear Cup */}
            <g transform="rotate(6 300 250)">
              {/* Outer chassis */}
              <ellipse cx="300" cy="250" rx="42" ry="62" fill="#1e293b" stroke="#334155" strokeWidth="3" />
              {/* Accent metallic ring */}
              <ellipse cx="300" cy="250" rx="36" ry="54" fill="none" stroke="url(#hp-metal)" strokeWidth="3.5" />
              {/* Center disc */}
              <circle cx="300" cy="250" r="24" fill="#0f172a" />
              <circle cx="300" cy="250" r="8" fill={primaryColor} opacity="0.9" />
              <circle cx="297" cy="247" r="2.5" fill="#ffffff" />
            </g>
          </g>

          {/* Sound wave accents */}
          <path d="M 360 220 Q 380 250 360 280" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M 40 220 Q 20 250 40 280" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'smartwatch':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sw-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.45" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sw-titanium" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="sw-screen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="sw-strap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="sw-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.7" />
            </filter>
          </defs>

          <circle cx="200" cy="200" r="160" fill="url(#sw-glow)" />
          <ellipse cx="200" cy="350" rx="120" ry="20" fill="#000000" opacity="0.6" />

          <g filter="url(#sw-shadow)">
            {/* Top Strap */}
            <path d="M 152 40 L 248 40 L 240 130 L 160 130 Z" fill="url(#sw-strap)" />
            {/* Strap ribbing lines */}
            <line x1="162" y1="70" x2="238" y2="70" stroke="#334155" strokeWidth="2" />
            <line x1="160" y1="95" x2="240" y2="95" stroke="#334155" strokeWidth="2" />

            {/* Bottom Strap */}
            <path d="M 160 270 L 240 270 L 248 360 L 152 360 Z" fill="url(#sw-strap)" />
            <line x1="160" y1="305" x2="240" y2="305" stroke="#334155" strokeWidth="2" />
            <line x1="162" y1="330" x2="238" y2="330" stroke="#334155" strokeWidth="2" />

            {/* Titanium Chassis */}
            <rect x="130" y="125" width="140" height="150" rx="36" fill="url(#sw-titanium)" stroke="#cbd5e1" strokeWidth="2" />

            {/* Digital Crown */}
            <rect x="270" y="165" width="10" height="34" rx="4" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="270" y="215" width="8" height="24" rx="3" fill="#64748b" />

            {/* Bezel Ring */}
            <rect x="138" y="133" width="124" height="134" rx="30" fill="#0f172a" stroke="#1e293b" strokeWidth="3" />

            {/* OLED Display */}
            <rect x="144" y="139" width="112" height="122" rx="26" fill="url(#sw-screen)" />

            {/* UI Display: Time */}
            <text x="200" y="186" textAnchor="middle" fill="#ffffff" fontSize="32" fontWeight="800" fontFamily="sans-serif">
              10:42
            </text>
            <text x="200" y="202" textAnchor="middle" fill={accentColor} fontSize="11" fontWeight="700" letterSpacing="1">
              FRI OCT 09
            </text>

            {/* Heart Rate / Health Rings */}
            <circle cx="175" cy="232" r="14" stroke="#334155" strokeWidth="3.5" fill="none" />
            <path d="M 175 218 A 14 14 0 1 1 163 238" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <text x="175" y="235" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700">84</text>

            {/* Calorie ring */}
            <circle cx="225" cy="232" r="14" stroke="#334155" strokeWidth="3.5" fill="none" />
            <path d="M 225 218 A 14 14 0 1 1 237 236" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <text x="225" y="235" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700">720k</text>
          </g>
        </svg>
      );

    case 'skincare':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sk-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sk-amber" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="40%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="sk-dropper" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="sk-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="22" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>

          <circle cx="200" cy="220" r="150" fill="url(#sk-glow)" />
          {/* Marble pedestal */}
          <ellipse cx="200" cy="340" rx="130" ry="26" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
          <ellipse cx="200" cy="336" rx="90" ry="12" fill={accentColor} opacity="0.3" />

          {/* Plant leaf in background */}
          <path
            d="M 110 320 Q 90 200 150 140 Q 180 220 140 320"
            fill="#14532d"
            opacity="0.75"
          />
          <path d="M 125 240 L 140 320" stroke="#22c55e" strokeWidth="1.5" opacity="0.6" />

          <g filter="url(#sk-shadow)">
            {/* Rubber Bulb Top */}
            <ellipse cx="200" cy="65" rx="20" ry="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Dropper Cap (Metallic Gold) */}
            <rect x="178" y="90" width="44" height="28" rx="4" fill="url(#sk-dropper)" stroke="#94a3b8" strokeWidth="1" />
            <line x1="178" y1="102" x2="222" y2="102" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Amber Glass Neck */}
            <rect x="184" y="118" width="32" height="18" fill="#78350f" />

            {/* Amber Glass Main Bottle */}
            <path
              d="M 184 136 C 160 146, 148 165, 148 195 L 148 310 C 148 325, 160 330, 200 330 C 240 330, 252 325, 252 310 L 252 195 C 252 165, 240 146, 216 136 Z"
              fill="url(#sk-amber)"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />

            {/* Bottle Inner Glow / Liquid Fill */}
            <path
              d="M 154 210 L 246 210 L 246 308 C 246 318, 238 324, 200 324 C 162 324, 154 318, 154 308 Z"
              fill="#fbbf24"
              opacity="0.3"
            />

            {/* Luxe Label */}
            <rect x="162" y="210" width="76" height="85" rx="3" fill="#fefce8" stroke="#d4af37" strokeWidth="1" />
            <text x="200" y="235" textAnchor="middle" fill="#1c1917" fontSize="9" fontWeight="800" fontFamily="serif" letterSpacing="1">
              BOTANICA
            </text>
            <text x="200" y="248" textAnchor="middle" fill="#78350f" fontSize="7" fontWeight="600" letterSpacing="0.5">
              CELL-LUXE
            </text>
            <line x1="175" y1="256" x2="225" y2="256" stroke="#d97706" strokeWidth="0.8" />
            <text x="200" y="268" textAnchor="middle" fill="#92400e" fontSize="6" fontWeight="600">
              GLOW SERUM
            </text>
            <text x="200" y="284" textAnchor="middle" fill="#a16207" fontSize="5.5" fontWeight="500">
              30ml · 1.0 fl oz
            </text>

            {/* Glass highlight glare */}
            <path
              d="M 154 185 L 154 300 C 154 305, 158 310, 162 312 L 162 182 Z"
              fill="#ffffff"
              opacity="0.4"
            />
          </g>
        </svg>
      );

    case 'sneakers':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sn-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="sn-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="60%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
            <linearGradient id="sn-sole" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <filter id="sn-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="20" stdDeviation="20" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>

          <circle cx="200" cy="200" r="150" fill="url(#sn-glow)" />
          {/* Ground reflection shadow */}
          <ellipse cx="200" cy="330" rx="140" ry="20" fill="#000000" opacity="0.6" />

          {/* Speed particles */}
          <line x1="60" y1="180" x2="100" y2="180" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <line x1="40" y1="220" x2="90" y2="220" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          <line x1="70" y1="250" x2="110" y2="250" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          <g filter="url(#sn-shadow)" transform="rotate(-8 200 220)">
            {/* Thick Supercritical Foam Sole */}
            <path
              d="M 90 250 C 130 255, 270 255, 330 230 C 335 240, 325 270, 310 275 C 250 285, 140 285, 80 270 C 75 258, 80 252, 90 250 Z"
              fill="url(#sn-sole)"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {/* Carbon plate line inside sole */}
            <path
              d="M 95 264 C 150 268, 250 268, 320 248"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Sneaker Upper Body */}
            <path
              d="M 90 250 C 95 210, 130 190, 170 175 C 200 165, 230 145, 255 170 C 275 190, 305 210, 330 230 C 300 240, 160 248, 90 250 Z"
              fill="url(#sn-body)"
            />

            {/* Aerodynamic Swoop / Mesh Pattern */}
            <path
              d="M 120 240 C 160 210, 240 180, 290 215"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 140 245 C 175 220, 230 200, 270 225"
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Lacing system */}
            <line x1="215" y1="172" x2="235" y2="182" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="225" y1="184" x2="245" y2="194" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="235" y1="196" x2="255" y2="206" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

            {/* Heel Collar */}
            <path
              d="M 165 176 C 160 160, 170 152, 185 160 L 195 170"
              stroke="#0f172a"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      );

    case 'chair':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="ch-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ch-frame" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <filter id="ch-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000000" floodOpacity="0.6" />
            </filter>
          </defs>

          <circle cx="200" cy="200" r="150" fill="url(#ch-glow)" />
          <ellipse cx="200" cy="350" rx="130" ry="20" fill="#000000" opacity="0.6" />

          <g filter="url(#ch-shadow)">
            {/* 5-Star Aluminum Base */}
            <path d="M 200 320 L 130 345 M 200 320 L 270 345 M 200 320 L 160 355 M 200 320 L 240 355 M 200 320 L 200 360" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            {/* Casters / Wheels */}
            <circle cx="130" cy="348" r="5" fill="#334155" />
            <circle cx="270" cy="348" r="5" fill="#334155" />
            <circle cx="160" cy="358" r="5" fill="#334155" />
            <circle cx="240" cy="358" r="5" fill="#334155" />
            <circle cx="200" cy="363" r="5" fill="#334155" />

            {/* Pneumatic Cylinder */}
            <rect x="194" y="275" width="12" height="48" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />

            {/* Seat Pan */}
            <path
              d="M 130 245 C 130 235, 160 230, 200 230 C 240 230, 270 235, 270 245 C 270 260, 240 265, 200 265 C 160 265, 130 260, 130 245 Z"
              fill="url(#ch-frame)"
              stroke={primaryColor}
              strokeWidth="2"
            />

            {/* Mesh High Backrest */}
            <path
              d="M 150 90 C 150 75, 250 75, 250 90 L 245 225 C 235 230, 165 230, 155 225 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="3"
            />
            {/* Backrest mesh lines */}
            <line x1="165" y1="110" x2="235" y2="110" stroke="#334155" strokeWidth="1.5" />
            <line x1="162" y1="135" x2="238" y2="135" stroke="#334155" strokeWidth="1.5" />
            <line x1="160" y1="160" x2="240" y2="160" stroke="#334155" strokeWidth="1.5" />
            <line x1="158" y1="185" x2="242" y2="185" stroke="#334155" strokeWidth="1.5" />

            {/* Dynamic Lumbar Support */}
            <path
              d="M 160 175 C 180 185, 220 185, 240 175"
              stroke={primaryColor}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Headrest */}
            <rect x="175" y="55" width="50" height="26" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />

            {/* Left 4D Armrest */}
            <path d="M 130 240 L 125 180 L 145 180" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Right 4D Armrest */}
            <path d="M 270 240 L 275 180 L 255 180" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      );

    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-700/50">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs text-slate-400 font-medium">Studio Product</span>
        </div>
      );
  }
};
