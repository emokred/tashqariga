'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Compass, Ticket, Coins, Briefcase, HelpCircle } from 'lucide-react';

export default function MobileBottomNav() {
  const {
    bookings,
    userProfile,
    setIsMyTripsOpen,
    setIsPartnerPortalOpen,
    setIsSupportOpen,
  } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 py-2 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-around">
        {/* Turlar / Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-pine-900 active:scale-95 transition-all"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold">Turlar</span>
        </button>

        {/* Safarlarim / Tickets */}
        <button
          onClick={() => setIsMyTripsOpen(true)}
          className="relative flex flex-col items-center gap-1 text-gray-500 hover:text-pine-900 active:scale-95 transition-all"
        >
          <Ticket className="w-5 h-5 text-pine-700" />
          <span className="text-[10px] font-bold">Safarlarim</span>
          {bookings.length > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-adventure-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {bookings.length}
            </span>
          )}
        </button>

        {/* Keshbek / Points */}
        <button
          onClick={() => setIsMyTripsOpen(true)}
          className="flex flex-col items-center gap-1 text-amber-600 hover:text-amber-700 active:scale-95 transition-all"
        >
          <Coins className="w-5 h-5" />
          <span className="text-[10px] font-bold">{userProfile.mountainCoins.toLocaleString()} b.</span>
        </button>

        {/* Hamkor / B2B */}
        <button
          onClick={() => setIsPartnerPortalOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-pine-900 active:scale-95 transition-all"
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-bold">Hamkor</span>
        </button>

        {/* Yordam */}
        <button
          onClick={() => setIsSupportOpen(true)}
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-pine-900 active:scale-95 transition-all"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold">Yordam</span>
        </button>
      </div>
    </div>
  );
}
