import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Standart boshlang'ich baza strukturasi
const DEFAULT_DB = {
  users: {},
  bookings: [],
  partnerApplications: [],
  stats: {
    totalUsers: 0,
    totalBookings: 0,
    totalMountainCoinsDistributed: 0
  }
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
      return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Baza o\'qishda xatolik:', error);
    return DEFAULT_DB;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Bazaga yozishda xatolik:', error);
  }
}

export const db = {
  // Foydalanuvchini olish yoki yangi ro'yxatdan o'tkazish
  getOrCreateUser(telegramUser, referrerId = null) {
    const data = readDb();
    const userId = String(telegramUser.id);
    let isNew = false;
    let awardedReferrer = null;

    if (!data.users[userId]) {
      isNew = true;
      let validReferrer = null;

      // Agar referral orqali kirgan bo'lsa va o'zini o'zi taklif qilmagan bo'lsa
      if (referrerId && String(referrerId) !== userId && data.users[String(referrerId)]) {
        validReferrer = String(referrerId);
        // Do'stni chaqirgan shaxsga 30,000 MountainCoin mukofot berish
        data.users[validReferrer].mountainCoins = (data.users[validReferrer].mountainCoins || 0) + 30000;
        data.users[validReferrer].referralCount = (data.users[validReferrer].referralCount || 0) + 1;
        awardedReferrer = data.users[validReferrer];
        data.stats.totalMountainCoinsDistributed += 30000;
      }

      data.users[userId] = {
        id: userId,
        firstName: telegramUser.first_name || '',
        lastName: telegramUser.last_name || '',
        username: telegramUser.username ? `@${telegramUser.username}` : '',
        mountainCoins: 30000, // Yangi a'zoga xush kelibsiz bonusi: 30,000 so'm
        referredBy: validReferrer,
        referralCount: 0,
        createdAt: new Date().toISOString()
      };

      data.stats.totalUsers += 1;
      data.stats.totalMountainCoinsDistributed += 30000;
      writeDb(data);
    }

    return {
      user: data.users[userId],
      isNew,
      awardedReferrer
    };
  },

  getUser(userId) {
    const data = readDb();
    return data.users[String(userId)] || null;
  },

  updateUserPhone(userId, phone) {
    const data = readDb();
    const uid = String(userId);
    if (data.users[uid]) {
      data.users[uid].phone = phone;
      writeDb(data);
    }
  },

  getAllUsers() {
    const data = readDb();
    return Object.values(data.users);
  },

  // Yangi buyurtmani qayd qilish
  saveBooking(booking) {
    const data = readDb();
    const id = booking.id || `TSH-${Date.now().toString().slice(-6)}`;
    const newBooking = {
      ...booking,
      id,
      ticketNumber: booking.ticketNumber || `TSH-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: booking.createdAt || new Date().toISOString(),
      status: booking.status || 'confirmed'
    };

    data.bookings.unshift(newBooking);
    data.stats.totalBookings += 1;
    writeDb(data);
    return newBooking;
  },

  getBookingsByTelegramId(userId) {
    const data = readDb();
    const userStr = String(userId);
    return data.bookings.filter(b => String(b.telegramId) === userStr || b.customerTelegram === `@${userStr}`);
  },

  getAllBookings() {
    const data = readDb();
    return data.bookings;
  },

  // Hamkorlik arizasini saqlash
  savePartnerApplication(application) {
    const data = readDb();
    const newApp = {
      ...application,
      id: `partner-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    data.partnerApplications.unshift(newApp);
    writeDb(data);
    return newApp;
  },

  getStats() {
    const data = readDb();
    return {
      ...data.stats,
      activeTours: 5,
      totalPartnerApplications: data.partnerApplications.length
    };
  }
};
