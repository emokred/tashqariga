const fs = require('fs');
const path = require('path');

console.log('Building BRAND_SHOWCASE.html for Tashqariga...');

// 1. Color constants
const COLORS = {
  pine: '#183B2B',
  pineDark: '#0C2017',
  pineLight: '#275543',
  adventure: '#FF5E1E',
  adventureHover: '#E54E12',
  adventureLight: '#FFF5ED',
  fog: '#F7F9F6',
  granite: '#1E2322',
  charvak: '#3A86C8',
  amber: '#F59E0B',
  sage: '#92C2AB',
  snow: '#E2E8F0',
};

// 2. SVG Generator Functions
function getEmblemSVG(fgColor = '#F7F9F6', needleNorth = '#FF5E1E', needleSouth = '#92C2AB', size = 'w-10 h-10') {
  return `
  <svg class="${size} inline-block" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Mountain Left Summit & Ridge -->
    <path d="M12 84 L46 22 L66 54 L80 34 L92 84 Z" fill="${fgColor}" opacity="0.95"/>
    <!-- Shadow facet on mountain ridge -->
    <path d="M46 22 L66 54 L52 84 L38 84 Z" fill="#000000" opacity="0.18"/>
    <!-- 45-degree Dynamic Compass Needle (North-East Summit Direction) -->
    <polygon points="56,54 48,49 84,18 63,62" fill="${needleNorth}"/>
    <!-- South-West Compass Needle -->
    <polygon points="56,54 63,62 28,88 48,49" fill="${needleSouth}"/>
    <!-- Center Pivot Pin -->
    <circle cx="56" cy="54" r="3.5" fill="#183B2B"/>
    <circle cx="56" cy="54" r="1.5" fill="#F7F9F6"/>
  </svg>`;
}

function getFullLogoHorizontal(isDark = false) {
  const textColor = isDark ? '#FFFFFF' : '#183B2B';
  const emblemBg = isDark ? 'text-white' : 'text-pine-900';
  const fgColor = isDark ? '#FFFFFF' : '#183B2B';
  const needleSouth = isDark ? '#92C2AB' : '#306B53';
  return `
  <div class="flex items-center gap-3 select-none">
    <div class="w-11 h-11 rounded-2xl ${isDark ? 'bg-white/10 border border-white/20' : 'bg-pine-900 text-white shadow-lg shadow-pine-900/20'} flex items-center justify-center p-1.5 transition-transform hover:scale-105">
      ${getEmblemSVG(isDark ? '#FFFFFF' : '#F7F9F6', '#FF5E1E', needleSouth, 'w-8 h-8')}
    </div>
    <div class="flex flex-col">
      <div class="flex items-baseline gap-1">
        <span class="font-display font-extrabold tracking-tight text-xl ${isDark ? 'text-white' : 'text-pine-900'}">tashqariga</span>
        <span class="font-display font-bold text-adventure text-lg">.uz</span>
      </div>
      <span class="text-[9px] tracking-widest uppercase font-mono ${isDark ? 'text-white/60' : 'text-gray-500'}">OUTDOOR EXPLORATION</span>
    </div>
  </div>`;
}

console.log('Loaded base generators.');
