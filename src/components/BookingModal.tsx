'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { useApp } from '@/context/AppContext';
import { Booking } from '@/types';
import { 
  X, 
  User, 
  Phone, 
  Send, 
  CreditCard, 
  CheckCircle, 
  Download, 
  Sparkles, 
  Coins, 
  AlertTriangle,
  MapPin,
  Calendar,
  Clock,
  QrCode as QrIcon
} from 'lucide-react';

export default function BookingModal() {
  const { 
    selectedTour, 
    isBookingOpen, 
    setIsBookingOpen, 
    addBooking, 
    userProfile, 
    usePointsForDiscount,
    setIsMyTripsOpen
  } = useApp();

  const [seatsCount, setSeatsCount] = useState(1);
  const [customerName, setCustomerName] = useState(userProfile.name || '');
  const [customerPhone, setCustomerPhone] = useState(userProfile.phone || '+998 ');
  const [customerTelegram, setCustomerTelegram] = useState(userProfile.telegramUsername || '');
  const [paymentMethod, setPaymentMethod] = useState<'click' | 'payme' | 'uzum' | 'card' | 'p2p_test'>('click');
  const [usePoints, setUsePoints] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  if (!isBookingOpen || !selectedTour) return null;

  const seatsLeft = selectedTour.maxSeats - selectedTour.bookedSeats;
  const basePrice = selectedTour.price * seatsCount;
  const discountAmount = usePoints ? Math.min(basePrice, userProfile.mountainCoins) : 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleClose = () => {
    setIsBookingOpen(false);
    setConfirmedBooking(null);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Iltimos, ism va telefon raqamingizni kiriting');
      return;
    }

    setIsLoading(true);

    // Simulate network processing
    setTimeout(async () => {
      const newBooking = addBooking({
        tourId: selectedTour.id,
        tourTitle: selectedTour.title,
        tourDestination: selectedTour.destination,
        tourDate: selectedTour.displayDate,
        departureTime: selectedTour.departureTime,
        departureLocation: selectedTour.departureLocation,
        customerName,
        customerPhone,
        customerTelegram,
        seatsCount,
        totalPrice: finalPrice,
        paymentMethod,
        status: 'confirmed',
      });

      if (usePoints && discountAmount > 0) {
        usePointsForDiscount(discountAmount);
      }

      // Generate QR Code
      try {
        const qr = await QRCode.toDataURL(newBooking.qrPayload, {
          width: 280,
          margin: 1.5,
          color: {
            dark: '#183B2B',
            light: '#FFFFFF',
          },
        });
        setQrDataUrl(qr);
      } catch (err) {
        console.error('QR generation error', err);
      }

      // Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Send real-time notification to Telegram Bot & Guide
      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      }).catch((err) => console.log('Bot notification background call:', err));

      setConfirmedBooking(newBooking);
      setIsLoading(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              {confirmedBooking ? '🎉 Chiptangiz Tayyor!' : 'Sayohatga Joy Band Qilish'}
            </h3>
            <p className="text-xs text-gray-500 font-medium truncate max-w-[280px]">
              {selectedTour.title}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-5 flex-1">
          {confirmedBooking ? (
            /* SUCCESS BOARDING PASS / TICKET */
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                  Muvaffaqiyatli band qilindi
                </span>
                <h2 className="text-xl font-black text-gray-900 mt-0.5">
                  Elektron Chipta #{confirmedBooking.ticketNumber}
                </h2>
              </div>

              {/* Boarding Pass Card */}
              <div className="bg-gradient-to-br from-pine-900 to-pine-950 text-white p-5 rounded-2xl text-left shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-pine-800 pb-3">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Marshrut</span>
                    <h4 className="text-base font-bold text-adventure-400">{confirmedBooking.tourDestination}</h4>
                    <p className="text-xs text-gray-300 line-clamp-1">{confirmedBooking.tourTitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">O‘rinlar</span>
                    <div className="text-sm font-bold text-white">{confirmedBooking.seatsCount} kishi</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-3 border-b border-pine-800 text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] block">Sana</span>
                    <span className="font-semibold text-white">{confirmedBooking.tourDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Jo‘nash vaqti</span>
                    <span className="font-semibold text-white">{confirmedBooking.departureTime}</span>
                  </div>
                </div>

                <div className="pt-2 text-xs">
                  <span className="text-gray-400 text-[10px] block">Yig‘ilish joyi:</span>
                  <span className="text-gray-200">{confirmedBooking.departureLocation}</span>
                </div>

                {/* QR Code Container */}
                {qrDataUrl && (
                  <div className="mt-4 pt-4 border-t border-pine-800 flex items-center justify-between bg-white/5 p-3 rounded-xl">
                    <div className="text-left">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <QrIcon className="w-4 h-4 text-adventure-400" />
                        <span>Nazoratchi uchun QR</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 max-w-[160px]">
                        Avtobusga chiqishda ushbu QR kodni gidga ko‘rsatasiz
                      </p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={qrDataUrl} 
                      alt="Ticket QR" 
                      className="w-20 h-20 bg-white p-1 rounded-lg shadow" 
                    />
                  </div>
                )}
              </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    setIsMyTripsOpen(true);
                  }}
                  className="w-full bg-pine-900 hover:bg-pine-950 text-white font-bold py-3 rounded-xl text-sm transition-all shadow active:scale-95"
                >
                  Safarlarim bo‘limiga o‘tish
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-3 rounded-xl text-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Chop etish</span>
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              {/* Seats Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Ishtirokchilar soni
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => {
                    const isDisabled = num > seatsLeft;
                    const isSelected = seatsCount === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setSeatsCount(num)}
                        className={`flex-1 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                          isSelected
                            ? 'bg-adventure-500 border-adventure-600 text-white shadow-sm'
                            : isDisabled
                            ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Mavjud bo‘sh o‘rinlar: <strong className="text-adventure-600">{seatsLeft} ta</strong>
                </p>
              </div>

              {/* Personal Information */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ism va Familiya
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-pine-600 focus-within:bg-white transition-all">
                    <User className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Sardor Aliyev"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Telefon raqam
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-pine-600 focus-within:bg-white transition-all">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Telegram username (ixtiyoriy)
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-pine-600 focus-within:bg-white transition-all">
                    <Send className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="@username"
                      value={customerTelegram}
                      onChange={(e) => setCustomerTelegram(e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">Gid guruh chatiga qo‘shishi uchun kerak</span>
                </div>
              </div>

              {/* Loyalty Discount Option */}
              {userProfile.mountainCoins > 0 && (
                <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="text-xs font-bold text-amber-950">
                        {userProfile.mountainCoins.toLocaleString()} so‘m keshbek ballaringiz bor
                      </div>
                      <div className="text-[11px] text-amber-800">
                        Ushbu chiptaga chegirma sifatida ishlatish
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="w-4 h-4 text-adventure-500 rounded border-amber-300 focus:ring-adventure-500 cursor-pointer"
                  />
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  To‘lov usulini tanlang
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('click')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all ${
                      paymentMethod === 'click'
                        ? 'border-blue-500 bg-blue-50/50 text-blue-900 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>Click Up</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('payme')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all ${
                      paymentMethod === 'payme'
                        ? 'border-cyan-500 bg-cyan-50/50 text-cyan-900 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    <span>Payme</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('uzum')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all ${
                      paymentMethod === 'uzum'
                        ? 'border-purple-500 bg-purple-50/50 text-purple-900 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span>Uzum Bank</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('p2p_test')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border font-bold transition-all ${
                      paymentMethod === 'p2p_test'
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Tezkor Sinov (0 so‘m)</span>
                  </button>
                </div>
              </div>

              {/* Cancellation Policy Alert */}
              <div className="bg-gray-50 rounded-xl p-3 text-[11px] text-gray-500 flex items-start gap-2 border border-gray-100">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Qaytarish kafolati:</strong> Safar boshlanishidan 2 kun oldin bekor qilsangiz, to‘lov 100% qaytariladi.
                </span>
              </div>

              {/* Total Calculation & CTA */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                  <span>Chiptalar ({seatsCount} kishi):</span>
                  <span>{basePrice.toLocaleString()} so‘m</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-600 font-bold mb-1">
                    <span>Keshbek chegirmasi:</span>
                    <span>-{discountAmount.toLocaleString()} so‘m</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm font-bold text-gray-900">Jami to‘lov:</span>
                  <span className="text-xl font-black text-pine-900">
                    {finalPrice.toLocaleString()} so‘m
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-adventure-500 hover:bg-adventure-600 text-white font-bold py-3.5 rounded-2xl text-base shadow-lg shadow-adventure-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Chipta tayyorlanmoqda...</span>
                  ) : (
                    <>
                      <span>To‘lov va Bron Qilish</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
