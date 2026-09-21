'use client';

import React from 'react';
import { Search, MapPin, Calendar, ShieldCheck, Users, Flame } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDestination: string;
  setSelectedDestination: (dest: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedDestination,
  setSelectedDestination,
  selectedDifficulty,
  setSelectedDifficulty,
}: HeroSectionProps) {
  const destinations = ['Barchasi', "So'qoq", 'Chimyon', 'Urungach', 'Zomin', 'Lashkerek', 'Boysun'];

  return (
    <div className="relative overflow-hidden bg-pine-950 text-white rounded-3xl mx-3 sm:mx-6 lg:mx-8 my-4 shadow-xl border border-pine-800/40">
      {/* Background Image with Ambient Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/75 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-adventure-400 mb-6 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-adventure-500 fill-adventure-500 animate-pulse" />
          <span>🔥 SURAMIZMI? Bu dam olish kuni SURAMIZ!</span>
        </div>

        {/* Slogan */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
          Shahardan qoching. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-adventure-400 via-amber-300 to-emerald-400">
            Tashqariga chiqing!
          </span>
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          «Tashqariga» — to‘rtta devor, cheksiz tirbandlik va ofis monitorlariga qarshi yoshlar harakati. Tog‘ marshrutlarini taqqoslang, bo‘sh o‘rinlarni toping va 1 daqiqada safarga qo‘shiling!
        </p>

        {/* Interactive Search Card */}
        <div className="mt-8 bg-white/95 backdrop-blur-md text-gray-900 p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/40 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input / Destination */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gray-50/80 rounded-xl border border-gray-200/80 focus-within:border-pine-600 transition-all">
              <MapPin className="w-5 h-5 text-adventure-500 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Marshrut / Joy
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d} value={d === 'Barchasi' ? '' : d}>
                      {d === 'Barchasi' ? 'Barcha manzillar' : d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Keyword Search */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gray-50/80 rounded-xl border border-gray-200/80 focus-within:border-pine-600 transition-all">
              <Search className="w-5 h-5 text-pine-600 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Qidiruv so‘zi
                </label>
                <input
                  type="text"
                  placeholder="Masalan: Sharshara, Kembing..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gray-50/80 rounded-xl border border-gray-200/80 focus-within:border-pine-600 transition-all">
              <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  Murakkablik
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
                >
                  <option value="">Barcha darajalar</option>
                  <option value="easy">Oson (Yangi boshlovchilar)</option>
                  <option value="moderate">O‘rta (Faol sayr)</option>
                  <option value="hard">Qiyin (Ekstremal/Cho‘qqi)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ishonchli yo‘lboshchilar & gidlar</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-adventure-400" />
            <span>15 ta yangi qadrdon do‘st</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Musaffo tog‘ havosi & erkinlik</span>
          </div>
        </div>
      </div>
    </div>
  );
}
