/**
 * Tashqariga.uz — Bot Buyruqlari va WebApp Menyu Tugmasini sozlash skripti
 * 
 * Telegram BotFather ga qo'lda yozib o'tirmasdan, ushbu skript orqali
 * barcha komandalarni va pastdagi WebApp Menyu tugmasini 1 soniyada o'rnatish mumkin.
 */

import { Bot } from 'grammy';
import dotenv from 'dotenv';
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://tashqariga.uz';

if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
  console.error('❌ Xatolik: BOT_TOKEN aniqlanmadi. Iltimos, .env faylini to\'ldiring!');
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

async function setupBot() {
  console.log('🔄 Telegram BotFather komandalari va Menu Button o\'rnatilmoqda...');

  try {
    // 1. Komandalar ro'yxatini sozlash
    await bot.api.setMyCommands([
      { command: 'start', description: '🏔️ Asosiy menyu va Mini App' },
      { command: 'turlar', description: '🎒 Ommabop tog\' turlari katalogi' },
      { command: 'referral', description: '🎁 Do\'stlarni taklif qilish (+30k)' },
      { command: 'mybookings', description: '🎟️ Mening sayohat chiptalarim' },
      { command: 'partner', description: '🧗‍♂️ Gidlar va turoperatorlar portali' },
      { command: 'help', description: '💬 Yordam va 24/7 aloqa' },
      { command: 'admin', description: '⚙️ Boshqaruv statistikasi (admin)' },
    ]);
    console.log('✅ 1. Bot komandalari muvaffaqiyatli saqlandi!');

    // 2. Chat Menu Button (Pastdagi doimiy WebApp tugmasi)
    await bot.api.setChatMenuButton({
      menu_button: {
        type: 'web_app',
        text: '🏔️ Tashqariga',
        web_app: {
          url: WEBAPP_URL
        }
      }
    });
    console.log(`✅ 2. WebApp Menyu tugmasi (${WEBAPP_URL}) muvaffaqiyatli faollashtirildi!`);

    // 3. Bot tavsiflari (Description va Short Description)
    try {
      await bot.api.setMyDescription(
        "Tashqariga.uz — O‘zbekistondagi tog‘ sayohatlari, hiking va kemping agregatori! 🏔️🥾\n\nEng sara tog' turlarini toping, 1 daqiqada chipta oling va 5% keshbekka ega bo'ling."
      );
      await bot.api.setMyShortDescription(
        "O'zbekiston tog'lari, hiking va kemping sarguzashtlari Mini App-i 🏔️"
      );
      console.log('✅ 3. Bot "Description" va "About" ma\'lumotlari yangilandi!');
    } catch (e) {
      console.log('ℹ️ Tavsiflarni yangilashda ogohlantirish:', e.message);
    }

    console.log('\n🎉 BARCHASI TAYYOR! Telegramda botingizni ochib tekshirishingiz mumkin.');
  } catch (error) {
    console.error('❌ Xatolik yuz berdi:', error.message);
  }
}

setupBot();
