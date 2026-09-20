/**
 * Tashqariga.uz — Test Booking Notification Script
 * 
 * Ushbu skript yangi buyurtma kelib tushganda admin va gidga 
 * xabar qanday yetib borishini tekshirish uchun ishlatiladi.
 */

import dotenv from 'dotenv';
dotenv.config();

const API_URL = `http://localhost:${process.env.PORT || 3001}/api/notify-booking`;

const dummyBooking = {
  ticketNumber: `TSH-${Math.floor(100000 + Math.random() * 900000)}`,
  tourTitle: 'Urungach Nefrit Ko‘llari — Kristal Suvlar Mo‘jizasi',
  tourDestination: 'Urungach, Ugom-Chotqol',
  tourDate: '26-Sentyabr, Shanba',
  departureTime: '06:00',
  departureLocation: 'Pushkin metro bekati (Salar kanali bo‘yi)',
  customerName: 'Sardorbek Rahimberdiyev',
  customerPhone: '+998 90 987 65 43',
  customerTelegram: '@sardor_traveler',
  seatsCount: 2,
  totalPrice: 480000,
  paymentMethod: 'Click Up'
};

async function testNotification() {
  console.log('🏔️ [Tashqariga.uz] Test buyurtma xabari jo\'natilmoqda...');
  console.log('API Manzili:', API_URL);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dummyBooking)
    });

    const result = await response.json();
    console.log('\n✅ Server javobi:');
    console.log(result);

    if (result.success) {
      console.log(`\n🎉 Buyurtma muvaffaqiyatli qabul qilindi! Chipta: #${result.ticketNumber}`);
      if (result.notified) {
        console.log('📲 Telegram Adminga xabar yuborildi!');
      } else {
        console.log('⚠️ Admin chat ID belgilanmagan yoki bot ishga tushmagan.');
      }
    }
  } catch (error) {
    console.error('\n❌ Xatolik yuz berdi:', error.message);
    console.log('Eslatma: Oldin "npm start" orqali bot va API serverni ishga tushiring!');
  }
}

testNotification();
