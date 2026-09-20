'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, HelpCircle, Send, Phone, ShieldCheck, HeartHandshake, CloudRain, Footprints } from 'lucide-react';

export default function SupportModal() {
  const { isSupportOpen, setIsSupportOpen } = useApp();

  if (!isSupportOpen) return null;

  const faqs = [
    {
      q: 'Bir o‘zim (solo) borsam bo‘ladimi yoki jamoa bilan borish kerakmi?',
      a: 'Albatta! "Tashqariga" orqali keladigan sayyohlarning 70 foizi bitta o‘zi keladi. Safar davomida professional yo‘lboshchilar va samimiy ishtirokchilar bilan bir zumda do‘stlashib olasiz.',
      icon: <Footprints className="w-4 h-4 text-adventure-500" />
    },
    {
      q: 'Agar dam olish kunlari ob-havo aynisa (yomg‘ir/sel) nima bo‘ladi?',
      a: 'Xavfsizlik — bizning birinchi darajali qoidamiz. Agar FVV yoki gidlar marshrut xavfli deb hisoblasa, safar xavfsiz boshqa kunga ko‘chiriladi yoki to‘lovingiz 100% qaytarib beriladi.',
      icon: <CloudRain className="w-4 h-4 text-blue-500" />
    },
    {
      q: 'Rejam o‘zgarib qolsa, to‘lovni qanday qaytarib olaman?',
      a: 'Sayohat boshlanishidan kamida 2 kun oldin (masalan, shanba kungi safar uchun payshanba 23:59 gacha) bekor qilsangiz, mablag‘ingiz 100% qaytariladi.',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />
    },
    {
      q: 'Tog‘ sayohatiga birinchi marta chiqyapman, nima kiyishim kerak?',
      a: 'Eng muhimi — tagi sirpanmaydigan qulay sport poyabzali (krossovka), yengil shamolga chidamli kurtka, quyoshdan himoyalovchi bosh kiyim va 1.5L ichimlik suvi. Har bir turning sahifasida to‘liq eslatma ro‘yxati mavjud.',
      icon: <HeartHandshake className="w-4 h-4 text-amber-500" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-adventure-100 text-adventure-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Savollar va Qo‘llab-quvvatlash
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Tashqariga jamoasi doim yoningizda
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs sm:text-sm">
          {/* Quick Support Card */}
          <div className="bg-pine-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <h4 className="font-bold text-sm sm:text-base text-adventure-400">
                Jonli yordam kerakmi?
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                CEO va call-markazimiz sizga 5 daqiqada javob beradi
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <a
                href="https://t.me/tashqarigauz"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold px-4 py-2.5 rounded-xl transition-all text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
              <a
                href="tel:+998901234567"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl transition-all text-xs border border-white/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Qo‘ng‘iroq</span>
              </a>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 text-xs sm:text-sm uppercase tracking-wider text-gray-400">
              Ko‘p so‘raladigan savollar (FAQ)
            </h4>
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm">
                  {faq.icon}
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
