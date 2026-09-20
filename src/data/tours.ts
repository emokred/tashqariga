import { Tour } from '@/types';

export const INITIAL_TOURS: Tour[] = [
  {
    id: 'tour-soqoq-sharshara',
    title: "So'qoq Sharsharasi & Soya Oromgohi Safarlari",
    slug: 'soqoq-sharshara',
    destination: "So'qoq",
    region: 'Toshkent viloyati, Parkent tumani',
    category: 'hiking',
    segment: 'standard',
    difficulty: 'easy',
    durationDays: 1,
    price: 190000,
    originalPrice: 230000,
    date: '2026-09-26',
    displayDate: '26-Sentyabr, Shanba',
    departureTime: '07:30',
    departureLocation: "Buyuk Ipak Yo'li metro bekati (Mo'ljal: Salar)",
    returnTime: '19:30',
    returnLocation: "Buyuk Ipak Yo'li metro bekati",
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    maxSeats: 18,
    bookedSeats: 14,
    shortDescription: "Toza archazorlar havosi, muzdek sharshara va mashhur So'qoq kabobi bilan yakunlanuvchi yengil tog' sayohati.",
    fullDescription: "So'qoq — shahar shovqinidan qochish va butun oila yoki do'stlar bilan toza tabiat qo'ynida dam olish uchun eng qulay marshrut. Yo'l unchalik qiyin emas, maxsus tayyorgarlik talab qilinmaydi. Marshrut davomida qadimiy archazorlar, musaffo tog' soy va sharshara bo'ylab piyoda yuramiz.",
    included: [
      'Qulay Mercedes Sprinter transporti',
      "Sertifikatlangan tog' gidi va hamrohi",
      'Tog‘da xushbo‘y damlangan choy va shirinliklar',
      'Guruh uchun professional fotosessiya',
      'Tibbiy birinchi yordam aptechkasi'
    ],
    notIncluded: [
      "So'qoq choyxonasida tushlik (har kim xohishiga ko'ra)",
      'Shaxsiy xarajatlar'
    ],
    whatToBring: [
      "Qulay sport poyabzali (toshli yo'lga mos)",
      'Kamida 1.5 litr ichimlik suvi',
      'Quyoshdan himoyalovchi bosh kiyim va ko\'zoynak',
      'Yengil shamolga chidamli kurtka yoki sviter',
      'Kichik qulay ryukzak'
    ],
    organizer: {
      id: 'org-1',
      name: 'Sharq Trek Expedition',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+998 90 123 45 67',
      telegram: '@sharqtrek_uz',
      rating: 4.9,
      reviewsCount: 128,
      isVerified: true,
      tripsCompleted: 84
    },
    itinerary: [
      { time: '07:30', title: 'Yig‘ilish va jo‘nash', description: 'Buyuk Ipak Yo‘li metrosida yig‘ilamiz va So‘qoq sari yo‘lga chiqamiz' },
      { time: '09:00', title: 'So‘qoqqa yetib borish', description: 'Qisqa instruktaj va chigalyozdi mashqlari' },
      { time: '09:30', title: 'Trekking start', description: 'Archazor o‘rmoni va tog‘ soyi bo‘ylab sharshara tomon harakat' },
      { time: '12:30', title: 'Sharshara va foto-taym', description: 'Sharshara oldida dam olish, suratga tushish va tog‘ choyi' },
      { time: '15:00', title: 'Mashhur So‘qoq tushligi', description: 'Mahalliy choyxonada mashhur So‘qoq somsasi va kabobidan bahramand bo‘lish' },
      { time: '18:00', title: 'Toshkentga qaytish', description: 'Xotirjam va zavqli taassurotlar bilan shaharga qaytish' }
    ],
    isFeatured: true,
    isDemo: true,
    tgGroupLink: 'https://t.me/tashqarigauz'
  },
  {
    id: 'tour-chimyon-choqqisi',
    title: 'Katta Chimyon Choqqisi (3309m) Ekotrek',
    slug: 'katta-chimyon-choqqisi',
    destination: 'Chimyon',
    region: 'Toshkent viloyati, Bo‘stonliq',
    category: 'hiking',
    segment: 'gold',
    difficulty: 'hard',
    durationDays: 1,
    price: 350000,
    originalPrice: 400000,
    date: '2026-09-27',
    displayDate: '27-Sentyabr, Yakshanba',
    departureTime: '05:30',
    departureLocation: 'Milliy bog‘ metro bekati (Oliy Majlis qarshisi)',
    returnTime: '21:00',
    returnLocation: 'Milliy bog‘ metro bekati',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    ],
    maxSeats: 15,
    bookedSeats: 12,
    shortDescription: "O'zbekistonning eng mashhur cho'qqisi 3309 metr balandlikni zabt etish! Kuchli iroda va tog' manzaralari.",
    fullDescription: "Katta Chimyon cho'qqisi — har bir tog' ishqibozi o'z kuchini sinab ko'rishi kerak bo'lgan afsonaviy marshrut. Tajribali instruktorlar hamrohligida xavfsiz va maroqli ko'tarilish. Tepadan Chorbog' suv ombori va qorli cho'qqilar kaftdek ko'rinadi.",
    included: [
      'Konditsionerli qulay mikroavtobus',
      'Professional alpiniyst instruktorlar (2 ta yo‘lboshchi)',
      'Tog‘ trekking tayoqchalari (trekking poles)',
      'Energetik yengil quruq mevalar va shokoladlar to‘plami',
      'Tog‘da qaynatilgan tog‘ o‘tli choy',
      'Rasmiy ekologik ruxsatnomalar to‘lovi'
    ],
    notIncluded: [
      'Asosiy tushlik uchun yegulik (ryukzakka olib olinadi)',
      'Shaxsiy alpinistik anjomlar'
    ],
    whatToBring: [
      'Haqiqiy trekking botinkasi (sirg‘anmaydigan protektorli)',
      'Kamida 2 litr toza suv + termosda issiq choy',
      'Issiq kiyimlar (cho‘qqida shamol va sovuq bo‘ladi)',
      'Trekking qo‘lqoplari',
      'Poverbank va hujjat (pasport/ID)'
    ],
    organizer: {
      id: 'org-2',
      name: 'Chimgan Peak Guides',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      phone: '+998 93 456 78 90',
      telegram: '@chimgan_guides',
      rating: 5.0,
      reviewsCount: 94,
      isVerified: true,
      tripsCompleted: 112
    },
    itinerary: [
      { time: '05:30', title: 'Tonggi jo‘nash', description: 'Toshkentdan Chimyon tomon erta yo‘lga chiqamiz' },
      { time: '07:30', title: 'Chimyon bazasi', description: 'Yo‘riqnoma va ko‘tarilishni boshlash' },
      { time: '12:00', title: 'G‘arbiy qir va 3000m marrasi', description: 'Chorbog‘ manzaralari fonida qisqa tanaffus' },
      { time: '13:30', title: 'Cho‘qqi (3309m)!', description: 'Zabt etish onlari, bayroq bilan suratlar va bayramona tog‘ choyi' },
      { time: '15:00', title: 'Xavfsiz tushish', description: 'Instruktorlar nazorati ostida pastga tushish' },
      { time: '21:00', title: 'Toshkentga yetib kelish', description: 'Unutilmas g‘alaba hissi bilan uyga qaytish' }
    ],
    isFeatured: true,
    isDemo: true,
    tgGroupLink: 'https://t.me/tashqarigauz'
  },
  {
    id: 'tour-urungach-nefrit',
    title: 'Urungach Nefrit Ko‘llari — Kristal Suvlar Mo‘jizasi',
    slug: 'urungach-nefrit-kollari',
    destination: 'Urungach',
    region: 'Toshkent viloyati, Ugom-Chotqol milliy bog‘i',
    category: 'hiking',
    segment: 'standard',
    difficulty: 'moderate',
    durationDays: 1,
    price: 240000,
    originalPrice: 280000,
    date: '2026-09-26',
    displayDate: '26-Sentyabr, Shanba',
    departureTime: '06:00',
    departureLocation: 'Pushkin metro bekati (Salar kanali bo‘yi)',
    returnTime: '21:30',
    returnLocation: 'Pushkin metro bekati',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1439853941329-a99ce049f002?auto=format&fit=crop&w=1200&q=80',
    ],
    maxSeats: 20,
    bookedSeats: 17,
    shortDescription: "Tog‘lar bag‘ridagi firuza va zumrad rangli ikkita ko‘l. O‘zbekistonning eng mashhur fotogenik joyi.",
    fullDescription: "Urungach ko'li o'zining misli ko'rilmagan nefrit rangi bilan sayyohlarni maftun etadi. Pastki ko'ldan yuqori ko'lga qadar piyoda sayr qilib, qadimiy yong'oqzorlar va qorli cho'qqilar manzaralaridan bahramand bo'lamiz.",
    included: [
      'Toshkent - Urungach - Toshkent transferi',
      'Ugom-Chotqol qoriqxona ekologik post to‘lovlari',
      'Gid hamrohligi va qiziqarli afsonalar hikoyasi',
      'Piknik uchun choy va kofe',
      'GoPro orqali qisqa video-rolik'
    ],
    notIncluded: [
      'Piknik tushligi (har bir ishtirokchi o‘zi bilan oladi)'
    ],
    whatToBring: [
      'Qulay krossovka yoki trekking oyoq kiyimi',
      'Zaxira kiyim va sochiq',
      '1.5-2 litr suv',
      'Yengil tamaddi (sendvich, meva)',
      'Pasport/ID karta (chegara hududi uchun majburiy)'
    ],
    organizer: {
      id: 'org-3',
      name: 'EcoNomad Travelers',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      phone: '+998 97 789 01 23',
      telegram: '@economad_uz',
      rating: 4.8,
      reviewsCount: 76,
      isVerified: true,
      tripsCompleted: 52
    },
    itinerary: [
      { time: '06:00', title: 'Jo‘nash', description: 'Tong saharda Toshkentdan chiroyli yo‘lga chiqish' },
      { time: '09:30', title: 'Ekopost va start', description: 'Urungach boshlanish nuqtasiga yetib borish' },
      { time: '10:30', title: 'Quyi Nefrit ko‘li', description: 'Ko‘l bo‘yida dam olish va estetik fotosessiya' },
      { time: '12:00', title: 'Yuqori ko‘l sari yurish', description: 'Tog‘ so‘qmoqlari bo‘ylab yuqoriga ko‘tarilish' },
      { time: '13:30', title: 'Katta ko‘l va piknik', description: 'Firuza suv bo‘yida ovqatlanish va dam olish' },
      { time: '17:00', title: 'Pastga tushish va qaytish', description: 'Avtobus tomon yurish va Toshkent sari yo‘l' }
    ],
    isFeatured: true,
    isDemo: true,
    tgGroupLink: 'https://t.me/tashqarigauz'
  },
  {
    id: 'tour-zomin-kembing',
    title: 'Zomin Qoraqayin O‘rmoni — 2 Kunlik Chodirli Kembing',
    slug: 'zomin-2-kunlik-kembing',
    destination: 'Zomin',
    region: 'Jizzax viloyati, Zomin milliy bog‘i',
    category: 'camping',
    segment: 'premium',
    difficulty: 'easy',
    durationDays: 2,
    price: 590000,
    originalPrice: 680000,
    date: '2026-10-03',
    displayDate: '3-4 Oktyabr (Shanba-Yakshanba)',
    departureTime: '06:30',
    departureLocation: 'Olmazor metro bekati',
    returnTime: '20:00',
    returnLocation: 'Olmazor metro bekati',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
    ],
    maxSeats: 16,
    bookedSeats: 11,
    shortDescription: "O'zbekiston Shveytsariyasida tunash: gulxan atrofida gitara navolari, yulduzli osmon va qadimiy archazorlar.",
    fullDescription: "Zomin tog'larining toza archa havosi, osma ko'prik, sharsharalar va eng asosiysi — tunni osmon to'la yulduzlar ostida, gulxan atrofidagi iliq suhbatlar bilan o'tkazish. Biz sizga chodir, uxlash qopi va to'liq lager anjomlarini taqdim etamiz.",
    included: [
      'Qulay konditsionerli yo‘lovchi transporti',
      'Professional 2-3 kishilik chodirlar va uxlash qoplari (spalnik)',
      'Karematlar (yumshoq gilamchalar)',
      'Oshpaz tomonidan tayyorlangan 3 mahal issiq taom va shashlik',
      'Gulxan atrofida jonli gitara va marshmallow qovurish',
      'Osma ko‘prik va kanyonlarga sayohat',
      'Milliy bog‘ to‘lovlari'
    ],
    notIncluded: [
      'Shaxsiy xaridlar va esdalik sovg‘alari'
    ],
    whatToBring: [
      'Issiq tun kiyimi (termo-ichki kiyim, shapka)',
      'Qulay trekking krossovkasi',
      'Gigiyena vositalari va sochiq',
      'Poverbank va fonarik',
      'Shaxsiy kupa (krujka) va qoshiq'
    ],
    organizer: {
      id: 'org-4',
      name: 'CampLife Uzbekistan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      phone: '+998 90 999 88 77',
      telegram: '@camplife_uz',
      rating: 4.9,
      reviewsCount: 142,
      isVerified: true,
      tripsCompleted: 68
    },
    itinerary: [
      { time: '1-kun 06:30', title: 'Toshkentdan yo‘lga chiqish', description: 'Zomin sari qulay avtobusda harakat' },
      { time: '1-kun 11:30', title: 'Zominga yetib kelish', description: 'Lager maydoniga chodirlarni o‘rnatish va dam olish' },
      { time: '1-kun 13:30', title: 'Milliy tushlik', description: 'Zomin tandir go‘shti va tog‘ salatlari' },
      { time: '1-kun 15:30', title: 'Osma ko‘prik & Kanyon', description: 'Mashhur shisha osma ko‘prikdan o‘tish' },
      { time: '1-kun 19:30', title: 'Gulxan kechasi va shashlik', description: 'Yulduzlar ostida suhbatlar, gitara va do‘stona muhit' },
      { time: '2-kun 08:30', title: 'Tonggi nonushta', description: 'Qaymoq va issiq non bilan tog‘ nonushtasi' },
      { time: '2-kun 10:00', title: 'Bobo-Yong‘oq daraxti', description: 'Ming yillik qadimiy daraxt va sharsharaga sayr' },
      { time: '2-kun 15:00', title: 'Toshkent sari yo‘l', description: 'Dam olgan va tetik kayfiyatda shaharga qaytish' }
    ],
    isFeatured: true,
    isDemo: true,
    tgGroupLink: 'https://t.me/tashqarigauz'
  },
  {
    id: 'tour-lashkerek-kanyon',
    title: 'Lashkerek Kanyoni va Oltin Kon Sharsharasi',
    slug: 'lashkerek-kanyoni',
    destination: 'Lashkerek',
    region: 'Toshkent viloyati, Angren yaqinida',
    category: 'hiking',
    segment: 'standard',
    difficulty: 'moderate',
    durationDays: 1,
    price: 220000,
    originalPrice: 260000,
    date: '2026-09-27',
    displayDate: '27-Sentyabr, Yakshanba',
    departureTime: '07:00',
    departureLocation: 'Buyuk Ipak Yo‘li metro bekati',
    returnTime: '19:00',
    returnLocation: 'Buyuk Ipak Yo‘li metro bekati',
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    maxSeats: 18,
    bookedSeats: 15,
    shortDescription: "Qizil qoyalar, tor kanyonlar va tarixiy qadimiy oltin yuvish konlari bo'ylab hayajonli sarguzasht.",
    fullDescription: "Lashkerek — o'ziga xos tosh shakllari va go'zal darasi bilan boshqa tog'lardan ajralib turadi. Bu yerda siz haqiqiy yovvoyi tabiat nafasi va shovullab oquvchi musaffo soyni his qilasiz.",
    included: [
      'Transfer (mikroavtobus)',
      'Tog‘ yo‘lboshchisi',
      'Tog‘da issiq choy va shirinliklar',
      'Suratga olish xizmati'
    ],
    notIncluded: [
      'Tushlik (har kim o‘zi bilan oladi)'
    ],
    whatToBring: [
      'Sirpanmaydigan krossovka',
      'Quyosh kremi va ko\'zoynak',
      '1.5L suv',
      'Yengil yegulik'
    ],
    organizer: {
      id: 'org-1',
      name: 'Sharq Trek Expedition',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      phone: '+998 90 123 45 67',
      telegram: '@sharqtrek_uz',
      rating: 4.9,
      reviewsCount: 128,
      isVerified: true,
      tripsCompleted: 84
    },
    itinerary: [
      { time: '07:00', title: 'Jo‘nash', description: 'Angren tomon yo‘lga chiqish' },
      { time: '09:00', title: 'Kanyon og‘zi', description: 'Piyoda trekkingni boshlash' },
      { time: '12:30', title: 'Sharshara va darada dam olish', description: 'Piknik va fotosessiya' },
      { time: '16:30', title: 'Mashinaga qaytish', description: 'Toshkent sari harakat' }
    ],
    isDemo: true,
    tgGroupLink: 'https://t.me/tashqarigauz'
  },
  {
    id: 'tour-boysun-kanyon',
    title: 'Boysun Mo‘jizalari: Teshiktosh, Qizil Kanyon & Omonxona',
    slug: 'boysun-mojizalari',
    destination: 'Boysun',
    region: 'Surxondaryo viloyati',
    category: 'extreme',
    segment: 'gold',
    difficulty: 'moderate',
    durationDays: 2,
    price: 790000,
    originalPrice: 890000,
    date: '2026-10-10',
    displayDate: '10-11 Oktyabr (2 Kunlik)',
    departureTime: '06:00',
    departureLocation: 'Toshkent Janubiy Vokzali (Afrosiyob poyezdi)',
    returnTime: '22:30',
    returnLocation: 'Toshkent Janubiy Vokzali',
    images: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
    maxSeats: 12,
    bookedSeats: 8,
    shortDescription: "YUNESKO merosi, Mars sayyorasiga o'xshash qizil kanyonlar va ming dardga davo shifobaxsh buloqlar.",
    fullDescription: "Boysun — O'zbekistonning eng sirli va afsonaviy o'lkasi. Neandertal odami izi qolgan Teshiktosh g'ori, Qizil kanyon va qadimiy madaniyat bilan tanishuv. Haqiqiy sarguzasht sevuvchilar uchun ideal tanlov.",
    included: [
      'Poyezd chiptalari (Afrosiyob / Sharq)',
      'Boysun ichida qulay yo‘ltanlamas (4x4) transportlar',
      'Mehmon uyida (Guesthouse) tunash',
      'Barcha taomlar (Milliy Surxondaryo tandir va sho‘rva)',
      'Tarixchi gid va arxeologik ekskursiyalar'
    ],
    notIncluded: [
      'Shaxsiy xaridlar'
    ],
    whatToBring: [
      'Qulay piyoda poyabzali',
      'Pasport/ID',
      'Zaryadlash qurilmasi',
      'Kamera yoki xotirasi bo‘sh smartfon'
    ],
    organizer: {
      id: 'org-5',
      name: 'Surkhan Discovery',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      phone: '+998 91 234 56 78',
      telegram: '@surkhandiscovery',
      rating: 5.0,
      reviewsCount: 45,
      isVerified: true,
      tripsCompleted: 39
    },
    itinerary: [
      { time: '1-kun 08:00', title: 'Poyezdda yetib kelish', description: 'Surxondaryoga yetib kelish va nonushta' },
      { time: '1-kun 11:00', title: 'Qizil Kanyon ekspeditsiyasi', description: 'Mars manzaralarini eslatuvchi kanyon bo‘ylab yurish' },
      { time: '1-kun 15:00', title: 'Omonxona bulog‘i', description: 'Shifobaxsh mineral buloq va dam olish' },
      { time: '2-kun 09:00', title: 'Teshiktosh g‘ori', description: 'Tarixiy manzilga chiqish' },
      { time: '2-kun 16:00', title: 'Toshkent sari poyezd', description: 'Unutilmas taassurotlar bilan qaytish' }
    ],
    isDemo: true,
    tgGroupLink: 'https://t.me/tashqarigauz'
  }
];
