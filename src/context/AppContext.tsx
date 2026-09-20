'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour, Booking, UserProfile } from '@/types';
import { INITIAL_TOURS } from '@/data/tours';

interface AppContextType {
  tours: Tour[];
  bookings: Booking[];
  userProfile: UserProfile;
  selectedTour: Tour | null;
  setSelectedTour: (tour: Tour | null) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isMyTripsOpen: boolean;
  setIsMyTripsOpen: (open: boolean) => void;
  isPartnerPortalOpen: boolean;
  setIsPartnerPortalOpen: (open: boolean) => void;
  isSupportOpen: boolean;
  setIsSupportOpen: (open: boolean) => void;
  isTwa: boolean;
  addBooking: (bookingData: Omit<Booking, 'id' | 'ticketNumber' | 'createdAt' | 'qrPayload'>) => Booking;
  addTour: (newTourData: Omit<Tour, 'id' | 'slug'>) => Tour;
  toggleSoldOut: (tourId: string) => void;
  usePointsForDiscount: (points: number) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-default',
  name: 'Azizbek Rahimov',
  phone: '+998 90 123 45 67',
  telegramUsername: '@azizbek_nature',
  mountainCoins: 30000, // 30,000 so'm xush kelibsiz bonusi
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tours, setTours] = useState<Tour[]>(INITIAL_TOURS);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState(false);
  const [isPartnerPortalOpen, setIsPartnerPortalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isTwa, setIsTwa] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Telegram WebApp detection
      const tg = (window as unknown as { Telegram?: { WebApp?: { initDataUnsafe?: { user?: { first_name?: string; last_name?: string; username?: string } }; ready?: () => void; expand?: () => void } } }).Telegram?.WebApp;
      if (tg) {
        setIsTwa(true);
        tg.ready?.();
        tg.expand?.();

        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser?.first_name) {
          setUserProfile((prev) => ({
            ...prev,
            name: `${tgUser.first_name} ${tgUser.last_name || ''}`.trim(),
            telegramUsername: tgUser.username ? `@${tgUser.username}` : prev.telegramUsername,
          }));
        }
      }

      const savedTours = localStorage.getItem('tashqariga_tours');
      if (savedTours) {
        try {
          setTours(JSON.parse(savedTours));
        } catch (e) {
          console.error('Failed to load saved tours', e);
        }
      }

      const savedBookings = localStorage.getItem('tashqariga_bookings');
      if (savedBookings) {
        try {
          setBookings(JSON.parse(savedBookings));
        } catch (e) {
          console.error('Failed to load saved bookings', e);
        }
      }

      const savedProfile = localStorage.getItem('tashqariga_profile');
      if (savedProfile) {
        try {
          setUserProfile(JSON.parse(savedProfile));
        } catch (e) {
          console.error('Failed to load profile', e);
        }
      }
    }
  }, []);

  // Sync to localStorage
  const saveTours = (newTours: Tour[]) => {
    setTours(newTours);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tashqariga_tours', JSON.stringify(newTours));
    }
  };

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tashqariga_bookings', JSON.stringify(newBookings));
    }
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'ticketNumber' | 'createdAt' | 'qrPayload'>): Booking => {
    const id = 'tkt-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    const ticketNumber = 'TSH-' + Math.floor(100000 + Math.random() * 900000);
    const createdAt = new Date().toISOString();
    const qrPayload = JSON.stringify({
      tkt: ticketNumber,
      tour: bookingData.tourTitle,
      date: bookingData.tourDate,
      name: bookingData.customerName,
      seats: bookingData.seatsCount,
      sum: bookingData.totalPrice,
    });

    const newBooking: Booking = {
      ...bookingData,
      id,
      ticketNumber,
      createdAt,
      qrPayload,
    };

    const updatedBookings = [newBooking, ...bookings];
    saveBookings(updatedBookings);

    // Update seats on the tour
    const updatedTours = tours.map((t) => {
      if (t.id === bookingData.tourId) {
        const newBooked = Math.min(t.maxSeats, t.bookedSeats + bookingData.seatsCount);
        return { ...t, bookedSeats: newBooked };
      }
      return t;
    });
    saveTours(updatedTours);

    // Award 5% cashback points to user
    const cashback = Math.round(bookingData.totalPrice * 0.05);
    const updatedProfile = {
      ...userProfile,
      mountainCoins: userProfile.mountainCoins + cashback,
    };
    setUserProfile(updatedProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tashqariga_profile', JSON.stringify(updatedProfile));
    }

    return newBooking;
  };

  const addTour = (newTourData: Omit<Tour, 'id' | 'slug'>): Tour => {
    const id = 'tour-' + Date.now().toString(36);
    const slug = newTourData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newTour: Tour = {
      ...newTourData,
      id,
      slug,
    };

    const updatedTours = [newTour, ...tours];
    saveTours(updatedTours);
    return newTour;
  };

  const toggleSoldOut = (tourId: string) => {
    const updatedTours = tours.map((t) => {
      if (t.id === tourId) {
        // Toggle between fully booked and with 4 open seats
        const isFull = t.bookedSeats >= t.maxSeats;
        return {
          ...t,
          bookedSeats: isFull ? Math.max(0, t.maxSeats - 4) : t.maxSeats,
        };
      }
      return t;
    });
    saveTours(updatedTours);
  };

  const usePointsForDiscount = (points: number) => {
    const remaining = Math.max(0, userProfile.mountainCoins - points);
    const updatedProfile = { ...userProfile, mountainCoins: remaining };
    setUserProfile(updatedProfile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tashqariga_profile', JSON.stringify(updatedProfile));
    }
  };

  return (
    <AppContext.Provider
      value={{
        tours,
        bookings,
        userProfile,
        selectedTour,
        setSelectedTour,
        isBookingOpen,
        setIsBookingOpen,
        isMyTripsOpen,
        setIsMyTripsOpen,
        isPartnerPortalOpen,
        setIsPartnerPortalOpen,
        isSupportOpen,
        setIsSupportOpen,
        isTwa,
        addBooking,
        addTour,
        toggleSoldOut,
        usePointsForDiscount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
