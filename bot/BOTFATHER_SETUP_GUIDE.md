# 🏔️ Tashqariga.uz Telegram Bot & WebApp — BotFather Qo'llanmasi

Ushbu qo'llanma **Tashqariga.uz** Telegram boti va Mini App tizimini **@BotFather** orqali noldan boshlab to'liq professional darajada sozlash uchun mo'ljallangan.

---

## 📋 Mundarija
1. [1-qadam: Yangi bot ochish va Token olish](#1-qadam-yangi-bot-ochish-va-token-olish)
2. [2-qadam: Botning tashqi ko'rinishi (Branding & UX)](#2-qadam-botning-tashqi-korinishi-branding--ux)
3. [3-qadam: Web App Menyu tugmasini o'rnatish](#3-qadam-web-app-menyu-tugmasini-ornatish-muhim)
4. [4-qadam: Buyruqlar (Commands) ro'yxatini kiritish](#4-qadam-buyruqlar-commands-royxatini-kiritish)
5. [5-qadam: Mini App Direct Link (/newapp) yaratish](#5-qadam-mini-app-direct-link-newapp-yaratish)
6. [6-qadam: Admin Chat ID ni aniqlash va .env ni to'ldirish](#6-qadam-admin-chat-id-ni-aniqlash-va-env-ni-toldirish)

---

## 1-qadam: Yangi bot ochish va Token olish

1. Telegram qidiruvidan rasmiy **[@BotFather](https://t.me/BotFather)** ni toping va unga kiring.
2. `/start` buyrug'ini yuboring.
3. Yangi bot yaratish uchun quyidagi buyruqni bosing:
   ```text
   /newbot
   ```
4. BotFather sizdan botingiz nomini so'raydi. Quyidagicha kiriting:
   ```text
   Tashqariga | O'zbekiston Tog'lari & Hiking
   ```
5. Endi botingiz uchun unikal `@username` kiriting (oxiri `bot` bilan tugashi shart):
   ```text
   tashqariga_uz_bot
   ```
   *(yoki boshqa bo'sh nom, masalan: `tashqariga_travel_bot`)*
6. BotFather sizga quyidagicha API Token taqdim etadi:
   ```text
   Use this token to access the HTTP API:
   7123456789:AAHAbcdefghijk123456789lmnopqrstuv
   ```
7. Ushbu tokenni ko'chirib oling va `d:/antigravity/Tashqariga/bot/.env` faylidagi `BOT_TOKEN` qatoriga qo'ying:
   ```env
   BOT_TOKEN=7123456789:AAHAbcdefghijk123456789lmnopqrstuv
   ```

---

## 2-qadam: Botning tashqi ko'rinishi (Branding & UX)

Foydalanuvchi botga birinchi marta kirganida tog' kayfiyatini his qilishi va ishonch hosil qilishi uchun bot profilini sozlaymiz:

### 1. Bot rasmini (Avatar) qo'yish:
1. BotFather-ga `/setuserpic` deb yozing.
2. Ro'yxatdan o'z botingizni tanlang.
3. Tashqariga brendining tog' logotipi yoki chiroyli manzara suratini yuboring.

### 2. Bot ta'rifi (Foydalanuvchi botni ochganida ko'rinadigan oyna matni):
1. `/setdescription` buyrug'ini yuboring.
2. Botingizni tanlang.
3. Quyidagi matnni nusxalab yuboring:
```text
Tashqariga.uz — O‘zbekistonning eng go‘zal cho‘qqilari, sirli sharsharalari va sokin kemping maskanlariga sayohatlar agregatori! 🏔️🥾

✨ Imkoniyatlar:
• Barcha turlar bitta qulay platformada
• 1 daqiqada joy band qiling va QR chipta oling
• Click & Payme orqali to'lov
• Do'stlarni taklif qilib, safarga bepul boring (+30,000 so'm)
• Har bir sayohat uchun 5% keshbek!

Sayohatlarni boshlash uchun «Start» tugmasini bosing 🧭
```

### 3. Bot profili (About - qisqa bio):
1. `/setabouttext` buyrug'ini yuboring.
2. Botingizni tanlang.
3. Quyidagicha kiriting:
```text
O'zbekiston tog'lari, hiking va kemping turlari agregatori. Rasmiy Telegram Mini App 🏔️
```

---

## 3-qadam: Web App Menyu tugmasini o'rnatish (MUHIM!)

Foydalanuvchi chatga kirganida, pastki chap burchakda (stiker/klaviatura yonida) doimiy **«🏔️ Tashqariga»** tugmasi turishi uchun:

1. BotFather-ga yozing:
   ```text
   /setmenubutton
   ```
2. O'z botingizni tanlang.
3. BotFather so'raganda WebApp HTTPS URL manzilini kiriting:
   ```text
   https://tashqariga.uz
   ```
   *(Agar hozircha lokal test qilayotgan bo'lsangiz, `ngrok http 3000` orqali olingan `https://xxxx.ngrok-free.app` manzilini yozing).*
4. Tugma nomini kiriting:
   ```text
   🏔️ Tashqariga
   ```
5. **Natija:** Endi foydalanuvchilar chatda istalgan vaqtda 1 ta tugma orqali saytni Telegram ichida to'liq ekranda ochishlari mumkin!

---

## 4-qadam: Buyruqlar (Commands) ro'yxatini kiritish

Botingizning pastki chap burchagidagi **Menu ( / )** tugmasi bosilganda qulay buyruqlar menyusi chiqishi uchun:

1. BotFather-ga yozing:
   ```text
   /setcommands
   ```
2. Botingizni tanlang.
3. Quyidagi ro'yxatni aynan shu holda nusxalab yuboring:
```text
start - 🏔️ Asosiy menyu va Mini App
turlar - 🎒 Ommabop tog' turlari katalogi
referral - 🎁 Do'stlarni taklif qilish (+30k)
mybookings - 🎟️ Mening sayohat chiptalarim
partner - 🧗‍♂️ Gidlar va turoperatorlar portali
help - 💬 Yordam va 24/7 aloqa
admin - ⚙️ Boshqaruv statistikasi (admin)
```

> 💡 **Avtomatlashtirilgan usul:** Bularni qo'lda kiritmasdan, loyihamizdagi tayyor skript orqali 1 soniyada sozlash mumkin:
> ```bash
> cd bot
> npm run setup:commands
> ```

---

## 5-qadam: Mini App Direct Link (/newapp) yaratish

Telegram Mini App uchun to'g'ridan-to'g'ri havola (`t.me/tashqariga_bot/app`) yaratish (bu do'stlarga havola yuborishda va marketing reklamalarida eng qulay vosita):

1. BotFather-ga yozing:
   ```text
   /newapp
   ```
2. Botingizni tanlang.
3. **Title:** `Tashqariga — Tog' Sayohatlari`
4. **Description:** `O'zbekistondagi barcha tog' va hiking turlarini taqqoslash va tezkor bron qilish ilovasi.`
5. **Photo (640x360 px):** Chiroyli tog' posteri yoki bannerini yuklang.
6. **GIF (ixtiyoriy):** Bo'lmasa `empty` deb yozing.
7. **Web App URL:** `https://tashqariga.uz`
8. **Short name:** `app`
9. **Natija:** Sizga to'g'ridan-to'g'ri havola beriladi: `https://t.me/tashqariga_uz_bot/app`

---

## 6-qadam: Admin Chat ID ni aniqlash va .env ni to'ldirish

Yangi buyurtmalar va gid arizalari qaysi Telegram akkauntga yoki guruhga kelib tushishini sozlash:

1. Shaxsiy Telegram profilingizdan **[@userinfobot](https://t.me/userinfobot)** ga kiring.
2. Bot sizga `Id: 123456789` shaklida raqam beradi.
3. Ushbu raqamni `d:/antigravity/Tashqariga/bot/.env` fayliga kiriting:
   ```env
   ADMIN_CHAT_ID=123456789
   ```
   *(Agar bildirishnomalar maxsus adminlar guruhiga tushishi kerak bo'lsa, botni o'sha guruhga admin qilib qo'shing va guruh ID sini yozing (masalan: `-1001234567890`)).*

4. Loyihani ishga tushiring:
   ```bash
   cd d:/antigravity/Tashqariga/bot
   npm install
   npm start
   ```

Tabriklaymiz! Sizning **Tashqariga.uz** Telegram Bot va Mini App ekotizimingiz to'liq tayyor! 🚀🏔️
