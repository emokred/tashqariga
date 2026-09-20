'use client';

import React from 'react';
import { TourCategory, TourSegment } from '@/types';
import { Footprints, Tent, Mountain, Waves, Sparkles, Award, Crown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: TourCategory;
  setSelectedCategory: (cat: TourCategory) => void;
  selectedSegment: TourSegment;
  setSelectedSegment: (seg: TourSegment) => void;
  totalCount: number;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  selectedSegment,
  setSelectedSegment,
  totalCount,
}: CategoryFilterProps) {
  const categories: { id: TourCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Barcha turlar', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hiking', label: '1 Kunlik Hiking', icon: <Footprints className="w-4 h-4" /> },
    { id: 'camping', label: 'Chodirli Kembing', icon: <Tent className="w-4 h-4" /> },
    { id: 'extreme', label: 'Cho‘qqi & Ekstremal', icon: <Mountain className="w-4 h-4" /> },
    { id: 'relax', label: 'Ko‘l & Tabiat', icon: <Waves className="w-4 h-4" /> },
  ];

  const segments: { id: TourSegment; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Barcha segmentlar', icon: null },
    { id: 'standard', label: 'Standart', icon: <Award className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'gold', label: 'Gold', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'premium', label: 'Premium', icon: <Crown className="w-3.5 h-3.5 text-purple-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
      {/* Category Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-pine-900 text-white shadow-md shadow-pine-900/15'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Count indicator */}
        <div className="text-xs font-semibold text-gray-500 shrink-0">
          <span className="font-bold text-pine-900">{totalCount} ta</span> safar mavjud
        </div>
      </div>

      {/* Segment Sub-tabs (Standart, Gold, Premium) */}
      <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider mr-1">
          Klass:
        </span>
        {segments.map((seg) => {
          const isActive = selectedSegment === seg.id;
          return (
            <button
              key={seg.id}
              onClick={() => setSelectedSegment(seg.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {seg.icon}
              <span>{seg.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
