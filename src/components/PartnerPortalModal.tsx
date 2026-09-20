'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { TourCategory, TourSegment, TourDifficulty } from '@/types';
import { 
  X, 
  Plus, 
  BarChart3, 
  Users, 
  CheckCircle, 
  Ban, 
  Briefcase, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Sparkles 
} from 'lucide-react';

export default function PartnerPortalModal() {
  const { tours, addTour, toggleSoldOut, isPartnerPortalOpen, setIsPartnerPortalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');

  // Form State
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('Chimyon');
  const [region, setRegion] = useState('Toshkent viloyati');
  const [category, setCategory] = useState<TourCategory>('hiking');
  const [segment, setSegment] = useState<TourSegment>('standard');
  const [difficulty, setDifficulty] = useState<TourDifficulty>('moderate');
  const [price, setPrice] = useState('250000');
  const [date, setDate] = useState('2026-10-04');
  const [displayDate, setDisplayDate] = useState('4-Oktyabr, Yakshanba');
  const [departureTime, setDepartureTime] = useState('07:00');
  const [departureLocation, setDepartureLocation] = useState('Buyuk Ipak Yo‘li metro bekati');
  const [returnTime, setReturnTime] = useState('19:30');
  const [returnLocation, setReturnLocation] = useState('Buyuk Ipak Yo‘li metro bekati');
  const [maxSeats, setMaxSeats] = useState('18');
  const [organizerName, setOrganizerName] = useState('Sharq Trek Expedition');
  const [organizerTelegram, setOrganizerTelegram] = useState('@sharqtrek_uz');
  const [shortDescription, setShortDescription] = useState('Go‘zal tabiat manzaralari va musaffo tog‘ havosi bo‘ylab sarguzasht.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80');

  if (!isPartnerPortalOpen) return null;

  // Calculate quick metrics
  const totalBookedSeats = tours.reduce((acc, t) => acc + t.bookedSeats, 0);
  const totalPotentialIncome = tours.reduce((acc, t) => acc + (t.bookedSeats * t.price), 0);

  const handleCreateTour = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Iltimos, tur nomini kiriting');
      return;
    }

    addTour({
      title,
      destination,
      region,
      category,
      segment,
      difficulty,
      durationDays: 1,
      price: parseInt(price) || 200000,
      date,
      displayDate,
      departureTime,
      departureLocation,
      returnTime,
      returnLocation,
      maxSeats: parseInt(maxSeats) || 18,
      bookedSeats: 0,
      images: [imageUrl],
      shortDescription,
      fullDescription: shortDescription,
      included: ['Transfer', 'Tog‘ yo‘lboshchisi', 'Tog‘ choyi', 'Fotosessiya'],
      notIncluded: ['Shaxsiy tushlik', 'Xaridlar'],
      whatToBring: ['Qulay krossovka', '1.5L suv', 'Shamolga qarshi kiyim'],
      itinerary: [
        { time: departureTime, title: 'Jo‘nash', description: departureLocation + 'dan yo‘lga chiqish' },
        { time: '10:00', title: 'Start', description: 'Marshrut bo‘yicha yurishni boshlash' },
        { time: '13:00', title: 'Piknik & Dam olish', description: 'Go‘zal manzaralar bag‘rida hordiq' },
        { time: returnTime, title: 'Qaytish', description: 'Toshkentga yetib kelish' },
      ],
      organizer: {
        id: 'org-custom',
        name: organizerName,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        phone: '+998 90 000 00 00',
        telegram: organizerTelegram,
        rating: 5.0,
        reviewsCount: 1,
        isVerified: true,
        tripsCompleted: 1,
      },
    });

    alert('🎉 Yangi tur muvaffaqiyatli qo‘shildi va bosh sahifada paydo bo‘ldi!');
    setActiveTab('manage');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-adventure-500 text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">Gidlar va Hamkorlar Kabineti</h3>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-bold">
                  B2B Portal
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Turlaringizni nazorat qiling va bo‘sh o‘rinlarni boshqaring
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPartnerPortalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Analytics Bar */}
        <div className="grid grid-cols-3 gap-2 bg-gray-50 border-b border-gray-200 px-6 py-3 text-center">
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase">Jami Turlar</div>
            <div className="text-base sm:text-lg font-black text-pine-900">{tours.length} ta</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase">Band Joylar</div>
            <div className="text-base sm:text-lg font-black text-adventure-600">{totalBookedSeats} kishi</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-bold uppercase">Taxminiy Savdo</div>
            <div className="text-base sm:text-lg font-black text-emerald-700">
              {(totalPotentialIncome / 1000000).toFixed(1)}M so‘m
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 px-6 bg-white">
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'manage'
                ? 'border-adventure-500 text-adventure-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Mavjud Turlar va Joylar Nazorati
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === 'add'
                ? 'border-adventure-500 text-adventure-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Tur Qo‘shish (1 daqiqada)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'manage' ? (
            /* TOURS INVENTORY MANAGEMENT */
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-900 p-3 rounded-xl text-xs flex items-center justify-between">
                <span>
                  💡 <strong>Gidlar uchun qulaylik:</strong> Agar avtobusingizda joy to‘lgan bo‘lsa, bitta tugma bilan <strong>"Joylar to‘ldi"</strong> holatiga o‘tkazib qo‘yishingiz mumkin.
                </span>
              </div>

              <div className="space-y-3">
                {tours.map((t) => {
                  const seatsLeft = t.maxSeats - t.bookedSeats;
                  const isFull = seatsLeft <= 0;
                  return (
                    <div
                      key={t.id}
                      className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-pine-300 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gray-500">{t.destination}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs text-pine-700 font-semibold">{t.displayDate}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">
                          {t.title}
                        </h4>
                        <div className="text-xs text-gray-600 mt-1">
                          Narx: <strong>{t.price.toLocaleString()} so‘m</strong> • Gid:{' '}
                          <strong>{t.organizer.name}</strong>
                        </div>
                      </div>

                      {/* Seats indicator and toggle button */}
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <div className="text-right">
                          <div className={`text-xs font-black ${isFull ? 'text-rose-600' : 'text-emerald-700'}`}>
                            {isFull ? 'TO‘LGAN' : `${seatsLeft} ta bo‘sh joy`}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {t.bookedSeats}/{t.maxSeats} band
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSoldOut(t.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            isFull
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                          }`}
                        >
                          {isFull ? 'Joy ochish (+4)' : 'To‘xtatish (Full)'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ADD NEW TOUR FORM */
            <form onSubmit={handleCreateTour} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Tur Nomi</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Pulatxon Platosi Ekspeditsiyasi"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Manzil / Tog‘</label>
                  <input
                    type="text"
                    required
                    placeholder="Chimyon / So‘qoq / Boysun"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Viloyat / Tuman</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kategoriya</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TourCategory)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  >
                    <option value="hiking">1 Kunlik Hiking</option>
                    <option value="camping">Chodirli Kembing</option>
                    <option value="extreme">Cho‘qqi & Ekstremal</option>
                    <option value="relax">Ko‘l & Dam olish</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Klass / Segment</label>
                  <select
                    value={segment}
                    onChange={(e) => setSegment(e.target.value as TourSegment)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  >
                    <option value="standard">Standart</option>
                    <option value="gold">Gold</option>
                    <option value="premium">Premium VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Narxi (so‘m)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Jami o‘rindiqlar soni</label>
                  <input
                    type="number"
                    required
                    value={maxSeats}
                    onChange={(e) => setMaxSeats(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Sana (matn ko‘rinishida)</label>
                  <input
                    type="text"
                    required
                    placeholder="4-Oktyabr, Yakshanba"
                    value={displayDate}
                    onChange={(e) => setDisplayDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Jo‘nash vaqti va joyi</label>
                  <input
                    type="text"
                    required
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Gid yoki Jamoa nomi</label>
                  <input
                    type="text"
                    required
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">Qisqa ta’rif</label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl focus:border-pine-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-adventure-500 hover:bg-adventure-600 text-white font-bold py-3 rounded-2xl text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Platformaga Joylash</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
