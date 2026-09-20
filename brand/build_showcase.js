const fs = require('fs');
const path = require('path');

console.log('Generating Tashqariga Master Brand Showcase HTML...');

// Let's create helper generators for rich inline SVGs
const SVG = {
  // Master Emblem
  emblem: (fg = '#F7F9F6', north = '#FF5E1E', south = '#92C2AB', size = 'w-12 h-12', shadow = true) => `
    <svg class="${size} inline-block select-none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="needleNorthGrad" x1="56" y1="54" x2="84" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${north}" />
          <stop offset="100%" stop-color="#FF873A" />
        </linearGradient>
      </defs>
      <!-- Mountain Left Summit (Peak 1) & Right Ridge (Peak 2) -->
      <path d="M14 84 L46 22 L66 54 L80 34 L92 84 Z" fill="${fg}" opacity="0.95"/>
      <!-- Shaded Facets on right of peaks -->
      <path d="M46 22 L66 54 L52 84 L38 84 Z" fill="#000000" opacity="0.2"/>
      <path d="M80 34 L92 84 L82 84 Z" fill="#000000" opacity="0.25"/>
      <!-- Dynamic 45-degree Compass Needle -->
      <polygon points="56,54 48,49 84,18 63,62" fill="url(#needleNorthGrad)"/>
      <polygon points="56,54 63,62 28,88 48,49" fill="${south}"/>
      <!-- Center Pivot Pin -->
      <circle cx="56" cy="54" r="3.8" fill="#183B2B"/>
      <circle cx="56" cy="54" r="1.6" fill="#F7F9F6"/>
    </svg>`,

  // Topographic pattern generator
  contourBg: `
    <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <pattern id="contourPattern" width="600" height="600" patternUnits="userSpaceOnUse">
        <path d="M0 100 C 150 70, 300 140, 450 100 C 520 80, 580 120, 600 110" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="6 4"/>
        <path d="M0 200 C 120 180, 250 240, 400 190 C 500 160, 560 210, 600 200" fill="none" stroke="currentColor" stroke-width="1.2"/>
        <path d="M0 300 C 180 260, 320 330, 480 290 C 550 270, 580 310, 600 300" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="10 5"/>
        <path d="M0 400 C 140 370, 280 430, 430 380 C 510 350, 570 390, 600 390" fill="none" stroke="currentColor" stroke-width="1.2"/>
        <path d="M0 500 C 160 480, 310 520, 470 480 C 530 460, 580 500, 600 490" fill="none" stroke="currentColor" stroke-width="1.2"/>
        <!-- Topo circles -->
        <ellipse cx="280" cy="240" rx="90" ry="50" fill="none" stroke="currentColor" stroke-width="1.2"/>
        <ellipse cx="280" cy="240" rx="60" ry="32" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>
        <ellipse cx="280" cy="240" rx="30" ry="16" fill="none" stroke="currentColor" stroke-width="1.2"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#contourPattern)" />
    </svg>`,

  // Enamel Camp Mug SVG
  campMug: `
    <svg class="w-full max-w-sm mx-auto drop-shadow-2xl select-none" viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mugBodyGrad" x1="80" y1="60" x2="260" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1F4C37" />
          <stop offset="60%" stop-color="#183B2B" />
          <stop offset="100%" stop-color="#0E241B" />
        </linearGradient>
        <linearGradient id="rimGrad" x1="60" y1="40" x2="260" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FF873A" />
          <stop offset="100%" stop-color="#FF5E1E" />
        </linearGradient>
        <radialGradient id="speckle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Mug Drop Shadow -->
      <ellipse cx="160" cy="245" rx="80" ry="14" fill="#000000" opacity="0.25"/>
      <!-- Metal Handle -->
      <path d="M 230 90 C 290 90, 305 185, 230 195 C 220 195, 220 180, 230 180 C 275 175, 265 105, 230 105 Z" fill="#DCEEE4" stroke="#183B2B" stroke-width="2"/>
      <!-- Mug Body -->
      <rect x="75" y="55" width="165" height="175" rx="14" fill="url(#mugBodyGrad)" stroke="#122B20" stroke-width="3"/>
      <!-- Speckled Enamel Texture overlay -->
      <rect x="75" y="55" width="165" height="175" rx="14" fill="url(#speckle)" opacity="0.6"/>
      <!-- Adventure Orange Rolled Lip -->
      <rect x="70" y="48" width="175" height="12" rx="6" fill="url(#rimGrad)" stroke="#D64810" stroke-width="1.5"/>
      <!-- Stainless steel lip highlight -->
      <rect x="73" y="50" width="169" height="2" rx="1" fill="#FFF5ED" opacity="0.6"/>
      <!-- Mug Front Graphic: Tashqariga Emblem -->
      <g transform="translate(132, 95) scale(0.55)">
        <path d="M14 84 L46 22 L66 54 L80 34 L92 84 Z" fill="#F7F9F6" opacity="0.95"/>
        <polygon points="56,54 48,49 84,18 63,62" fill="#FF5E1E"/>
        <polygon points="56,54 63,62 28,88 48,49" fill="#92C2AB"/>
        <circle cx="56" cy="54" r="3.8" fill="#183B2B"/>
        <circle cx="56" cy="54" r="1.6" fill="#F7F9F6"/>
      </g>
      <!-- Wordmark on Mug -->
      <text x="157" y="162" text-anchor="middle" fill="#F7F9F6" font-family="'Unbounded', sans-serif" font-weight="800" font-size="11" letter-spacing="1.5">TASHQARIGA</text>
      <text x="157" y="176" text-anchor="middle" fill="#92C2AB" font-family="'JetBrains Mono', monospace" font-weight="600" font-size="7" letter-spacing="1">CHIMGAN • 3309M</text>
      <!-- Bottom Curvature Highlight -->
      <path d="M 85 224 C 120 230, 195 230, 230 224" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2" fill="none"/>
    </svg>`,

  // 400 GSM Mountain Hoodie SVG
  hoodie: `
    <svg class="w-full max-w-sm mx-auto drop-shadow-2xl select-none" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hoodieGrad" x1="170" y1="20" x2="170" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1D4734"/>
          <stop offset="100%" stop-color="#143224"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="170" cy="285" rx="90" ry="10" fill="#000" opacity="0.2"/>
      <!-- Body & Sleeves -->
      <!-- Left Sleeve -->
      <path d="M 110 80 L 40 180 L 70 195 L 120 120 Z" fill="#183B2B" stroke="#122A1E" stroke-width="2"/>
      <!-- Right Sleeve (with Topo Print) -->
      <path d="M 230 80 L 300 180 L 270 195 L 220 120 Z" fill="#183B2B" stroke="#122A1E" stroke-width="2"/>
      <!-- Topo Sleeve Silk-screen Lines -->
      <path d="M 245 130 C 265 145, 275 160, 285 175" stroke="#F7F9F6" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
      <path d="M 252 120 C 270 140, 280 150, 292 168" stroke="#F7F9F6" stroke-width="1.5" opacity="0.7"/>
      <path d="M 238 140 C 255 155, 268 168, 278 182" stroke="#F7F9F6" stroke-width="1.5" opacity="0.5"/>
      <!-- Torso Body -->
      <path d="M 110 75 L 105 260 L 235 260 L 230 75 Z" fill="url(#hoodieGrad)" stroke="#122A1E" stroke-width="2"/>
      <!-- Ribbed Waist Hem -->
      <rect x="103" y="255" width="134" height="15" rx="3" fill="#132F22" stroke="#0E2319" stroke-width="1.5"/>
      <!-- Kangaroo Pocket -->
      <path d="M 125 195 L 140 165 L 200 165 L 215 195 L 215 245 L 125 245 Z" fill="#163829" stroke="#10281D" stroke-width="1.5"/>
      <!-- Hood -->
      <path d="M 130 65 C 130 25, 210 25, 210 65 C 210 85, 130 85, 130 65 Z" fill="#143425" stroke="#102A1E" stroke-width="2"/>
      <!-- Cream Drawstrings -->
      <path d="M 155 75 L 155 125" stroke="#F7F9F6" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="155" cy="126" r="2" fill="#FF5E1E"/>
      <path d="M 185 75 L 185 115" stroke="#F7F9F6" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="185" cy="116" r="2" fill="#FF5E1E"/>
      <!-- Chest Embroidery (Minimal Compass) -->
      <g transform="translate(142, 102) scale(0.25)">
        <polygon points="56,54 48,49 84,18 63,62" fill="#FF5E1E"/>
        <polygon points="56,54 63,62 28,88 48,49" fill="#F7F9F6"/>
        <circle cx="56" cy="54" r="3.5" fill="#183B2B"/>
      </g>
      <text x="168" y="112" fill="#F7F9F6" font-family="'Unbounded', sans-serif" font-weight="700" font-size="7" letter-spacing="1">tashqariga</text>
      <!-- Woven Hem Tag -->
      <rect x="228" y="248" width="12" height="6" fill="#FF5E1E" rx="1"/>
    </svg>`,

  // 5-Panel Cap SVG
  campCap: `
    <svg class="w-full max-w-sm mx-auto drop-shadow-2xl select-none" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shadow -->
      <ellipse cx="160" cy="205" rx="90" ry="10" fill="#000" opacity="0.2"/>
      <!-- Visor Brim -->
      <path d="M 80 160 C 90 190, 230 190, 240 160 C 210 150, 110 150, 80 160 Z" fill="#153626" stroke="#0E241A" stroke-width="2"/>
      <!-- Orange underside edge -->
      <path d="M 82 163 C 110 185, 210 185, 238 163" stroke="#FF5E1E" stroke-width="2.5" fill="none"/>
      <!-- 5-Panel Crown -->
      <path d="M 95 155 C 95 80, 225 80, 225 155 Z" fill="#183B2B" stroke="#10281D" stroke-width="2"/>
      <!-- Corduroy vertical ribs -->
      <line x1="120" y1="95" x2="115" y2="155" stroke="#224E3A" stroke-width="1.2"/>
      <line x1="140" y1="85" x2="138" y2="155" stroke="#224E3A" stroke-width="1.2"/>
      <line x1="160" y1="82" x2="160" y2="155" stroke="#224E3A" stroke-width="1.2"/>
      <line x1="180" y1="85" x2="182" y2="155" stroke="#224E3A" stroke-width="1.2"/>
      <line x1="200" y1="95" x2="205" y2="155" stroke="#224E3A" stroke-width="1.2"/>
      <!-- Front Genuine Leather Stamped Patch -->
      <rect x="135" y="112" width="50" height="34" rx="4" fill="#A26B3E" stroke="#7A4E2B" stroke-width="1.5"/>
      <!-- Stitching around patch -->
      <rect x="137" y="114" width="46" height="30" rx="3" fill="none" stroke="#684122" stroke-width="1" stroke-dasharray="2 2"/>
      <!-- Debossed Logo inside patch -->
      <g transform="translate(150, 118) scale(0.2)">
        <path d="M14 84 L46 22 L66 54 L80 34 L92 84 Z" fill="#422513"/>
        <polygon points="56,54 48,49 84,18 63,62" fill="#5A341A"/>
      </g>
      <text x="160" y="141" text-anchor="middle" fill="#422513" font-family="'Unbounded', sans-serif" font-weight="800" font-size="5" letter-spacing="1">TASHQARIGA</text>
      <!-- Antique Brass Eyelets -->
      <circle cx="112" cy="130" r="3" fill="#8C7348" stroke="#544428" stroke-width="1"/>
      <circle cx="208" cy="130" r="3" fill="#8C7348" stroke="#544428" stroke-width="1"/>
    </svg>`,

  // Expedition 4x4 Off-Road Van Livery SVG
  expeditionVan: `
    <svg class="w-full drop-shadow-2xl select-none" viewBox="0 0 680 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vanPaint" x1="100" y1="80" x2="580" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1D4A36"/>
          <stop offset="100%" stop-color="#143325"/>
        </linearGradient>
      </defs>
      <!-- Shadow -->
      <ellipse cx="340" cy="275" rx="270" ry="12" fill="#000" opacity="0.3"/>
      <!-- Heavy Duty Roof Rack & Tent -->
      <rect x="180" y="55" width="310" height="24" rx="4" fill="#1E2322" stroke="#000" stroke-width="2"/>
      <rect x="200" y="44" width="220" height="14" rx="3" fill="#3A4644"/>
      <!-- Orange recovery traction boards mounted on roof -->
      <rect x="230" y="47" width="70" height="6" rx="2" fill="#FF5E1E"/>
      <rect x="310" y="47" width="70" height="6" rx="2" fill="#FF5E1E"/>
      <!-- Ladder on rear -->
      <line x1="160" y1="80" x2="160" y2="210" stroke="#1E2322" stroke-width="4"/>
      <line x1="150" y1="100" x2="170" y2="100" stroke="#1E2322" stroke-width="3"/>
      <line x1="150" y1="130" x2="170" y2="130" stroke="#1E2322" stroke-width="3"/>
      <line x1="150" y1="160" x2="170" y2="160" stroke="#1E2322" stroke-width="3"/>
      <line x1="150" y1="190" x2="170" y2="190" stroke="#1E2322" stroke-width="3"/>
      <!-- Main Van Body -->
      <path d="M 140 220 L 140 100 C 140 85, 170 75, 210 75 L 470 75 C 500 75, 540 100, 560 140 L 590 180 C 605 195, 605 220, 595 230 L 565 230 C 565 200, 520 200, 520 230 L 260 230 C 260 200, 215 200, 215 230 L 140 230 Z" fill="url(#vanPaint)" stroke="#0E2319" stroke-width="3"/>
      <!-- Windows with tint -->
      <path d="M 470 92 L 535 92 L 565 145 L 470 145 Z" fill="#0C1A14" stroke="#183B2B" stroke-width="2"/>
      <rect x="330" y="92" width="125" height="53" rx="4" fill="#0C1A14" stroke="#183B2B" stroke-width="2"/>
      <rect x="195" y="92" width="120" height="53" rx="4" fill="#0C1A14" stroke="#183B2B" stroke-width="2"/>
      <!-- Snorkel A-pillar -->
      <path d="M 545 75 L 545 150 L 565 150" stroke="#1E2322" stroke-width="6" stroke-linecap="round"/>
      <!-- Livery Graphic: Flowing Topographic Contour Lines -->
      <path d="M 150 170 C 220 160, 280 190, 360 170 C 420 155, 480 180, 560 170" stroke="#F7F9F6" stroke-width="2" stroke-dasharray="8 6" opacity="0.5"/>
      <path d="M 140 190 C 230 180, 300 215, 380 190 C 450 170, 500 205, 560 190" stroke="#F7F9F6" stroke-width="2" opacity="0.6"/>
      <path d="M 140 205 C 240 195, 320 230, 410 205 C 470 185, 520 220, 570 205" stroke="#92C2AB" stroke-width="1.5" opacity="0.5"/>
      <!-- Bold Brand Door Livery -->
      <g transform="translate(320, 162)">
        <rect x="0" y="0" width="145" height="28" rx="6" fill="#0E2319" opacity="0.8"/>
        <!-- Mini Logo -->
        <g transform="translate(6, 4) scale(0.22)">
          <path d="M14 84 L46 22 L66 54 L80 34 L92 84 Z" fill="#F7F9F6"/>
          <polygon points="56,54 48,49 84,18 63,62" fill="#FF5E1E"/>
          <polygon points="56,54 63,62 28,88 48,49" fill="#92C2AB"/>
        </g>
        <text x="32" y="16" fill="#F7F9F6" font-family="'Unbounded', sans-serif" font-weight="800" font-size="9" letter-spacing="1">tashqariga</text>
        <text x="110" y="16" fill="#FF5E1E" font-family="'Unbounded', sans-serif" font-weight="800" font-size="9">.uz</text>
        <text x="32" y="24" fill="#92C2AB" font-family="'JetBrains Mono', monospace" font-size="5" letter-spacing="1">EXPEDITION RIG #01</text>
      </g>
      <!-- Adventure Orange Tow Hook & Accent -->
      <circle cx="600" cy="225" r="5" fill="#FF5E1E" stroke="#000" stroke-width="2"/>
      <rect x="585" y="210" width="12" height="4" fill="#FF5E1E" rx="1"/>
      <!-- Headlights -->
      <polygon points="585,178 596,182 590,195 580,195" fill="#FFF5ED" opacity="0.9"/>
      <!-- Front Bullbar -->
      <path d="M 590 200 L 610 205 L 610 235 L 585 235" stroke="#1E2322" stroke-width="5" fill="none"/>
      <!-- Wheels & Heavy Mud Terrain Tires -->
      <!-- Rear Wheel -->
      <circle cx="237" cy="235" r="38" fill="#1E2322" stroke="#0C0F0E" stroke-width="4"/>
      <circle cx="237" cy="235" r="24" fill="#374151"/>
      <circle cx="237" cy="235" r="10" fill="#1E2322"/>
      <circle cx="237" cy="235" r="4" fill="#FF5E1E"/>
      <!-- Front Wheel -->
      <circle cx="542" cy="235" r="38" fill="#1E2322" stroke="#0C0F0E" stroke-width="4"/>
      <circle cx="542" cy="235" r="24" fill="#374151"/>
      <circle cx="542" cy="235" r="10" fill="#1E2322"/>
      <circle cx="542" cy="235" r="4" fill="#FF5E1E"/>
    </svg>`,
};

console.log('SVGs compiled.');
