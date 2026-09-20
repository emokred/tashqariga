# 🏔️ Tashqariga.uz — Telegram Bot & Mini App Servisi

O‘zbekistondagi tog‘ sayohatlari, hiking va kemping agregatori bo‘lgan **Tashqariga.uz** uchun ishlab chiqilgan rasmiy Telegram Bot va WebApp integratsiya tizimi.

---

## ⚡ Asosiy imkoniyatlar

1. 🏔️ **Tog' kayfiyati va estetikasi (`/start`):**
   - Foydalanuvchini samimiy va tog' muhitidagi xush kelibsiz xabari bilan kutib oladi.
   - Saytni Telegramdan chiqmasdan to'liq ekranda ochuvchi WebApp tugmalari.
   
2. 📱 **Telegram Web App & Menu Button:**
   - BotFather orqali doimiy chat menyu tugmasi (`🏔️ Tashqariga`).
   - WebApp SDK bilan to'liq moslashuvchanlik.

3. 🎁 **Referral va Bonus tizimi (`start ref_123` / `/referral`):**
   - Har bir taklif qilingan do'st uchun foydalanuvchiga **+30,000 MountainCoin** beriladi.
   - Yangi foydalanuvchiga ham 30,000 so'm xush kelibsiz bonusi taqdim etiladi.
   - Do'st kirganida taklif qiluvchiga zudlik bilan tabrik xabari yuboriladi.

4. 🔗 **Turlar Deep Linking (`start tour_id`):**
   - Muayyan tur havolasi ulashilganda, bot turni surati, narxi, sanasi va to'g'ridan-to'g'ri bron qilish tugmasi bilan ochadi.

5. 🛎️ **Buyurtma bildirishnomalari (Admin & Gid alert):**
   - Sayt yoki Mini Appda chipta olinganda Admin va Gidga tezkor xabar tushadi.
   - Chipta raqami, mijoz ismi, telefon, Telegram profili, to'lov usuli va joylar soni ko'rsatiladi.
   - Admin uchun bir martalik tasdiqlash va mijozga yozish tugmalari.

6. 🧗‍♂️ **Gidlar va Hamkorlar portali (`/partner`):**
   - Yangi gidlar uchun 3 bosqichli interaktiv ariza topshirish tizimi.
   - Loyiha rahbari (CEO) bilan to'g'ridan-to'g'ri bog'lanish tugmasi.

7. 🌐 **Ichki REST API Serveri (Express):**
   - `POST /api/notify-booking` — Veb ilovadan yangi buyurtma signallarini qabul qiladi.
   - `POST /api/partner-application` — Gid arizalarini qabul qiladi.
   - `GET /api/health` — Tizim holatini tekshiradi.

---

## 📂 Loyiha tuzilishi

```text
d:/antigravity/Tashqariga/bot/
├── bot.js                       # Asosiy bot va Express serveri
├── package.json                 # Skriptlar va bog'liqliklar
├── .env                         # Maxfiy sozlamalar (Token, Admin ID, Port)
├── .env.example                 # Sozlamalar namunasi
├── BOTFATHER_SETUP_GUIDE.md     # BotFather orqali 0 dan sozlash qo'llanmasi
├── data/
│   ├── toursData.js             # Ommabop turlar ma'lumotlari
│   ├── db.js                    # Foydalanuvchilar va buyurtmalar JSON bazasi
│   └── db.json                  # Lokal ma'lumotlar ombori (avtomatik yaratiladi)
└── scripts/
    ├── test-notification.js     # Admin xabarini test qilish skripti
    └── set-bot-commands.js      # BotFather komandalarini avtomat sozlash
```

---

## 🚀 O'rnatish va ishga tushirish

### 1. Bog'liqliklarni o'rnatish
```bash
cd d:/antigravity/Tashqariga/bot
npm install
```

### 2. .env faylini sozlash
`.env` faylini oching va Telegram Bot tokeningizni kiriting:
```env
BOT_TOKEN=7123456789:AAH...
WEBAPP_URL=https://tashqariga.uz
ADMIN_CHAT_ID=123456789
CEO_TELEGRAM=@tashqariga_ceo
PORT=3001
```

### 3. Komandalar va Menu Buttonni o'rnatish (1 marta)
```bash
npm run setup:commands
```

### 4. Botni ishga tushirish
```bash
# Oddiy rejimda
npm start

# Yoki dasturchi (hot-reload) rejimida
npm run dev
```

### 5. Buyurtma xabarini test qilish
Boshqa terminalda quyidagi buyruqni bering:
```bash
npm run test:notify
```

---

## 🔄 Arxitektura va integratsiya

```
+-------------------------------------------------------+
|                 Mijoz / Sayohat Ishqibozi             |
+---------------------------+---------------------------+
                            |
           +----------------+----------------+
           |                                 |
           v                                 v
+-----------------------+         +---------------------+
| Telegram Bot (@start) |         |  Next.js WebApp     |
| - Tog' kayfiyati      |         |  - Turlar katalogi  |
| - Referral havolasi   |         |  - Filtrlash        |
| - Gid arizasi         |         |  - Joy tanlash      |
+-----------+-----------+         +----------+----------+
            |                                |
            | WebApp Button                  | Bron qilish
            +---------------> + <------------+ (Click/Payme)
                              |
                              v
                  +-----------------------+
                  |  POST /api/booking    |
                  |  (Next.js API route)  |
                  +-----------+-----------+
                              |
                              v
                  +-----------------------+
                  | POST /notify-booking  |
                  | (Bot Express API:3001)|
                  +-----------+-----------+
                              |
                              v
                  +-----------------------+
                  |  Admin & Gidga Tezkor |
                  |  Telegram Xabarnomasi |
                  |  - Chipta #TSH-xxxx   |
                  |  - Mijoz telefoni     |
                  |  - Tasdiqlash tugmasi |
                  +-----------------------+
```

---

## 👨‍💻 Muallif
**Tashqariga.uz jamoasi** — O'zbekiston turizmini raqamlashtirish sari olg'a! 🏔️
