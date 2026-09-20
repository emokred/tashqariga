'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Star, 
  Phone, 
  Send, 
  Luggage, 
  Flame, 
  ChevronRight 
} from 'lucide-react';

export default function TourDetailModal() {
  const { selectedTour, setSelectedTour, setIsBookingOpen } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedTour) return null;

  const seatsLeft = selectedTour.maxSeats - selectedTour.bookedSeats;
  const isSoldOut = seatsLeft <= 0;

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setSelectedTour(null)}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          {/* Main Gallery Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-gray-900">
            <Image
              src={selectedTour.images[activeImageIndex] || selectedTour.images[0]}
              alt={selectedTour.title}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Thumbnails row */}
            {selectedTour.images.length > 1 && (
              <div className="absolute bottom-3 left-4 flex gap-2 z-10">
                {selectedTour.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-adventure-500 scale-105' : 'border-white/50 opacity-70'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Title on Image */}
            <div className="absolute bottom-4 right-4 z-10 text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-adventure-500 text-white px-2.5 py-1 rounded-full shadow">
                {selectedTour.segment} segment
              </span>
            </div>
          </div>

          {/* Body Information */}
          <div className="p-5 sm:p-8 space-y-6">
            {/* Title & Location */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-adventure-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{selectedTour.destination}, {selectedTour.region}</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-gray-900 leading-snug">
                {selectedTour.title}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {selectedTour.fullDescription}
              </p>
            </div>

            {/* Key Trip Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs sm:text-sm">
              <div className="p-2">
                <div className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pine-600" />
                  <span>Sana</span>
                </div>
                <div className="font-bold text-gray-900 mt-1">{selectedTour.displayDate}</div>
              </div>

              <div className="p-2">
                <div className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-pine-600" />
                  <span>Vaqti</span>
                </div>
                <div className="font-bold text-gray-900 mt-1">{selectedTour.departureTime} – {selectedTour.returnTime}</div>
              </div>

              <div className="p-2">
                <div className="text-gray-400 text-[11px] font-medium">Qiyinchilik</div>
                <div className="font-bold text-emerald-700 capitalize mt-1">
                  {selectedTour.difficulty === 'easy' ? 'Oson' : selectedTour.difficulty === 'moderate' ? 'O‘rta' : 'Qiyin'}
                </div>
              </div>

              <div className="p-2">
                <div className="text-gray-400 text-[11px] font-medium">Bo‘sh o‘rinlar</div>
                <div className={`font-bold mt-1 ${seatsLeft <= 4 ? 'text-adventure-600' : 'text-gray-900'}`}>
                  {isSoldOut ? 'To‘lgan' : `${seatsLeft} ta qoldi / ${selectedTour.maxSeats}`}
                </div>
              </div>
            </div>

            {/* Meeting Point */}
            <div className="bg-pine-50/60 border border-pine-100 rounded-2xl p-4 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-pine-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-pine-950">Yig‘ilish joyi va marshrut</h4>
                <p className="text-xs text-pine-800 mt-0.5">
                  <strong>Jo‘nash:</strong> {selectedTour.departureLocation} ({selectedTour.departureTime})
                </p>
                <p className="text-xs text-pine-800 mt-0.5">
                  <strong>Qaytish:</strong> {selectedTour.returnLocation} (taxminan {selectedTour.returnTime})
                </p>
              </div>
            </div>

            {/* Itinerary Schedule */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>Soatma-soat sayohat rejasi</span>
              </h3>
              <div className="relative border-l-2 border-pine-200 ml-3 space-y-4 pl-4 py-1">
                {selectedTour.itinerary.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-pine-600 border-2 border-white" />
                    <div className="text-xs font-bold text-adventure-600">{step.time}</div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included & Not Included Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Included */}
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4">
                <h4 className="text-xs sm:text-sm font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Narx ichiga kiradi</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {selectedTour.included.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Not Included */}
              <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4">
                <h4 className="text-xs sm:text-sm font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Narx ichiga kirmaydi</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-950">
                  {selectedTour.notIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What to Bring Checklist */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <Luggage className="w-4 h-4 text-pine-700" />
                <span>O‘zingiz bilan nimalar olishingiz zarur</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {selectedTour.whatToBring.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-gray-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-adventure-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer Profile Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                  <Image
                    src={selectedTour.organizer.avatar}
                    alt={selectedTour.organizer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">{selectedTour.organizer.name}</span>
                    {selectedTour.organizer.isVerified && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" /> Verifikatsiyalangan
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {selectedTour.organizer.rating.toFixed(1)} ({selectedTour.organizer.reviewsCount} baho)
                    </span>
                    <span>• {selectedTour.organizer.tripsCompleted} ta muvaffaqiyatli safar</span>
                  </div>
                </div>
              </div>

              {/* Quick Contacts & Share */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://t.me/${selectedTour.organizer.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#229ED9] hover:bg-[#1E88E5] px-3.5 py-2 rounded-xl transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gidga Savol Berish</span>
                </a>
                <a
                  href={`tel:${selectedTour.organizer.phone}`}
                  className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Qo‘ng‘iroq</span>
                </a>
                <button
                  onClick={() => {
                    const shareText = `🏔️ Tashqariga.uz orqali ajoyib tog‘ sayohati: ${selectedTour.title}!\n📅 Sana: ${selectedTour.displayDate}\n💰 Narxi: ${selectedTour.price.toLocaleString()} so‘m\nJoy band qilish:`;
                    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://tashqariga.uz';
                    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
                    window.open(tgUrl, '_blank');
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-pine-900 bg-pine-100 hover:bg-pine-200 px-3 py-2 rounded-xl transition-all"
                  title="Telegram orqali ulashish"
                >
                  <Send className="w-3.5 h-3.5 text-pine-700" />
                  <span>Ulashish</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex items-center justify-between gap-4 z-20 shadow-lg">
          <div>
            <div className="text-[11px] text-gray-400 font-medium">Bitta ishtirokchi uchun</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-pine-900">
                {selectedTour.price.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-gray-500">so‘m</span>
            </div>
          </div>

          <button
            disabled={isSoldOut}
            onClick={handleOpenBooking}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 ${
              isSoldOut
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-adventure-500 hover:bg-adventure-600 text-white shadow-adventure-500/30'
            }`}
          >
            <span>{isSoldOut ? 'Barcha joylar to‘lgan' : 'Joy band qilish'}</span>
            {!isSoldOut && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
