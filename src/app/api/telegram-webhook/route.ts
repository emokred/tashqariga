import { Bot, InlineKeyboard, Keyboard, webhookCallback } from 'grammy';

const BOT_TOKEN = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '8919209304:AAG2-e-kmAJc82pw7wcARnVKEFKDJWL3BUE';
const WEBAPP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://tashqariga.vercel.app';
const CEO_TELEGRAM = process.env.CEO_TELEGRAM || '@tashqarigauz';
let ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '';

export const dynamic = 'force-dynamic';

const bot = new Bot(BOT_TOKEN);

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getMainInlineKeyboard() {
  return new InlineKeyboard()
    .webApp('🏔️ Tashqariga Mini App', WEBAPP_URL)
    .row()
    .text('🎒 Ommabop Turlar', 'action_turlar')
    .text('🎟️ Chiptalarim', 'action_mybookings')
    .row()
    .text('🧗‍♂️ Gidlar & Hamkorlar', 'action_partner')
    .text('💬 Yordam & Aloqa', 'action_help')
    .row()
    .url('🌐 Saytda Ko‘rish', WEBAPP_URL);
}

// 1. /start komandasi
bot.command('start', async (ctx) => {
  const fromUser = ctx.from;
  const name = fromUser ? escapeHtml(fromUser.first_name || 'Tog\' oshig\'i') : 'Tog\' oshig\'i';

  const welcomeMessage = 
`Salom, <b>${name}</b>! 🏔️🌲

<b>Tashqariga</b> — O‘zbekistonning eng go‘zal cho‘qqilari, sirli sharsharalari va sokin nefrit ko‘llari bo‘ylab sarguzashtlar platformasiga xush kelibsiz! 🥾⛺

Biz sizga eng ishonchli va tajribali tog‘ gidlarining sara turlarini bitta joyda taqdim etamiz:
✨ <b>1 daqiqada</b> joy band qiling va elektron chipta oling
🛡️ <b>100% Xavfsizlik</b> va rasmiy gidlar hamrohligi
💬 Gidlar bilan to‘g‘ridan-to‘g‘ri aloqa va safar guruhlari

Quyidagi <b>«🏔️ Tashqariga Mini App»</b> tugmasini bosib, sayohatlarni kashf eting:`;

  try {
    await ctx.setChatMenuButton({
      menu_button: {
        type: 'web_app',
        text: '🏔️ Tashqariga',
        web_app: { url: WEBAPP_URL }
      }
    });
  } catch {
    // Menu button set fallback
  }

  await ctx.reply(welcomeMessage, {
    parse_mode: 'HTML',
    reply_markup: getMainInlineKeyboard()
  });
});

// 2. /turlar komandasi
bot.command('turlar', async (ctx) => {
  const text = 
`🏔️ <b>Eng ommabop sayohatlar katalogi:</b>

1. <b>So'qoq Sharsharasi</b> — 190,000 so'm (26-Sentyabr)
2. <b>Katta Chimyon Cho'qqisi (3309m)</b> — 350,000 so'm (27-Sentyabr)
3. <b>Urung'och Nefrit Ko'llari</b> — 240,000 so'm (26-Sentyabr)
4. <b>Zomin Tog' & Archa Oromgohi (2 kun)</b> — 650,000 so'm (26-27 Sentyabr)

Barcha filtrlarni va bo'sh o'rinlarni Mini Appda ko'ring:`;

  const keyboard = new InlineKeyboard()
    .webApp('🏔️ Barcha turlarni ochish', WEBAPP_URL)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

// 3. /phone komandasi (kontakt ulashish)
bot.command('phone', async (ctx) => {
  const keyboard = new Keyboard()
    .requestContact('📱 Telefon raqamimni yuborish')
    .resized()
    .oneTime();

  await ctx.reply(
    `📱 <b>Telegram orqali telefon raqamingizni tasdiqlang:</b>\n\n` +
    `Pastdagi <b>«📱 Telefon raqamimni yuborish»</b> tugmasini bosing va raqamingizni <b>Tashqariga</b> profilingizga ulang:`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
    }
  );
});

// 4. Kontakt qabul qilish
bot.on('message:contact', async (ctx) => {
  const phoneNumber = ctx.message.contact.phone_number;
  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

  await ctx.reply(
    `✅ <b>Telefon raqamingiz muvaffaqiyatli tasdiqlandi!</b>\n\n` +
    `📱 Raqam: <code>${formattedPhone}</code>\n\n` +
    `Endi Tashqariga platformasida barcha yangi sayohat chiptalaringiz ushbu raqamga rasmiylashtiriladi! 🏔️`,
    { 
      parse_mode: 'HTML',
      reply_markup: { remove_keyboard: true }
    }
  );
});

// 5. /myid va /setadmin
bot.command('myid', async (ctx) => {
  const chatId = ctx.chat.id;
  await ctx.reply(
    `🆔 <b>Sizning Telegram Chat ID:</b> <code>${chatId}</code>\n\n` +
    `💡 Ushbu ID orqali bot sizni admin yoki buyurtmachi sifatida taniydi.`,
    { parse_mode: 'HTML' }
  );
});

bot.command('setadmin', async (ctx) => {
  const chatId = ctx.chat.id;
  ADMIN_CHAT_ID = String(chatId);
  process.env.ADMIN_CHAT_ID = String(chatId);
  await ctx.reply(
    `✅ <b>Muvaffaqiyatli! Ushbu chat bildirishnoma admini sifatida biriktirildi!</b>\n\n` +
    `📌 Admin Chat ID: <code>${chatId}</code>\n\n` +
    `Endi sayt yoki Telegram bot orqali tushgan barcha yangi chipta buyurtmalari va gid arizalari ushbu chatga zudlik bilan yetkaziladi! 🔔🏔️`,
    { parse_mode: 'HTML' }
  );
});

// 6. /partner komandasi
bot.command('partner', async (ctx) => {
  const message = 
`🧗‍♂️ <b>TOG' GIDLARI VA TUROPERATORLAR DIQQATIGA!</b> 🏔️
━━━━━━━━━━━━━━━━━━━━
Siz professional tog' gidi, instruktor yoki sayohat agentligimisiz?
<b>Tashqariga</b> platformasi orqali har haftalik turlaringizni 10,000 dan ortiq faol tog' ishqibozlariga soting!

✨ <b>BIZNING IMKONIYATLAR:</b>
• <b>0% komissiya:</b> Yangi qo'shilgan gidlar uchun dastlabki 1 oy mutlaqo bepul!
• <b>Avtomatlashtirilgan chiptalar:</b> QR kodli chiptalar va ishtirokchilar ro'yxati.
• <b>Xavfsiz to'lov:</b> Click, Payme va Uzum orqali pullar to'g'ridan-to'g'ri hisobingizga.
• <b>Shaxsiy kabinet:</b> Joylar nazorati va tezkor boshqaruv.

CEO bilan to'g'ridan-to'g'ri bog'laning:`;

  const keyboard = new InlineKeyboard()
    .url('💬 CEO bilan to\'g\'ridan-to\'g\'ri aloqa', `https://t.me/${CEO_TELEGRAM.replace('@', '')}`)
    .row()
    .webApp('💼 Gidlar Portalini Mini Appda ochish', `${WEBAPP_URL}?portal=partner`)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

// 7. /mybookings komandasi
bot.command('mybookings', async (ctx) => {
  const text = 
`🎟️ <b>Sizning sayohat chiptalaringiz:</b>

Chiptalaringiz va QR kodlaringizni to'liq ekranda ko'rish uchun Mini Appni oching:`;

  const keyboard = new InlineKeyboard()
    .webApp('📱 Chiptalarimni ko\'rish', `${WEBAPP_URL}?page=my-trips`)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

// 8. /help komandasi
bot.command('help', async (ctx) => {
  const helpText = 
`🌲 <b>Tashqariga — Qo'llab-quvvatlash xizmati</b> 🧭
━━━━━━━━━━━━━━━━━━━━
Savollaringiz bormi yoki sayohat tanlashda yordam kerakmi? Biz har doim aloqadamiz!

📞 <b>Tezkor aloqa:</b> +998 (71) 200-44-88
💬 <b>Telegram Administrator:</b> @tashqariga_support
🧗 <b>Gidlar va Hamkorlar:</b> ${CEO_TELEGRAM}
📍 <b>Manzil:</b> Toshkent shahri, Amir Temur shoh ko'chasi, 107B

💡 <i>Tog'da xavfsizlik — bizning eng oliy qadriyatimiz.</i>`;

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

// 9. Callbacks
bot.callbackQuery('action_main_menu', async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    `Salom, <b>${escapeHtml(ctx.from.first_name || 'Tog\' oshig\'i')}</b>! 🏔️🌲\n\n` +
    `<b>Tashqariga</b> — O‘zbekiston tog‘lari bo‘ylab eng yaxshi sarguzashtlar agregatori.\n` +
    `Kerakli bo'limni tanlang:`,
    {
      parse_mode: 'HTML',
      reply_markup: getMainInlineKeyboard()
    }
  );
});

bot.callbackQuery('action_turlar', async (ctx) => {
  await ctx.answerCallbackQuery();
  const text = 
`🏔️ <b>Eng ommabop sayohatlar katalogi:</b>

1. <b>So'qoq Sharsharasi</b> — 190,000 so'm (26-Sentyabr)
2. <b>Katta Chimyon Cho'qqisi (3309m)</b> — 350,000 so'm (27-Sentyabr)
3. <b>Urung'och Nefrit Ko'llari</b> — 240,000 so'm (26-Sentyabr)
4. <b>Zomin Tog' & Archa Oromgohi</b> — 650,000 so'm (26-27 Sentyabr)`;

  const keyboard = new InlineKeyboard()
    .webApp('🏔️ Mini Appda to\'liq ko\'rish', WEBAPP_URL)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });
});

bot.callbackQuery('action_partner', async (ctx) => {
  await ctx.answerCallbackQuery();
  const keyboard = new InlineKeyboard()
    .url('💬 CEO bilan aloqa', `https://t.me/${CEO_TELEGRAM.replace('@', '')}`)
    .row()
    .webApp('💼 Gidlar Portali', `${WEBAPP_URL}?portal=partner`)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(
    `🧗‍♂️ <b>Gidlar va Hamkorlar bo'limi</b>\n\n` +
    `Tashqariga orqali turlaringizni soting. 1 oylik 0% komissiya va avtomatlashtirilgan chiptalar!`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
    }
  );
});

bot.callbackQuery('action_mybookings', async (ctx) => {
  await ctx.answerCallbackQuery();
  const keyboard = new InlineKeyboard()
    .webApp('📱 Chiptalarimni ko\'rish', `${WEBAPP_URL}?page=my-trips`)
    .row()
    .text('⬅️ Bosh menyu', 'action_main_menu');

  await ctx.reply(
    `🎟️ <b>Sizning faol buyurtmalaringiz:</b>\n\nChiptalarni Mini Appda ko'ring:`,
    {
      parse_mode: 'HTML',
      reply_markup: keyboard
    }
  );
});

bot.callbackQuery('action_help', async (ctx) => {
  await ctx.answerCallbackQuery();
  const helpText = 
`🌲 <b>Tashqariga — Qo'llab-quvvatlash</b> 🧭\n\n` +
`📞 Tel: +998 (71) 200-44-88\n` +
`💬 Telegram: @tashqariga_support\n` +
`Har kuni xizmatingizdamiz!`;

  await ctx.reply(helpText, {
    parse_mode: 'HTML',
    reply_markup: new InlineKeyboard().url('💬 Yozish', 'https://t.me/tashqariga_support')
  });
});

// Webhook Handler for Next.js App Router
export const POST = webhookCallback(bot, 'std/http');

export async function GET() {
  return new Response(
    JSON.stringify({ 
      status: 'active', 
      service: 'Tashqariga Serverless Telegram Bot on Vercel',
      timestamp: new Date().toISOString() 
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
