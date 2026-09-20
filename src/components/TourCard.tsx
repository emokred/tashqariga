'use client';

import React from 'react';
import Image from 'next/image';
import { Tour } from '@/types';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, MapPin, Star, CheckCircle, Flame, ArrowRight } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const { setSelectedTour, setIsBookingOpen } = useApp();
  const seatsLeft = tour.maxSeats - tour.bookedSeats;
  const isSoldOut = seatsLeft <= 0;

  const difficultyColors = {
    easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    hard: 'bg-rose-100 text-rose-800 border-rose-200',
  };

  const difficultyLabels = {
    easy: 'Oson',
    moderate: 'O‘rta',
    hard: 'Qiyin / Cho‘qqi',
  };

  const segmentLabels = {
    all: '',
    standard: 'Standart',
    gold: 'Gold',
    premium: 'Premium VIP',
  };

  const segmentColors = {
    all: '',
    standard: 'bg-blue-500/90 text-white',
    gold: 'bg-amber-500/90 text-white',
    premium: 'bg-purple-600/90 text-white',
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  return (
    <div
      onClick={() => setSelectedTour(tour)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail with overlay badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={tour.images[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Segment Tag */}
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm ${segmentColors[tour.segment]}`}>
            {segmentLabels[tour.segment]}
          </span>

          {/* Difficulty Tag */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${difficultyColors[tour.difficulty]}`}>
            {difficultyLabels[tour.difficulty]}
          </span>
        </div>

        {/* Urgent Seats Notification (FOMO) */}
        {!isSoldOut && seatsLeft <= 4 && (
          <div className="absolute bottom-3 left-3 bg-adventure-600/95 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-md">
            <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
            <span>Faqat {seatsLeft} ta joy qoldi!</span>
          </div>
        )}

        {/* Sold out badge */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg">
              Barcha joylar band bo‘ldi
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Destination */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-adventure-500 shrink-0" />
            <span className="truncate">{tour.destination} • {tour.region}</span>
          </div>

          {/* Tour Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-pine-800 transition-colors">
            {tour.title}
          </h3>

          {/* Schedule & Time */}
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <Calendar className="w-3.5 h-3.5 text-pine-600" />
              <span>{tour.displayDate}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <Clock className="w-3.5 h-3.5 text-pine-600" />
              <span>{tour.departureTime} dan</span>
            </div>
          </div>

          {/* Organizer Snippet */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={tour.organizer.avatar}
                  alt={tour.organizer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 truncate max-w-[140px]">
                {tour.organizer.name}
              </span>
              {tour.organizer.isVerified && (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{tour.organizer.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Price & Action Bottom */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-pine-900">
                {tour.price.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-gray-500">so‘m</span>
            </div>
            {tour.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {tour.originalPrice.toLocaleString()} so‘m
              </span>
            )}
          </div>

          <button
            disabled={isSoldOut}
            onClick={handleBookNow}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-95 ${
              isSoldOut
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-adventure-500 hover:bg-adventure-600 text-white shadow-adventure-500/20'
            }`}
          >
            <span>{isSoldOut ? 'Joy yo‘q' : 'Band qilish'}</span>
            {!isSoldOut && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
