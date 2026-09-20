/**
 * ==============================================================================
 * Tashqariga.uz — Rasmiy Telegram Bot & Mini App Servisi
 * ==============================================================================
 * 
 * Muallif: Tashqariga.uz Engineering Team
 * Tavsif: O'zbekistondagi tog' sayohatlari, hiking va kemping agregatorining
 *        Telegram Mini App integratsiyasi, referral tizimi, buyurtma bildirishnomalari
 *        va gidlar uchun B2B portali.
 */

import { Bot, InlineKeyboard, Keyboard } from 'grammy';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { BOT_TOURS, findTourById } from './data/toursData.js';
import { db } from './data/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Muhit o'zgaruvchilari
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://tashqariga.uz';
const BOT_USERNAME = process.env.BOT_USERNAME || 'tashqariga_bot';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '';
const CEO_TELEGRAM = process.env.CEO_TELEGRAM || '@tashqariga_ceo';
const PORT = process.env.PORT || 3001;

if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
  console.warn('\n⚠️  DIQQAT: .env faylida BOT_TOKEN ko\'rsatilmagan!');
  console.warn('Telegram Botni ishga tushirish uchun BotFather bergan tokenni .env fayliga kiriting.\n');
}

// Bot instansiyasini yaratish
const bot = new Bot(BOT_TOKEN || 'dummy_token_for_validation');

// Vaqtinchalik sessiya holatlari (Gidlar arizasi uchun)
const guideApplicationSessions = new Map();

// ==============================================================================
// 1. KLAVIATURALAR VA TUGMALAR (KEYBOARDS)
// ==============================================================================

/**
 * Asosiy Start menyusi uchun chiroyli tog' mavzusidagi inline klaviatura
 */
function getMainInlineKeyboard(userId) {
  return new InlineKeyboard()
    .webApp('🏔️ Tashqariga Mini App-ni ochish', WEBAPP_URL)
    .row()
    .text('🎒 Ommabop Turlar', 'action_turlar')
    .text('🎟️ Chiptalarim', 'action_mybookings')
    .row()
    .text('🎁 Do\'stlarni taklif qilish (+30k)', 'action_referral')
    .text('🧗‍♂️ Gidlar & Hamkorlar', 'action_partner')
    .row()
    .text('💬 Yordam & Qo\'llab-quvvatlash', 'action_help')
    .url('🌐 Saytga o\'tish', WEBAPP_URL);
}

/**
 * Turlar ro'yxati uchun navigatsiya inline klaviaturasi
 */
function getToursKeyboard() {
  const keyboard = new InlineKeyboard();
  
  BOT_TOURS.forEach((tour) => {
    keyboard.text(`🏔️ ${tour.destination}: ${tour.price.toLocaleString('uz-UZ')} so'm`, `tour_detail_${tour.id}`).row();
  });

  keyboard
    .webApp('🔍 Barcha turlarni Mini Appda ko\'rish', WEBAPP_URL)
    .row()
    .text('⬅️ Asosiy menyuga qaytish', 'action_main_menu');

  return keyboard;
}

// ==============================================================================
// 2. BILDIRISHNOMALAR (ADMIN & GID NOTIFICATIONS)
// ==============================================================================

/**
 * Yangi buyurtma tushganda Admin va Gidga xabar jo'natish
 */
export async function sendAdminBookingNotification(booking) {
  if (!ADMIN_CHAT_ID) {
    console.warn('Admin chat ID belgilanmagan. Bildirishnoma konsolga chiqarildi:', booking);
    return false;
  }

  const seats = booking.seatsCount || 1;
  const totalPrice = Number(booking.totalPrice || 0).toLocaleString('uz-UZ');
  const ticketNo = booking.ticketNumber || `TSH-${Math.floor(100000 + Math.random() * 900000)}`;

  const message = 
`🛎️ <b>YANGI BUYURTMA QABUL QILINDI!</b> 🏔️
━━━━━━━━━━━━━━━━━━━━
🎫 <b>Chipta raqami:</b> <code>#${ticketNo}</code>
🏔️ <b>Tur:</b> <b>${escapeHtml(booking.tourTitle || 'Noma\'lum tur')}</b>
📍 <b>Manzil:</b> ${escapeHtml(booking.tourDestination || 'Toshkent viloyati')}
🗓️ <b>Sana & Vaqt:</b> ${escapeHtml(booking.tourDate || 'Belgilanmagan')} | ${escapeHtml(booking.departureTime || '07:00')}
🚌 <b>Uchrashuv joyi:</b> ${escapeHtml(booking.departureLocation || 'Metro bekati')}

👤 <b>Mijoz:</b> ${escapeHtml(booking.customerName || 'Noma\'lum')}
📞 <b>Telefon:</b> <a href="tel:${booking.customerPhone}">${escapeHtml(booking.customerPhone || 'Kiritilmagan')}</a>
✈️ <b>Telegram:</b> ${booking.customerTelegram ? escapeHtml(booking.customerTelegram) : '<i>Ko\'rsatilmagan</i>'}

👥 <b>O'rinlar soni:</b> ${seats} kishi
💵 <b>Jami to'lov:</b> <b>${totalPrice} so'm</b>
💳 <b>To'lov turi:</b> ${escapeHtml(booking.paymentMethod || 'Click / Payme')}
⚡ <b>Holati:</b> ✅ Tasdiqlangan va bron qilingan
━━━━━━━━━━━━━━━━━━━━
<i>Tashqariga.uz avtomatlashtirilgan bron qilish tizimi</i>`;

  const keyboard = new InlineKeyboard()
    .text('✅ Qabul qilindi', `booking_ack_${ticketNo}`)
    .row();

  if (booking.customerTelegram && booking.customerTelegram.startsWith('@')) {
    keyboard.url('💬 Mijozga yozish', `https://t.me/${booking.customerTelegram.replace('@', '')}`);
  }

  try {
    await bot.api.sendMessage(ADMIN_CHAT_ID, message, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
    return true;
  } catch (err) {
    console.error('Admin bildirishnomasini yuborishda xatolik:', err);
    return false;
  }
}

/**
 * Gidlar va turoperatorlardan yangi hamkorlik arizasi kelganda adminga xabar jo'natish
 */
export async function sendAdminPartnerNotification(application) {
  if (!ADMIN_CHAT_ID) {
    console.warn('Admin chat ID yo\'q. Ariza:', application);
    return false;
  }

  const message = 
`🧗‍♂️ <b>YANGI GID / HAMKOR ARIZASI!</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Gid / Tashkilot:</b> <b>${escapeHtml(application.name)}</b>
📞 <b>Telefon:</b> <a href="tel:${application.phone}">${escapeHtml(application.phone)}</a>
✈️ <b>Telegram:</b> ${escapeHtml(application.telegram || 'Ko\'rsatilmagan')}
🏔️ <b>Yo'nalishlari:</b> ${escapeHtml(application.regions || 'Chimyon, Beldersoy, Zomin')}
⭐ <b>Tajribasi:</b> ${escapeHtml(application.experience || '1-3 yil')}
📝 <b>Qo'shimcha izoh:</b> ${escapeHtml(application.comment || 'Mavjud emas')}
━━━━━━━━━━━━━━━━━━━━
<i>Hamkorlikni tasdiqlash uchun quyidagi tugmalardan foydalaning:</i>`;

  const keyboard = new InlineKeyboard()
    .text('✅ Hamkorlikni tasdiqlash', `partner_approve_${application.id || Date.now()}`)
    .text('❌ Rad etish', `partner_reject_${application.id || Date.now()}`)
    .row();

  if (application.telegram && application.telegram.startsWith('@')) {
    keyboard.url('💬 Gidga to\'g\'ridan-to\'g\'ri yozish', `https://t.me/${application.telegram.replace('@', '')}`);
  }

  try {
    await bot.api.sendMessage(ADMIN_CHAT_ID, message, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
    return true;
  } catch (err) {
    console.error('Hamkor arizasini adminga yuborishda xatolik:', err);
    return false;
  }
}

// ==============================================================================
// 3. KOMANDALAR VA XABARLAR (COMMAND HANDLERS)
// ==============================================================================

/**
 * /start komandasi (Shuningdek deep linking: ref_123, tour_urungach, partner)
 */
bot.command('start', async (ctx) => {
  const payload = ctx.match ? ctx.match.trim() : '';
  const fromUser = ctx.from;
  const userId = fromUser.id;

  // 1. Foydalanuvchini bazaga qo'shish va referral tekshirish
  let referrerId = null;
  if (payload.startsWith('ref_')) {
    referrerId = payload.replace('ref_', '');
  }

  const { user, isNew, awardedReferrer } = db.getOrCreateUser(fromUser, referrerId);

  // Agar referral orqali kirgan bo'lsa va taklif qiluvchiga bonus berilgan bo'lsa
  if (isNew && awardedReferrer) {
    try {
      await bot.api.sendMessage(
        awardedReferrer.id,
        `🎉 <b>Ajoyib xabar!</b>\n\n` +
        `Do'stingiz <b>${escapeHtml(fromUser.first_name || 'Foydalanuvchi')}</b> sizning maxsus havolangiz orqali <b>Tashqariga.uz</b> ga qo'shildi!\n\n` +
        `💰 Sizga <b>+30,000 MountainCoin</b> taqdim etildi!\n` +
        `Joriy balansingiz: <b>${(awardedReferrer.mountainCoins || 0).toLocaleString('uz-UZ')} so'm</b>\n\n` +
        `<i>Ushbu tangalarni keyingi tog' safarlaringizda chegirma sifatida ishlatishingiz mumkin!</i> 🏔️`,
        { parse_mode: 'HTML' }
      );
    } catch (e) {
      console.log('Referrerga xabar yuborish imkoni bo\'lmadi:', e.message);
    }
  }

  // 2. Deep linking: Muayyan turni to'g'ridan-to'g'ri ochish (masalan, start tour_urungach-nefrit)
  if (payload.startsWith('tour_')) {
    const tourId = payload.replace('tour_', '');
    const tour = findTourById(tourId);

    if (tour) {
      const tourWebAppUrl = `${WEBAPP_URL}?tour=${tour.id}`;
      const tourMessage = 
`🏔️ <b>${escapeHtml(tour.title)}</b>
━━━━━━━━━━━━━━━━━━━━
📍 <b>Manzil:</b> ${escapeHtml(tour.destination)}
💵 <b>Narxi:</b> <b>${tour.price.toLocaleString('uz-UZ')} so'm</b> <s>${tour.originalPrice.toLocaleString('uz-UZ')} so'm</s>
🗓️ <b>Sana:</b> ${escapeHtml(tour.date)} | ${escapeHtml(tour.departureTime)}
🧗 <b>Murakkabligi:</b> ${tour.difficulty}
👥 <b>Bo'sh joylar:</b> ${tour.maxSeats - tour.bookedSeats} ta qoldi!
⭐ <b>Tashkilotchi:</b> ${escapeHtml(tour.organizer)}

📝 <i>${escapeHtml(tour.description)}</i>
━━━━━━━━━━━━━━━━━━━━`;

      const keyboard = new InlineKeyboard()
        .webApp('🎟️ Ushbu turni Mini Appda band qilish', tourWebAppUrl)
        .row()
        .text('🎒 Barcha turlar katalogi', 'action_turlar')
        .text('⬅️ Bosh menyu', 'action_main_menu');

      if (tour.image) {
        return ctx.replyWithPhoto(tour.image, {
          caption: tourMessage,
          parse_mode: 'HTML',
          reply_markup: keyboard
        });
      }

      return ctx.reply(tourMessage, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
    }
  }

  // 3. Deep linking: Gidlar bo'limi (start partner)
  if (payload === 'partner') {
    return handlePartnerCommand(ctx);
  }

  // 4. Standart xush kelibsiz (Welcome) xabari — Chiroyli tog' kayfiyati bilan
  const welcomeMessage = 
`Salom, <b>${escapeHtml(fromUser.first_name || 'Tog\' oshig\'i')}</b>! 🏔️🌲

<b>Tashqariga.uz</b> — O‘zbekistonning eng go‘zal cho‘qqilari, sirli sharsharalari va sokin nefrit ko‘llari bo‘ylab sarguzashtlar agregatoriga xush kelibsiz! 🥾⛺

Biz sizga eng ishonchli va tajribali tog‘ gidlarining eng sara turlarini bitta qulay platformada taqdim etamiz:
✨ <b>1 daqiqada</b> joy band qiling va QR chipta oling
💳 <b>Click & Payme</b> orqali xavfsiz to'lov
🎁 Har bir sayohat uchun <b>5% keshbek</b>
👥 Do'stlarni taklif qilib, safarga <b>bepul</b> boring!

Quyidagi <b>«🏔️ Tashqariga Mini App»</b> tugmasini bosib, sayohatlarni Telegramdan chiqmasdan kashf eting:`;

  // Mini App menyu tugmasini o'rnatish
  try {
    await ctx.setChatMenuButton({
      type: 'web_app',
      text: '🏔️ Tashqariga',
      web_app: { url: WEBAPP_URL }
    });
  } catch (err) {
    // Agar botFather orqali global o'rnatilgan bo'lsa xatolik berishi mumkin
  }

  await ctx.reply(welcomeMessage, {
    parse_mode: 'HTML',
    reply_markup: getMainInlineKeyboard(userId)
  });
});

/**
 * /turlar komandasi — Ommabop turlar ro'yxati
 */
bot.command('turlar', async (ctx) => {
  const toursListText = 
`🏔️ <b>Eng ommabop va yaqin kunlardagi sayohatlar:</b>\n
Har bir tur professional gidlar, transfer va fotosessiya bilan ta'minlangan. Turni tanlang yoki to'liq katalog va filtrlarni Mini Appda ko'ring:`;

  await ctx.reply(toursListText, {
    parse_mode: 'HTML',
    reply_markup: getToursKeyboard()
  });
});

/**
 * /referral komandasi — Do'stlarni taklif qilish va MountainCoin balansi
 */
bot.command('referral', async (ctx) => {
  await handleReferralCommand(ctx);
});

async function handleReferralCommand(ctx) {
  const userId = ctx.from.id;
  const user = db.getUser(userId) || { mountainCoins: 30000, referralCount: 0 };

  const refLink = `https://t.me/${BOT_USERNAME}?start=ref_${userId}`;
  const shareText = encodeURIComponent(
    `Salom! Men Tashqariga.uz orqali O'zbekiston tog'lariga eng sara sayohatlarni topdim 🏔️\nUshbu havola orqali kirsangiz, sizga sayohatlar uchun 30,000 so'm xush kelibsiz bonusi beriladi:`
  );
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${shareText}`;

  const message = 
`🎁 <b>DO'STLARNI TAKLIF QILING VA BEPUL SAYOHAT QILING!</b> 🏔️
━━━━━━━━━━━━━━━━━━━━
Sizning shaxsiy balansingiz: <b>${(user.mountainCoins || 0).toLocaleString('uz-UZ')} MountainCoin</b>
Taklif qilingan do'stlar: <b>${user.referralCount || 0} kishi</b>

💎 <b>QOIDALAR ODDIY:</b>
1. Har bir taklif qilgan do'stingiz uchun sizga <b>+30,000 so'm</b> bonus beriladi.
2. Do'stingiz ham ro'yxatdan o'tishi bilanoq <b>30,000 so'm</b> chegirma kuponiga ega bo'ladi!
3. Yig'ilgan tangalaringizni har qanday turning to'lovida ishlatishingiz mumkin (1 coin = 1 so'm).

🔗 <b>Sizning shaxsiy taklif havolangiz:</b>
<code>${refLink}</code>
━━━━━━━━━━━━━━━━━━━━`;

  const keyboard = new InlineKeyboard()
    .url('🚀 Do\'stlarga ulashish', shareUrl)
    .row()
    .webApp('🏔️ Tangalarni Mini Appda sarflash', WEBAPP_URL)
    .row()
    .text('⬅️ Asosiy menyuga qaytish', 'action_main_menu');

  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
}

/**
 * /partner komandasi — Gidlar va turoperatorlar uchun B2B portali
 */
bot.command('partner', async (ctx) => {
  await handlePartnerCommand(ctx);
});

async function handlePartnerCommand(ctx) {
  const message = 
`🧗‍♂️ <b>TOG' GIDLARI VA TUROPERATORLAR DIQQATIGA!</b> 🏔️
━━━━━━━━━━━━━━━━━━━━
Siz professional tog' gidi, instruktor yoki sayohat agentligimisiz?
<b>Tashqariga.uz</b> platformasi orqali har haftalik turlaringizni 10,000 dan ortiq faol tog' ishqibozlariga soting!

✨ <b>BIZNING IMKONIYATLAR:</b>
• <b>0% komissiya:</b> Yangi qo'shilgan gidlar uchun dastlabki 1 oy mutlaqo bepul!
• <b>Avtomatlashtirilgan chiptalar:</b> QR kodli chiptalar va ishtirokchilar ro'yxati.
• <b>Xavfsiz to'lov:</b> Click, Payme va Uzum orqali pullar to'g'ridan-to'g'ri hisobingizga.
• <b>Shaxsiy kabinet:</b> Joylar nazorati va tezkor boshqaruv.

Quyidagi tugmalar orqali ariza topshiring yoki loyiha asoschisi bilan to'g'ridan-to'g'ri bog'laning:`;

  const keyboard = new InlineKeyboard()
    .text('📝 Gid sifatida ariza topshirish', 'action_apply_guide')
    .row()
    .url('💬 CEO bilan to\'g\'ridan-to\'g\'ri aloqa', `https://t.me/${CEO_TELEGRAM.replace('@', '')}`)
    .row()
    .webApp('💼 Gidlar Portalini Mini Appda ochish', `${WEBAPP_URL}?portal=partner`)
    .row()
    .text('⬅️ Asosiy menyuga qaytish', 'action_main_menu');

  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
}

/**
 * /mybookings komandasi — Mening chiptalarim
 */
bot.command('mybookings', async (ctx) => {
  await handleMyBookings(ctx);
});

async function handleMyBookings(ctx) {
  const userId = ctx.from.id;
  const userBookings = db.getBookingsByTelegramId(userId);

  if (userBookings.length === 0) {
    const emptyText = 
`🎟️ <b>Sizda hozircha faol chiptalar mavjud emas.</b>

Go'zal tog' cho'qqilari sizni kutmoqda! Yaqin kunlardagi qulay marshrutlardan birini tanlang va unutilmas xotiralarga ega bo'ling.`;

    const keyboard = new InlineKeyboard()
      .webApp('🏔️ Turlarni ko\'rish va bron qilish', WEBAPP_URL)
      .row()
      .text('🎒 Ommabop turlar ro\'yxati', 'action_turlar')
      .text('⬅️ Bosh menyu', 'action_main_menu');

    return ctx.reply(emptyText, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
  }

  let text = `🎟️ <b>Sizning faol buyurtmalaringiz va chiptalaringiz (${userBookings.length} ta):</b>\n━━━━━━━━━━━━━━━━━━━━\n`;

  userBookings.forEach((b, idx) => {
    text += `<b>${idx + 1}. #${b.ticketNumber} — ${escapeHtml(b.tourTitle)}</b>\n`;
    text += `🗓️ Sana: ${escapeHtml(b.tourDate)} | ⏰ ${escapeHtml(b.departureTime)}\n`;
    text += `👥 O'rinlar: ${b.seatsCount} kishi | 💵 ${Number(b.totalPrice).toLocaleString('uz-UZ')} so'm\n`;
    text += `⚡ Holati: ✅ ${b.status}\n\n`;
  });

  text += `Chiptangizning to'liq QR kodini va marshrut xaritasini Mini App ichida ko'rishingiz mumkin:`;

  const keyboard = new InlineKeyboard()
    .webApp('📱 QR Chiptani Mini Appda ko\'rish', `${WEBAPP_URL}?page=my-trips`)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
}

/**
 * /help komandasi — Qo'llab-quvvatlash va aloqa
 */
bot.command('help', async (ctx) => {
  const helpText = 
`🌲 <b>Tashqariga.uz — Qo'llab-quvvatlash xizmati</b> 🧭
━━━━━━━━━━━━━━━━━━━━
Savollaringiz bormi yoki sayohat tanlashda yordam kerakmi? Biz har doim aloqadamiz!

📞 <b>Tezkor aloqa:</b> +998 (71) 200-44-88
💬 <b>Telegram Administrator:</b> @tashqariga_support
🧗 <b>Gidlar va Hamkorlar bo'limi:</b> ${CEO_TELEGRAM}
📍 <b>Manzil:</b> Toshkent shahri, Amir Temur shoh ko'chasi, 107B

💡 <i>Tog'da xavfsizlik — bizning eng oliy qadriyatimiz. Barcha sayohatlarimiz sug'urta va sertifikatlangan gidlar hamrohligida amalga oshiriladi.</i>`;

  const keyboard = new InlineKeyboard()
    .url('💬 Administratorga yozish', 'https://t.me/tashqariga_support')
    .row()
    .webApp('🏔️ Tashqariga Mini App', WEBAPP_URL)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(helpText, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

/**
 * /admin komandasi — Admin boshqaruv paneli
 */
bot.command('admin', async (ctx) => {
  const userId = String(ctx.from.id);
  if (ADMIN_CHAT_ID && userId !== String(ADMIN_CHAT_ID)) {
    return ctx.reply('Kechirasiz, ushbu buyruq faqat loyiha ma\'murlari uchun mo\'ljallangan.');
  }

  const stats = db.getStats();
  const adminText = 
`⚙️ <b>TASHQARIGA.UZ — ADMIN BOSHQARUV PANEL</b>
━━━━━━━━━━━━━━━━━━━━
👥 <b>Jami foydalanuvchilar:</b> ${stats.totalUsers} ta
🎫 <b>Jami buyurtmalar:</b> ${stats.totalBookings} ta
💰 <b>Tarqatilgan MountainCoins:</b> ${(stats.totalMountainCoinsDistributed || 0).toLocaleString('uz-UZ')} so'm
🧗 <b>Kelib tushgan gid arizalari:</b> ${stats.totalPartnerApplications} ta
🏔️ <b>Faol turlar soni:</b> ${stats.activeTours} ta
━━━━━━━━━━━━━━━━━━━━
<i>Yangi buyurtmalar va bildirishnomalar ushbu chatga avtomatik yetkaziladi.</i>`;

  const keyboard = new InlineKeyboard()
    .text('🧪 Test buyurtma yuborish', 'action_test_booking')
    .row()
    .webApp('📊 Veb Boshqaruv Paneli', `${WEBAPP_URL}?portal=admin`);

  await ctx.reply(adminText, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

// ==============================================================================
// 4. INLINE TUGMALAR (CALLBACK QUERIES)
// ==============================================================================

bot.callbackQuery('action_main_menu', async (ctx) => {
  await ctx.answerCallbackQuery();
  const userId = ctx.from.id;
  await ctx.editMessageText(
    `Salom, <b>${escapeHtml(ctx.from.first_name || 'Tog\' oshig\'i')}</b>! 🏔️🌲\n\n` +
    `<b>Tashqariga.uz</b> — O‘zbekiston tog‘lari bo‘ylab eng yaxshi sarguzashtlar agregatori.\n` +
    `Kerakli bo'limni tanlang:`,
    {
      parse_mode: 'HTML',
      reply_markup: getMainInlineKeyboard(userId)
    }
  );
});

bot.callbackQuery('action_turlar', async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    `🏔️ <b>Eng ommabop sayohatlar katalogi:</b>\n\nQuyidagi turlardan birini tanlab, batafsil ma'lumot olishingiz mumkin:`,
    {
      parse_mode: 'HTML',
      reply_markup: getToursKeyboard()
    }
  );
});

bot.callbackQuery('action_referral', async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleReferralCommand(ctx);
});

bot.callbackQuery('action_partner', async (ctx) => {
  await ctx.answerCallbackQuery();
  await handlePartnerCommand(ctx);
});

bot.callbackQuery('action_mybookings', async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleMyBookings(ctx);
});

bot.callbackQuery('action_help', async (ctx) => {
  await ctx.answerCallbackQuery();
  const helpText = 
`🌲 <b>Tashqariga.uz — Qo'llab-quvvatlash xizmati</b> 🧭\n\n` +
`📞 Telefon: +998 (71) 200-44-88\n` +
`💬 Telegram: @tashqariga_support\n` +
`Har kuni 24 soat xizmatingizdamiz!`;
  await ctx.reply(helpText, {
    parse_mode: 'HTML',
    reply_markup: new InlineKeyboard().url('💬 Yozish', 'https://t.me/tashqariga_support')
  });
});

// Muayyan turning tafsilotlarini ko'rsatish
bot.callbackQuery(/^tour_detail_(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const tourId = ctx.match[1];
  const tour = findTourById(tourId);

  if (!tour) {
    return ctx.reply('Kechirasiz, ushbu tur haqida ma\'lumot topilmadi.');
  }

  const tourWebAppUrl = `${WEBAPP_URL}?tour=${tour.id}`;
  const tourMessage = 
`🏔️ <b>${escapeHtml(tour.title)}</b>
━━━━━━━━━━━━━━━━━━━━
📍 <b>Manzil:</b> ${escapeHtml(tour.destination)}
💵 <b>Narxi:</b> <b>${tour.price.toLocaleString('uz-UZ')} so'm</b> <s>${tour.originalPrice.toLocaleString('uz-UZ')} so'm</s>
🗓️ <b>Sana:</b> ${escapeHtml(tour.date)} | ${escapeHtml(tour.departureTime)}
🧗 <b>Murakkabligi:</b> ${tour.difficulty}
👥 <b>Bo'sh joylar:</b> ${tour.maxSeats - tour.bookedSeats} ta qoldi!
⭐ <b>Tashkilotchi:</b> ${escapeHtml(tour.organizer)}

📝 <i>${escapeHtml(tour.description)}</i>
━━━━━━━━━━━━━━━━━━━━`;

  const keyboard = new InlineKeyboard()
    .webApp('🎟️ Mini Appda ochish va joy band qilish', tourWebAppUrl)
    .row()
    .text('🎒 Barcha turlar', 'action_turlar')
    .text('⬅️ Bosh menyu', 'action_main_menu');

  if (tour.image) {
    return ctx.replyWithPhoto(tour.image, {
      caption: tourMessage,
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
  }

  await ctx.reply(tourMessage, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

// Admin test buyurtmasini jo'natish
bot.callbackQuery('action_test_booking', async (ctx) => {
  await ctx.answerCallbackQuery({ text: 'Test buyurtma yuborilmoqda...' });

  const testBooking = {
    ticketNumber: `TSH-${Math.floor(100000 + Math.random() * 900000)}`,
    tourTitle: "So'qoq Sharsharasi & Soya Oromgohi Safarlari",
    tourDestination: "So'qoq, Parkent",
    tourDate: "26-Sentyabr, Shanba",
    departureTime: "07:30",
    departureLocation: "Buyuk Ipak Yo'li metro bekati",
    customerName: `${ctx.from.first_name || 'Alisher'} ${ctx.from.last_name || 'Vohidov'}`,
    customerPhone: '+998 90 123 45 67',
    customerTelegram: ctx.from.username ? `@${ctx.from.username}` : '@tashqariga_user',
    seatsCount: 2,
    totalPrice: 380000,
    paymentMethod: 'Click Up',
    telegramId: ctx.from.id
  };

  db.saveBooking(testBooking);
  await sendAdminBookingNotification(testBooking);
  await ctx.reply('✅ Test buyurtma muvaffaqiyatli saqlandi va adminga yuborildi!');
});

// Gid ariza topshirish bosqichini boshlash
bot.callbackQuery('action_apply_guide', async (ctx) => {
  await ctx.answerCallbackQuery();
  const userId = ctx.from.id;
  guideApplicationSessions.set(userId, { step: 'waiting_name', data: { telegramId: userId, telegram: ctx.from.username ? `@${ctx.from.username}` : '' } });

  await ctx.reply(
    `🧗‍♂️ <b>Gidlar va Hamkorlar arizasi (1/3 qadam)</b>\n\n` +
    `Iltimos, to'liq ism-familiyangiz yoki turoperator tashkilotingiz nomini yozib qoldiring:\n` +
    `<i>(Masalan: Jamshid Qodirov yoki 'Tyan-Shan Expeditions')</i>`,
    { parse_mode: 'HTML' }
  );
});

// Admin buyurtmani tasdiqlash
bot.callbackQuery(/^booking_ack_(.+)$/, async (ctx) => {
  const ticketNo = ctx.match[1];
  await ctx.answerCallbackQuery({ text: `Buyurtma #${ticketNo} tasdiqlandi!` });
  await ctx.editMessageReplyMarkup({
    reply_markup: new InlineKeyboard().text(`✅ Tasdiqlangan (#${ticketNo})`, 'noop')
  });
});

// Admin gidni tasdiqlash
bot.callbackQuery(/^partner_approve_(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery({ text: 'Hamkorlik arizasi ma\'qullandi!' });
  await ctx.editMessageReplyMarkup({
    reply_markup: new InlineKeyboard().text('✅ Ariza ma\'qullandi', 'noop')
  });
});

// ==============================================================================
// 5. TEKST XABARLARNI QAYTA ISHLASH (GUIDE ONBOARDING WIZARD)
// ==============================================================================

bot.on('message:text', async (ctx) => {
  const userId = ctx.from.id;
  const session = guideApplicationSessions.get(userId);

  if (!session) {
    // Agar bot bilan oddiy muloqot bo'lsa
    return ctx.reply(
      `Tushundim! Saytimizdagi eng sara tog' turlarini kashf qilish uchun quyidagi tugmani bosing:`,
      {
        reply_markup: new InlineKeyboard().webApp('🏔️ Tashqariga Mini App', WEBAPP_URL)
      }
    );
  }

  // 1-qadam: Ism kiritildi
  if (session.step === 'waiting_name') {
    session.data.name = ctx.message.text.trim();
    session.step = 'waiting_phone';
    guideApplicationSessions.set(userId, session);

    return ctx.reply(
      `Rahmat, <b>${escapeHtml(session.data.name)}</b>!\n\n` +
      `<b>(2/3 qadam)</b> Iltimos, bog'lanish uchun telefon raqamingizni yuboring:\n` +
      `<i>(Masalan: +998 90 123 45 67)</i>`,
      { parse_mode: 'HTML' }
    );
  }

  // 2-qadam: Telefon kiritildi
  if (session.step === 'waiting_phone') {
    session.data.phone = ctx.message.text.trim();
    session.step = 'waiting_regions';
    guideApplicationSessions.set(userId, session);

    return ctx.reply(
      `Ajoyib!\n\n` +
      `<b>(3/3 qadam)</b> Odatda qaysi tog' yo'nalishlarida turlar tashkil qilasiz va tajribangiz necha yil?\n` +
      `<i>(Masalan: Chimyon, Urung'och, Zomin kemping, tajribam 4 yil)</i>`,
      { parse_mode: 'HTML' }
    );
  }

  // 3-qadam: Yo'nalish va tajriba
  if (session.step === 'waiting_regions') {
    session.data.regions = ctx.message.text.trim();
    session.data.experience = 'Kiritildi';

    // Baza va Adminga yuborish
    const savedApp = db.savePartnerApplication(session.data);
    await sendAdminPartnerNotification(savedApp);

    guideApplicationSessions.delete(userId);

    const successMsg = 
`🎉 <b>Arizangiz muvaffaqiyatli qabul qilindi!</b>\n\n` +
`Hurmatli <b>${escapeHtml(session.data.name)}</b>, tez orada menejerimiz yoki loyiha rahbari siz bilan bog'lanib, shaxsiy gidlar kabinetini faollashtiradi.\n\n` +
`Tashqariga.uz oilasiga xush kelibsiz! 🏔️`;

    const keyboard = new InlineKeyboard()
      .url('💬 CEO bilan to\'g\'ridan-to\'g\'ri bog\'lanish', `https://t.me/${CEO_TELEGRAM.replace('@', '')}`)
      .row()
      .webApp('🏔️ Tashqariga Mini App', WEBAPP_URL)
      .row()
      .text('⬅️ Bosh menyu', 'action_main_menu');

    return ctx.reply(successMsg, {
      parse_mode: 'HTML',
      reply_markup: keyboard
    });
  }
});

// ==============================================================================
// 6. ICHKI REST API SERVERI (EXPRESS) — VEB ILOVA BILAN INTEGRATSIYA
// ==============================================================================

const app = express();
app.use(cors());
app.use(express.json());

// Salomatlik tekshiruvi (Healthcheck)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Tashqariga Telegram Bot Service', timestamp: new Date().toISOString() });
});

// Sayt/WebApp orqali buyurtma berilganda adminga bildirishnoma jo'natish
app.post('/api/notify-booking', async (req, res) => {
  try {
    const bookingData = req.body;
    if (!bookingData || !bookingData.tourTitle || !bookingData.customerName) {
      return res.status(400).json({ error: 'Noto\'liq buyurtma ma\'lumotlari' });
    }

    const saved = db.saveBooking(bookingData);
    const sent = await sendAdminBookingNotification(saved);

    // Agar mijozning telegramId si berilgan bo'lsa, mijozga ham xushxabar jo'natish
    if (bookingData.telegramId) {
      try {
        const clientMsg = 
`🎉 <b>Tabriklaymiz! Sayohat muvaffaqiyatli bron qilindi!</b> 🏔️\n
🎫 Chipta raqami: <code>#${saved.ticketNumber}</code>
🏔️ Tur: <b>${escapeHtml(saved.tourTitle)}</b>
🗓️ Sana: ${escapeHtml(saved.tourDate)} (${escapeHtml(saved.departureTime)})
📍 Uchrashuv joyi: ${escapeHtml(saved.departureLocation)}

<i>Chiptangizning QR kodini istalgan payt Mini App ichidagi «Mening sayohatlarim» bo'limida ko'rishingiz mumkin.</i>`;

        await bot.api.sendMessage(bookingData.telegramId, clientMsg, {
          parse_mode: 'HTML',
          reply_markup: new InlineKeyboard().webApp('📱 QR Chiptani ko\'rish', `${WEBAPP_URL}?page=my-trips`)
        });
      } catch (err) {
        console.log('Mijozga xabar yuborishda xato (ehtimol botga /start bosmagan):', err.message);
      }
    }

    return res.json({ success: true, ticketNumber: saved.ticketNumber, notified: sent });
  } catch (error) {
    console.error('API /notify-booking xatoligi:', error);
    return res.status(500).json({ error: 'Server xatoligi' });
  }
});

// Sayt/WebApp orqali gidlar arizasi tushganda
app.post('/api/partner-application', async (req, res) => {
  try {
    const partnerData = req.body;
    const saved = db.savePartnerApplication(partnerData);
    const sent = await sendAdminPartnerNotification(saved);
    return res.json({ success: true, id: saved.id, notified: sent });
  } catch (error) {
    console.error('API /partner-application xatoligi:', error);
    return res.status(500).json({ error: 'Server xatoligi' });
  }
});

// ==============================================================================
// 7. YORDAMCHI FUNKSIYALAR VA ISHGA TUSHIRISH (STARTUP)
// ==============================================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Bot xatolarini ushlash (Error handling)
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Bot xatoligi [update_id: ${ctx.update.update_id}]:`, err.error);
});

// Servisni ishga tushirish funksiyasi
export async function startServices() {
  // 1. Express API serverini ishga tushirish
  app.listen(PORT, () => {
    console.log(`🚀 [Tashqariga API Server] http://localhost:${PORT} portida ishlamoqda`);
  });

  // 2. Agar BOT_TOKEN mavjud bo'lsa Telegram Botni ishga tushirish
  if (BOT_TOKEN && BOT_TOKEN !== 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
    try {
      // BotFather komandalarini avtomatik ro'yxatdan o'tkazish
      await bot.api.setMyCommands([
        { command: 'start', description: '🏔️ Asosiy menyu va Mini App' },
        { command: 'turlar', description: '🎒 Ommabop tog\' turlari' },
        { command: 'referral', description: '🎁 Do\'stlarni taklif qilish (+30k)' },
        { command: 'mybookings', description: '🎟️ Mening sayohat chiptalarim' },
        { command: 'partner', description: '🧗‍♂️ Gidlar va turoperatorlar bo\'limi' },
        { command: 'help', description: '💬 Yordam va 24/7 aloqa' },
        { command: 'admin', description: '⚙️ Boshqaruv statistikasi (admin)' },
      ]);

      // Global WebApp Menyu tugmasini sozlash
      await bot.api.setChatMenuButton({
        menu_button: {
          type: 'web_app',
          text: '🏔️ Tashqariga',
          web_app: { url: WEBAPP_URL }
        }
      });

      console.log('✅ [Telegram Bot Commands & Menu Button] Muvaffaqiyatli sozlandi!');
      console.log(`🏔️ [Tashqariga Bot] @${BOT_USERNAME} Long-polling rejimida ishga tushdi...`);

      bot.start();
    } catch (err) {
      console.error('Telegram botni ishga tushirishda xatolik:', err.message);
    }
  } else {
    console.log('ℹ️ Bot tokeni kiritilgandan so\'ng "npm start" orqali to\'liq ishga tushirishingiz mumkin.');
  }
}

// Agar to'g'ridan-to'g'ri ishga tushirilgan bo'lsa
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServices();
}

export { bot };
