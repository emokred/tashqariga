// Tashqariga.uz - Asosiy ommabop tog' va hiking turlari
export const BOT_TOURS = [
  {
    id: 'soqoq-sharshara',
    title: "So'qoq Sharsharasi & Soya Oromgohi Safarlari",
    destination: "So'qoq, Parkent",
    category: 'hiking',
    difficulty: 'Yengil (Easy) 🟢',
    duration: '1 kun',
    price: 190000,
    originalPrice: 230000,
    date: '26-Sentyabr, Shanba',
    departureTime: '07:30',
    departureLocation: "Buyuk Ipak Yo'li metro bekati",
    maxSeats: 18,
    bookedSeats: 14,
    organizer: 'Sharq Trek Expedition (Reyting: ⭐ 4.9)',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    description: "Toza archazorlar havosi, muzdek sharshara va mashhur So'qoq kabobi bilan yakunlanuvchi yengil tog' sayohati."
  },
  {
    id: 'katta-chimyon-choqqisi',
    title: 'Katta Chimyon Choqqisi (3309m) Ekotrek',
    destination: 'Chimyon, Bo‘stonliq',
    category: 'hiking',
    difficulty: 'Murakkab (Hard) 🔴',
    duration: '1 kun',
    price: 350000,
    originalPrice: 400000,
    date: '27-Sentyabr, Yakshanba',
    departureTime: '05:30',
    departureLocation: 'Milliy bog‘ metro bekati',
    maxSeats: 15,
    bookedSeats: 12,
    organizer: 'Chimgan Peak Guides (Reyting: ⭐ 5.0)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    description: "O'zbekistonning eng mashhur cho'qqisi 3309 metr balandlikni zabt etish! Kuchli iroda va qorli tog' manzaralari."
  },
  {
    id: 'urungach-nefrit',
    title: 'Urungach Nefrit Ko‘llari — Kristal Suvlar Mo‘jizasi',
    destination: 'Urungach, Ugom-Chotqol',
    category: 'hiking',
    difficulty: 'O‘rtacha (Moderate) 🟡',
    duration: '1 kun',
    price: 240000,
    originalPrice: 280000,
    date: '26-Sentyabr, Shanba',
    departureTime: '06:00',
    departureLocation: 'Pushkin metro bekati',
    maxSeats: 20,
    bookedSeats: 17,
    organizer: 'EcoNomad Travelers (Reyting: ⭐ 4.8)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: "Tog‘lar bag‘ridagi firuza va zumrad rangli ikkita ko‘l. O‘zbekistonning eng mashhur fotogenik joyi."
  },
  {
    id: 'zomin-kembing',
    title: 'Zomin Qoraqayin O‘rmoni — 2 Kunlik Chodirli Kembing',
    destination: 'Zomin, Jizzax',
    category: 'camping',
    difficulty: 'Yengil (Easy) 🟢',
    duration: '2 kun / 1 tun',
    price: 590000,
    originalPrice: 680000,
    date: '3-4 Oktyabr (Shanba-Yakshanba)',
    departureTime: '06:30',
    departureLocation: 'Olmazor metro bekati',
    maxSeats: 16,
    bookedSeats: 11,
    organizer: 'CampLife Uzbekistan (Reyting: ⭐ 4.9)',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    description: "Yulduzlar ostida gulxan atrofida suhbatlar, archazor o'rmonlar, osma ko'prik va toza tog' shabadasi."
  },
  {
    id: 'pulatxon-plato',
    title: 'Pulatxon Platosi — Sirli Afsonalar Makoni',
    destination: 'Chotqol tog‘lari',
    category: 'extreme',
    difficulty: 'Juda murakkab (Extreme) 🟣',
    duration: '3 kun',
    price: 950000,
    originalPrice: 1100000,
    date: '10-12 Oktyabr',
    departureTime: '05:00',
    departureLocation: 'Buyuk Ipak Yo‘li metrosi',
    maxSeats: 10,
    bookedSeats: 7,
    organizer: 'Extreme Trek Club (Reyting: ⭐ 5.0)',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: "O'zbekistonning eng sirli va yetib borish qiyin bo'lgan tekislik platosi. Faqat chiniqqan sayohatchilar uchun."
  }
];

export function findTourById(id) {
  if (!id) return null;
  const cleanId = id.replace(/^tour_/, '').replace(/^tour-/, '');
  return BOT_TOURS.find(t => 
    t.id === cleanId || 
    t.id === `tour-${cleanId}` || 
    t.id.includes(cleanId) ||
    cleanId.includes(t.id)
  ) || null;
}
