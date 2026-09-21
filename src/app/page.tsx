'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { TourCategory, TourSegment } from '@/types';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import TourCard from '@/components/TourCard';
import TourDetailModal from '@/components/TourDetailModal';
import BookingModal from '@/components/BookingModal';
import MyTripsModal from '@/components/MyTripsModal';
import PartnerPortalModal from '@/components/PartnerPortalModal';
import SupportModal from '@/components/SupportModal';
import MobileBottomNav from '@/components/MobileBottomNav';
import Footer from '@/components/Footer';
import { Sparkles, Shield, Compass, Heart, Users, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const { tours } = useApp();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TourCategory>('all');
  const [selectedSegment, setSelectedSegment] = useState<TourSegment>('all');

  // Filtered tours calculation
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Search query filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = tour.title.toLowerCase().includes(q);
        const matchesDest = tour.destination.toLowerCase().includes(q);
        const matchesDesc = tour.shortDescription.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDest && !matchesDesc) return false;
      }

      // Destination filter
      if (selectedDestination && tour.destination !== selectedDestination) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty && tour.difficulty !== selectedDifficulty) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && tour.category !== selectedCategory) {
        return false;
      }

      // Segment filter
      if (selectedSegment !== 'all' && tour.segment !== selectedSegment) {
        return false;
      }

      return true;
    });
  }, [tours, searchQuery, selectedDestination, selectedDifficulty, selectedCategory, selectedSegment]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('');
    setSelectedDifficulty('');
    setSelectedCategory('all');
    setSelectedSegment('all');
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero with Search */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />

      {/* Filter Tabs */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalCount={filteredTours.length}
      />

      {/* Tours Grid Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        {filteredTours.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 shadow-sm my-4">
            <div className="w-16 h-16 rounded-full bg-adventure-50 text-adventure-500 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Ushbu filtrlar bo‘yicha safarlar topilmadi
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Qidiruv so‘zini o‘zgartirib ko‘ring yoki barcha marshrutlarni ko‘rish uchun filtrlarni tozalang.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 bg-pine-900 hover:bg-pine-950 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Filtrlarni tozalash</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </section>

      {/* Why Tashqariga / Manifesto Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-br from-pine-900 to-pine-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-pine-800 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-adventure-500/20 text-adventure-400 border border-adventure-500/30 px-3 py-1 rounded-full text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🌿 HARAKATIMIZ FALSAFASI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              Hayot to‘rtta devor orasida <br className="hidden sm:inline" />
              o‘tib ketmasin.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">
              «Tashqariga» shunchaki sayohat servisi emas. Bu to‘rtta devor, cheksiz tirbandlik va ofis monitorlariga qarshi yoshlar harakati. Tog‘ cho‘qqilari, toza havo va haqiqiy sarguzashtlar bizni kutmoqda!
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-pine-800/80">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-adventure-500 text-white flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base">Ishonchli Yo‘lboshchilar</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Har bir marshrut va tajribali gidlar xavfsizlik va professionallik mezonlari asosida sinchkovlik bilan tekshiriladi.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base">Toza Kislorod & Erkinlik</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Shahar shovqini va ekranlardan uzoqlashib, O‘zbekistonning eng go‘zal tog‘ daralarida to‘yib nafas oling.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base">15 ta Yangi Qadrdon Do‘st</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Bir o‘zingiz bo‘lsangiz ham tortinmang — safarlarimizda samimiy, ochiqko‘ngil tengdoshlar davrasi sizni kutmoqda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <TourDetailModal />
      <BookingModal />
      <MyTripsModal />
      <PartnerPortalModal />
      <SupportModal />

      {/* Mobile Bottom Bar for native app feel */}
      <MobileBottomNav />

      {/* Footer */}
      <Footer />
    </main>
  );
}
