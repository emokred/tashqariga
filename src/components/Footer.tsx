'use client';

import React from 'react';
import { Compass, Send, Instagram, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { setIsPartnerPortalOpen, setIsSupportOpen } = useApp();

  return (
    <footer className="bg-pine-950 text-white mt-16 border-t border-pine-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-adventure-500 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight">TASHQARIGA</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
              O‘zbekistonning eng go‘zal tog‘lari, sharsharalari va kanyonlariga qulay sayohatlarni birlashtiruvchi birinchi raqamli agregator. Dam olish kunlaringizni unutilmas qiling!
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://t.me/tashqarigauz"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#229ED9] flex items-center justify-center transition-all text-white"
                title="Telegram Kanal"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/tashqariga.uz"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-pink-600 flex items-center justify-center transition-all text-white"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Tezkor havolalar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-adventure-400">
              Foydalanuvchilarga
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                  className="hover:text-white transition-colors"
                >
                  Barcha Turlar Katalogi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSupportOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Ko‘p So‘raladigan Savollar (FAQ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSupportOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Xavfsizlik va Qoidalar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSupportOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  To‘lovni Qaytarish Kafolati
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hamkorlar uchun */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-adventure-400">
              Gidlar va Hamkorlar
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => setIsPartnerPortalOpen(true)}
                  className="hover:text-white transition-colors font-semibold text-emerald-400"
                >
                  Hamkorlik Kabineti
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsPartnerPortalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Yangi Tur Joylashtirish
                </button>
              </li>
              <li>
                <a 
                  href="https://t.me/tashqarigauz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  CEO bilan to‘g‘ridan-to‘g‘ri aloqa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-pine-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 Tashqariga. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            <span>O‘zbekistonda muhabbat bilan yaratildi</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
