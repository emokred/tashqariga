export type TourCategory = 'all' | 'hiking' | 'camping' | 'extreme' | 'relax';
export type TourSegment = 'all' | 'standard' | 'gold' | 'premium';
export type TourDifficulty = 'easy' | 'moderate' | 'hard';

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface Organizer {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  telegram: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  tripsCompleted: number;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  region: string;
  category: TourCategory;
  segment: TourSegment;
  difficulty: TourDifficulty;
  durationDays: number;
  price: number;
  originalPrice?: number;
  date: string;
  displayDate: string;
  departureTime: string;
  departureLocation: string;
  returnTime: string;
  returnLocation: string;
  images: string[];
  maxSeats: number;
  bookedSeats: number;
  shortDescription: string;
  fullDescription: string;
  included: string[];
  notIncluded: string[];
  whatToBring: string[];
  organizer: Organizer;
  itinerary: ItineraryItem[];
  isFeatured?: boolean;
  isDemo?: boolean;
  tgGroupLink?: string;
}

export interface Booking {
  id: string;
  ticketNumber: string;
  tourId: string;
  tourTitle: string;
  tourDestination: string;
  tourDate: string;
  departureTime: string;
  departureLocation: string;
  customerName: string;
  customerPhone: string;
  customerTelegram?: string;
  seatsCount: number;
  totalPrice: number;
  paymentMethod: 'click' | 'payme' | 'uzum' | 'card' | 'p2p_test';
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
  qrPayload: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  telegramUsername?: string;
  mountainCoins: number; // Tog' tangasi (cashback points)
  avatar?: string;
}
