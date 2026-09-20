'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Compass, Ticket, PlusCircle, HelpCircle, Coins, Sparkles } from 'lucide-react';

export default function Navbar() {
  const {
    userProfile,
    bookings,
    setIsMyTripsOpen,
    setIsPartnerPortalOpen,
    setIsSupportOpen,
    isTwa,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-pine-800 to-pine-950 flex items-center justify-center text-white shadow-md shadow-pine-900/20">
              <Compass className="w-6 h-6 text-adventure-500 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl text-pine-900 tracking-tight">
                  TASHQARIGA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-adventure-100 text-adventure-700 px-1.5 py-0.5 rounded-full">
                  BETA
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                Shahar qafasidan tabiat qo‘yniga!
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Loyalty Points Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-full">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-900">
                {userProfile.mountainCoins.toLocaleString()} so‘m
              </span>
              <span className="text-[10px] text-amber-700 font-medium">keshbek</span>
            </div>

            {/* My Trips Button */}
            <button
              onClick={() => setIsMyTripsOpen(true)}
              className="relative flex items-center gap-1.5 bg-pine-50 hover:bg-pine-100 text-pine-900 font-semibold px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all border border-pine-200/60 active:scale-95"
            >
              <Ticket className="w-4 h-4 text-pine-700" />
              <span className="hidden xs:inline">Safarlarim</span>
              {bookings.length > 0 && (
                <span className="w-5 h-5 bg-adventure-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {bookings.length}
                </span>
              )}
            </button>

            {/* Partner / Admin Portal Button */}
            <button
              onClick={() => setIsPartnerPortalOpen(true)}
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-black text-white font-medium px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-sm active:scale-95"
              title="Gidlar va Turoperatorlar kabineti"
            >
              <PlusCircle className="w-4 h-4 text-adventure-400" />
              <span className="hidden md:inline">Gidlar & Hamkorlar</span>
              <span className="md:hidden">Hamkor</span>
            </button>

            {/* Support / Help Button */}
            <button
              onClick={() => setIsSupportOpen(true)}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              title="Yordam va Savollar"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Telegram Mini App indicator if detected */}
      {isTwa && (
        <div className="bg-pine-900 text-white text-[11px] py-1 px-3 text-center flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-adventure-400" />
          <span>Telegram Mini App rejimida ishlamoqda • Xush kelibsiz, {userProfile.name}!</span>
        </div>
      )}
    </header>
  );
}
