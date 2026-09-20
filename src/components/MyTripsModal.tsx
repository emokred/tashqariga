'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Ticket, 
  MapPin, 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  Share2, 
  Coins, 
  QrCode as QrIcon 
} from 'lucide-react';

export default function MyTripsModal() {
  const { bookings, isMyTripsOpen, setIsMyTripsOpen, userProfile } = useApp();
  const [copied, setCopied] = useState(false);
  const [qrMap, setQrMap] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (bookings.length > 0) {
      bookings.forEach(async (b) => {
        try {
          const qr = await QRCode.toDataURL(b.qrPayload, {
            width: 200,
            margin: 1,
            color: {
              dark: '#183B2B',
              light: '#FFFFFF',
            },
          });
          setQrMap((prev) => ({ ...prev, [b.id]: qr }));
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, [bookings]);

  if (!isMyTripsOpen) return null;

  const referralLink = `https://t.me/tashqarigabot?start=ref_${userProfile.id}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pine-100 text-pine-900 flex items-center justify-center">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Mening Safarlarim va Chiptalarim
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {bookings.length} ta faol bron mavjud
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMyTripsOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Referral & Loyalty Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                  Hisobingiz: {userProfile.mountainCoins.toLocaleString()} Tog‘ Tangasi
                </h4>
                <p className="text-[11px] text-amber-800">
                  Do‘stlaringizni taklif qiling — har bir do‘stingiz uchun 30 000 so‘m keshbek oling!
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyReferral}
              className="flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Havola nusxalandi!' : 'Taklif havolasi'}</span>
            </button>
          </div>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-gray-700">Hozircha faol chiptalaringiz yo‘q</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                Bosh sahifadagi eng yaxshi turlardan birini tanlang va unutilmas sarguzasht sari birinchi qadamni qo‘ying!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white border border-gray-200 hover:border-pine-400 rounded-2xl p-4 sm:p-5 shadow-sm transition-all flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-pine-900 bg-pine-100 px-2.5 py-0.5 rounded-lg">
                        #{b.ticketNumber}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Tasdiqlangan
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-gray-900 leading-snug">
                      {b.tourTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-adventure-500" />
                        {b.tourDestination}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-pine-600" />
                        {b.tourDate}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-pine-600" />
                        {b.departureTime}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 pt-1">
                      <strong>Ishtirokchi:</strong> {b.customerName} ({b.seatsCount} o‘rin) • Jami:{' '}
                      <strong className="text-pine-900">{b.totalPrice.toLocaleString()} so‘m</strong>
                    </div>
                  </div>

                  {/* QR code on ticket */}
                  {qrMap[b.id] && (
                    <div className="flex flex-col items-center justify-center p-2 bg-gray-50 border border-gray-100 rounded-xl shrink-0 self-center sm:self-auto">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={qrMap[b.id]}
                        alt="QR Ticket"
                        className="w-20 h-20 bg-white p-1 rounded-lg shadow-sm"
                      />
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1 flex items-center gap-0.5">
                        <QrIcon className="w-2.5 h-2.5" /> Tekshirish QR
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
