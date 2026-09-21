import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    // Bot notification server URL (default localhost:3001)
    const botApiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001/api/notify-booking';

    let notified = false;

    // 1. Try internal Bot API service
    try {
      const res = await fetch(botApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) notified = true;
    } catch {
      // Local bot unreachable (e.g. running on Vercel cloud)
    }

    // 2. Telegram Bot API orqali guruh va asoschilarga xabar jo'natish
    const botToken = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '8919209304:AAG2-e-kmAJc82pw7wcARnVKEFKDJWL3BUE';
    const targetChats = ['-5268286846', '1812234273', '6377617416'];
    if (process.env.ADMIN_CHAT_ID && !targetChats.includes(process.env.ADMIN_CHAT_ID)) {
      targetChats.push(process.env.ADMIN_CHAT_ID);
    }

    if (botToken) {
      const text = 
`🔥 <b>SURAMIZ! YANGI CHIPTA BAND QILINDI!</b> 🏔️
━━━━━━━━━━━━━━━━━━━━
🎫 <b>Chipta raqami:</b> <code>#${bookingData.ticketNumber || 'TSH-NEW'}</code>
🏔️ <b>Safar:</b> <b>${bookingData.tourTitle || 'Noma\'lum tur'}</b>
📍 <b>Manzil:</b> ${bookingData.tourDestination || 'Toshkent'}
🗓️ <b>Sana:</b> ${bookingData.tourDate || ''} (${bookingData.departureTime || '07:00'})
🚌 <b>Uchrashuv:</b> ${bookingData.departureLocation || 'Metro bekati'}

👤 <b>Mijoz:</b> <b>${bookingData.customerName || 'Noma\'lum'}</b>
📞 <b>Telefon:</b> <a href="tel:${bookingData.customerPhone}">${bookingData.customerPhone || 'Kiritilmagan'}</a>
✈️ <b>Telegram:</b> ${bookingData.customerTelegram ? (bookingData.customerTelegram.startsWith('@') ? bookingData.customerTelegram : '@' + bookingData.customerTelegram) : '<i>Kiritilmagan</i>'}
👥 <b>O'rinlar:</b> ${bookingData.seatsCount || 1} kishi
💵 <b>Jami to'lov:</b> <b>${Number(bookingData.totalPrice || 0).toLocaleString('uz-UZ')} so'm</b>
💳 <b>To'lov turi:</b> ${bookingData.paymentMethod || 'Click'}
⚡ <b>Holati:</b> ✅ Tasdiqlangan va bron qilingan
━━━━━━━━━━━━━━━━━━━━
<i>«Hayot to‘rtta devor orasida o‘tib ketmasin. Tashqarida ko‘rishguncha!»</i>`;

      // Parallel holda barcha chatlarga yetkazish
      await Promise.allSettled(
        targetChats.map((chatId) =>
          fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              parse_mode: 'HTML',
            }),
          })
        )
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Buyurtma qabul qilindi' 
    });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Server xatoligi' }, { status: 500 });
  }
}
