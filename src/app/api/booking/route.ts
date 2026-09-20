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

    // 2. Fallback: Send directly via Telegram Bot API
    const botToken = process.env.BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '8919209304:AAG2-e-kmAJc82pw7wcARnVKEFKDJWL3BUE';
    const adminChatId = process.env.ADMIN_CHAT_ID;

    if (!notified && botToken && adminChatId) {
      try {
        const text = 
`🛎️ <b>YANGI BUYURTMA! (Vercel Cloud)</b> 🏔️\n
🎫 <b>Chipta:</b> <code>#${bookingData.ticketNumber || 'TSH-NEW'}</code>
🏔️ <b>Tur:</b> <b>${bookingData.tourTitle || 'Noma\'lum tur'}</b>
📍 <b>Manzil:</b> ${bookingData.tourDestination || 'Toshkent'}
🗓️ <b>Sana:</b> ${bookingData.tourDate || ''} (${bookingData.departureTime || ''})
🚌 <b>Uchrashuv:</b> ${bookingData.departureLocation || ''}

👤 <b>Mijoz:</b> ${bookingData.customerName || 'Noma\'lum'}
📞 <b>Telefon:</b> ${bookingData.customerPhone || 'Kiritilmagan'}
✈️ <b>Telegram:</b> ${bookingData.customerTelegram || 'Kiritilmagan'}
👥 <b>O'rinlar:</b> ${bookingData.seatsCount || 1} kishi
💵 <b>Jami to'lov:</b> <b>${Number(bookingData.totalPrice || 0).toLocaleString('uz-UZ')} so'm</b>
💳 <b>To'lov:</b> ${bookingData.paymentMethod || 'Click'}`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: adminChatId,
            text,
            parse_mode: 'HTML',
          }),
        });
      } catch (tgErr) {
        console.warn('Telegram direct notify error:', tgErr);
      }
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
