'use client';

import React from 'react';
import { TourCategory } from '@/types';
import { Footprints, Tent, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: TourCategory;
  setSelectedCategory: (cat: TourCategory) => void;
  totalCount: number;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  totalCount,
}: CategoryFilterProps) {
  const categories: { id: TourCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Barcha safarlar', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'hiking', label: '1 Kunlik Hiking', icon: <Footprints className="w-4 h-4" /> },
    { id: 'camping', label: 'Chodirli Kembing', icon: <Tent className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-6">
      {/* Demo Prototype Notice Banner */}
      <div className="mb-4 bg-amber-50 border border-amber-200/90 text-amber-900 px-4 py-2.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <span>
            <strong>Taqdimot Rejimi (Demo):</strong> Quyidagi turlar namunaviy hisoblanadi. Real hamkorlar tasdiqlangach, haqiqiy turlar to‘g‘ridan-to‘g‘ri e’lon qilinadi.
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider shrink-0">
          Prototip v1.0
        </span>
      </div>

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
    </div>
  );
}
