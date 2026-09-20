import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const bookingData = await request.json();

    // Bot notification server URL (default localhost:3001)
    const botApiUrl = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001/api/notify-booking';

    // Asynchronously ping Telegram Bot service
    try {
      await fetch(botApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
    } catch (botErr) {
      console.warn('Telegram Bot bildirishnomasi yuborilmadi (bot o\'chiq bo\'lishi mumkin):', botErr);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Buyurtma qabul qilindi va botga uzatildi' 
    });
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Server xatoligi' }, { status: 500 });
  }
}
