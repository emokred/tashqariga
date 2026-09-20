# 🚀 Tashqariga.uz — Production Deployment & Cloud Setup Guide (Vibecoder Edition)

> **Muallif:** Senior DevOps & Cloud Deployment Lead  
> **Loyiha:** Tashqariga.uz — O‘zbekiston Tog‘lari va Hiking Agregatori  
> **Texnologiya:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Lucide Icons + Telegram WebApp SDK  
> **Maqsad:** Loyihani GitHub'ga yuklash, Render.com yoki Vercel'da 5 daqiqada jonli efirga (production) chiqarish va rasmiy `tashqariga.uz` domenini sozlash.

---

## ⚡ 5 Daqiqalik Tezkor Xulosa (Quick Cheat Sheet)

| Platforma | Tavsiya darajasi | Sozlash vaqti | Narxi | Afzalliklari | Kamchiliklari |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vercel** | ⭐️⭐️⭐️⭐️⭐️ (№1 Tavsiya) | **2 daqiqa** | Bepul (Hobby) | Next.js yaratuvchilaridan; 0ms cold-start; avtomatik SSL; bepul Frankfurt edge CDN; 1-klik deploy | Serverless funksiyalar cheklovi (oddiy veb-sayt uchun yetarli) |
| **Render.com** | ⭐️⭐️⭐️⭐️ (Muqobil) | **4 daqiqa** | Bepul / $7/oy | Doimiy Node.js jarayoni; Web Service / Docker; `render.yaml` blueprint bor | Bepul versiyada 15 min harakatsizlikdan so'ng uxlaydi (~40s uyg'onish) |

---

## 📁 Loyihadagi Tayyor Konfiguratsiya Fayllari

Sizning loyihangizda production uchun zarur barcha konfiguratsiya fayllari oldindan tayyorlandi:

1. [`.gitignore`](file:///d:/antigravity/Tashqariga/.gitignore) — keraksiz `node_modules`, `.next`, `.env*` maxfiy kalitlari GitHub'ga chiqib ketishini to'xtatadi.
2. [`render.yaml`](file:///d:/antigravity/Tashqariga/render.yaml) — Render.com uchun Infrastructure-as-Code Blueprint (Frankfurt mintaqasi, Node 20, avto-build).
3. [`vercel.json`](file:///d:/antigravity/Tashqariga/vercel.json) — Vercel optimizatsiyasi, Frankfurt mintaqasi (`fra1`) va xavfsizlik sarlavhalari (headers).
4. [`.env.example`](file:///d:/antigravity/Tashqariga/.env.example) — Muhit o'zgaruvchilari namunasi.

---

## 📦 1-QADAM: Git Repositoriyasini Yaratish va GitHub'ga Yuklash

Loyihani GitHub'ga yuklash uchun quyidagi buyruqlarni terminalingizda (PowerShell yoki Git Bash) navbati bilan bajaring:

### 1.1. Git reposini initsializatsiya qilish va commit qilish

```powershell
# 1. Tashqariga papkasida ekanligingizga ishonch hosil qiling
cd d:/antigravity/Tashqariga

# 2. Yangi Git repozitoriyasini ochish
git init

# 3. Barcha fayllarni indeksga qo'shish (.gitignore avtomatik ishlaydi)
git add .

# 4. Ilk reliz commitini yaratish
git commit -m "feat: launch Tashqariga.uz production ready app"

# 5. Asosiy tarmoq nomini 'main' qilish
git branch -M main
```

### 1.2. GitHub'da yangi repozitoriya ochish

1. Brauzeringizda **[github.com/new](https://github.com/new)** sahifasiga kiring.
2. **Repository name:** `tashqariga` (yoki `tashqariga-uz`) deb yozing.
3. Reponi **Public** yoki **Private** tanlang.
4. ⚠️ **MUHIM:** *"Initialize this repository with a README"*, *"Add .gitignore"* yoki *"Add a license"* katakchalarini **BO'SH QOLDIRING** (chunki biz ularni allaqachon lokalda yaratdik).
5. **"Create repository"** tugmasini bosing.

### 1.3. Lokal kodni GitHub'ga ulash va Push qilish

GitHub taqdim etgan havolani olib, quyidagi buyruqlarni bering (o'z username'ingizni qo'ying):

```powershell
# Masofaviy repository manzilini qo'shish:
git remote add origin https://github.com/SIZNING_USERNAME/tashqariga.git

# Kodni GitHub'ga yuklash:
git push -u origin main
```

*🎉 Kod GitHub'da! Endi uni 1 daqiqada jonli efirga chiqaramiz.*

---

## 🌐 2-QADAM (A-VARIANT): Vercel Orqali Deploy Qilish (ENG TAVSIYA ETILADIGAN)

Vercel — Next.js asoschilari tomonidan yaratilgan platforma bo'lib, eng tezyurar global CDN, avtomatik SSL va 0-soniyalik cold-start imkoniyatini beradi.

### Bosqichma-bosqich qo'llanma:

1. **Vercel'ga kiring:** [vercel.com/signup](https://vercel.com/signup) sahifasiga o'ting va **"Continue with GitHub"** orqali kiring.
2. **Yangi loyiha qo'shing:** Dashboard'da o'ng tomondagi **"Add New..."** -> **"Project"** tugmasini bosing.
3. **Reponi tanlang:** Ro'yxatdan yangi ochgan `tashqariga` repozitoriyangiz yonidagi **"Import"** tugmasini bosing.
4. **Konfiguratsiyani tekshiring:**
   - **Project Name:** `tashqariga`
   - **Framework Preset:** `Next.js` (avtomatik aniqlanadi)
   - **Root Directory:** `./`
   - **Build and Output Settings:** O'z holicha qoldiring (`npm run build` va `.next` avtomatik ishlaydi).
5. **Environment Variables (Muhit o'zgaruvchilari):**
   - **Key:** `NEXT_PUBLIC_APP_URL`
   - **Value:** `https://tashqariga.uz` (yoki vaqtincha Vercel beradigan domen)
   - **"Add"** tugmasini bosing.
6. **Deploy tugmasini bosing:** **"Deploy"** tugmasini bosing.
7. Taxminan 45-60 soniyada salyutlar (confetti) otiladi va sizga jonli havola beriladi:  
   👉 `https://tashqariga.vercel.app`

> [!TIP]
> Keyingi har safar `git push origin main` qilganingizda, Vercel avtomatik tarzda o'zgarishlarni tekshirib, 30 soniyada jonli saytni yangilaydi (CI/CD Continuous Deployment).

---

## 🛠️ 2-QADAM (B-VARIANT): Render.com Orqali Web Service Deploy Qilish

Agar loyihani Render.com bulutida Web Service sifatida yurgizmoqchi bo'lsangiz:

### 1-Usul: `render.yaml` Blueprint orqali (1-klik)
Loyihada [`render.yaml`](file:///d:/antigravity/Tashqariga/render.yaml) tayyor turibdi:
1. [dashboard.render.com](https://dashboard.render.com) ga kiring.
2. **"New +"** -> **"Blueprint"** tugmasini bosing.
3. GitHub repongizni (`tashqariga`) ulang.
4. Render avtomatik ravishda `render.yaml` faylini o'qiydi:
   - Frankfurt data-markazi
   - Node 20 runtime
   - `npm install && npm run build`
   - `npm run start`
5. **"Apply"** tugmasini bosing. Bo'ldi!

---

### 2-Usul: Render Dashboard orqali Qo'lda (Manual) Sozlash
Agar Blueprintsiz, qo'lda ochmoqchi bo'lsangiz:

1. [dashboard.render.com](https://dashboard.render.com) -> **"New +"** -> **"Web Service"**.
2. **"Build and deploy from a Git repository"** ni tanlang va GitHub reponi ulang.
3. Quyidagi parametrlarni kiriting:
   - **Name:** `tashqariga`
   - **Region:** `Frankfurt (EU Central)` *(O'zbekiston uchun eng past ping / tezyurar aloqa)*
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:**
     ```bash
     npm install && npm run build
     ```
   - **Start Command:**
     ```bash
     npm run start
     ```
   - **Instance Type:** `Free` (bepul sinash uchun) yoki `Starter` ($7/oy, 24/7 uxlamaydigan doimiy rejim).
4. **Environment Variables bo'limiga kiring va qo'shing:**
   - `NODE_VERSION` = `20.17.0`
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_APP_URL` = `https://tashqariga.onrender.com` (domen ulangandan keyin `https://tashqariga.uz` qilasiz)
5. **"Create Web Service"** tugmasini bosing.
6. 2-3 daqiqada build tugaydi va Render havolasi ochiladi:  
   👉 `https://tashqariga.onrender.com`

> [!WARNING]
> **Render Free Plan haqida muhim eslatma:**  
> Render bepul rejada harakatsizlik bo'lsa 15 daqiqadan so'ng serverni "uxlatib" qo'yadi. Keyingi foydalanuvchi kirganda 40-50 soniya "sovuq start" (cold boot) bo'ladi.
> 
> **Yechim:**  
> a) Saytni **Vercel**da tekinga ishlatish (cold-start umuman yo'q).  
> b) Yoki Render'da bepul [cron-job.org](https://cron-job.org) orqali har 10 daqiqada `https://tashqariga.onrender.com` ga GET so'rov yuborib turish (uyg'oq saqlash).

---

## 🔑 3-QADAM: Muhit O'zgaruvchilari (Environment Variables) Jadvali

Deploy platformasida (Vercel yoki Render Settings -> Environment Variables) quyidagi o'zgaruvchilarni kiriting:

| O'zgaruvchi Nomi | Misol Qiymati | Majburiymi? | Tavsif |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | `https://tashqariga.uz` | Ha | QR-kodlar, sayt havolalari, OpenGraph ulashish kartalari uchun asosiy domen |
| `NODE_ENV` | `production` | Ha | Next.js'ni maksimal tezlik va optimallashtirilgan rejimga o'tkazadi |
| `PORT` | `3000` (Render: `10000`) | Avtomatik | Platforma o'zi beradi |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | `tashqarigabot` | Ixtiyoriy | Telegram Mini App va qo'llab-quvvatlash bot usernameni |

---

## 🌍 4-QADAM: `tashqariga.uz` Domenini Ulash (DNS Sozlamalari)

O'zbekistondagi milliy domen provayderlaridan (masalan: **Eskiz.uz, Arsenal-D, Reg.uz, Tomas.uz, CCTLD.uz**) yoki **Cloudflare** orqali `tashqariga.uz` domenini hostingga ulash tartibi:

### 4.1. Vercel uchun DNS yozuvlari (Tavsiya etiladi)

Vercel Dashboard -> Loyihangiz -> **Settings** -> **Domains** bo'limiga kiring:
1. Qatorga `tashqariga.uz` deb yozib **"Add"** tugmasini bosing.
2. Vercel sizga `www.tashqariga.uz` ni ham qo'shishni va uni asosiy domenga yo'naltirishni (redirect) taklif qiladi -> **"Add both"** ni tanlang.
3. Domen provayderingiz shaxsiy kabinetiga (DNS boshqaruvi bo'limiga) kiring va quyidagi 2 ta DNS yozuvini kiriting:

| Yozuv Turi (Type) | Nom / Host (Name) | Qiymat (Target / Value / IP) | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` (yoki bo'sh) | `76.76.21.21` | 3600 (yoki Auto) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 3600 (yoki Auto) |

*Vercel avtomatik ravishda bepul Let's Encrypt SSL (HTTPS) sertifikatini o'rnatib beradi.*

---

### 4.2. Render.com uchun DNS yozuvlari

Render Dashboard -> `tashqariga` xizmatingiz -> **Settings** -> **Custom Domains**:
1. **"Add Custom Domain"** tugmasini bosing: `tashqariga.uz` va `www.tashqariga.uz` ni kiriting.
2. Domen boshqaruv panelida quyidagi yozuvlarni kiriting:

| Yozuv Turi (Type) | Nom / Host (Name) | Qiymat (Value / IP) | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | Render Settings'da ko'rsatilgan IP (masalan: `216.24.57.1`) | 3600 |
| **CNAME** | `www` | `tashqariga.onrender.com` | 3600 |

---

### 4.3. Cloudflare orqali Ulab Bepul Kesh va DDOS Himoya O'rnatish (Pro Maslahat)

Agar domeningizni **Cloudflare**ga ulasangiz:
1. Domen provayderingizda (Eskiz.uz) Cloudflare NS (Nameserver)larini ko'rsatasiz.
2. Cloudflare DNS panelida yuqoridagi A va CNAME yozuvlarini kiritasiz.
3. **Proxy status:** 🟠 **Proxied** qilib yoqasiz.
4. **SSL/TLS rejimi:** **"Full"** yoki **"Full (Strict)"** qilib belgilang.
5. Natijada O'zbekiston ichida ham, xalqaro miqyosda ham saytingiz bir zumda ochiladi, rasm va statik fayllar Cloudflare keshidan chaqmoqdek yuklanadi.

> [!NOTE]
> DNS o'zgarishlari butun dunyo bo'ylab tarqalishi (DNS Propagation) provayderga qarab **15 daqiqadan 24 soatgacha** vaqt olishi mumkin. Tekshirish uchun bepul [dnschecker.org](https://dnschecker.org/#A/tashqariga.uz) xizmatidan foydalanishingiz mumkin.

---

## 🤖 5-QADAM: Telegram Mini App (Web App) Sifatida Ulash

Tashqariga.uz loyihasida [`telegram-web-app.js`](file:///d:/antigravity/Tashqariga/src/app/layout.tsx#L32) SDK ulangan va u Telegram ichida mukammal mobil ilova sifatida ochiladi.

Telegram bot orqali ishga tushirish:
1. Telegramda **[@BotFather](https://t.me/BotFather)** botiga kiring.
2. Yangi bot yarating (`/newbot`) yoki mavjud botingizni tanlang (`/mybots`).
3. **Bot Settings** -> **Menu Button** -> **Configure menu button** bo'limiga o'ting.
4. Bot menyu tugmasi bosilganda ochiladigan havola sifatida:  
   `https://tashqariga.uz` (yoki Vercel/Render havolangiz)ni kiriting.
5. Tugma nomiga masalan: `🏔 Tog'ga Chiqish` deb nom bering.
6. Endi har qanday foydalanuvchi botingizga kirib tugmani bossa, Tashqariga.uz to'liq ekranda zamonaviy Mini App bo'lib ochiladi!

---

## 🩺 6-QADAM: Health-Check, Monitoring & Troubleshooting

### 1. Build Failed (Qurishda Xatolik) bo'lsa:
- **Sabab:** Node.js versiyasi nomutanosibligi.
- **Yechim:** Render yoki Vercel'da `NODE_VERSION=20.17.0` qilib belgilanganligini tekshiring.

### 2. "Invalid or Missing Images" xatosi:
- **Sabab:** Loyihada Unsplash rasmlari ishlatilgan.
- **Yechim:** [`next.config.mjs`](file:///d:/antigravity/Tashqariga/next.config.mjs) faylida `images.unsplash.com` va `plus.unsplash.com` domenlari allaqachon sozlangan. Agar boshqa tashqi saytlardan rasm qo'shsangiz, uni ham ushbu faylga kiritib qo'yish kerak.

### 3. SSL "Not Secure" yoki Kutish holati:
- **Sabab:** DNS yozuvlari endigina qo'shilgan.
- **Yechim:** 15-30 daqiqa kuting. Vercel yoki Render avtomatik ravishda Let's Encrypt sertifikatini generatsiya qiladi.

### 4. Lokal kompyuterda (Windows) `EPERM: operation not permitted` xatosi:
- **Sabab:** Orqa fonda `npm run dev` ishlab turganda `npm run build` buyrug'i berilsa, Windows `.next/trace` faylini bloklab qo'yadi.
- **Yechim:** Ishlab turgan dev-serverni to'xtating (`Ctrl + C`), `.next` papkasini o'chiring yoki to'g'ridan-to'g'ri GitHub'ga push qiling (Vercel va Render Linux konteynerlarida bu muammo bo'lmaydi).

---

## 🏁 Xulosa va Tavsiya

1. **Bugunoq ishga tushirish uchun:** Loyihani GitHub'ga yuklab, **Vercel** orqali deploy qiling — bu eng tez, 100% barqaror va bepul usul.
2. **Domen mavjud bo'lgach:** Eskiz/Cloudflare orqali `76.76.21.21` A-rekordini `tashqariga.uz` ga yo'naltiring.
3. Loyiha to'liq production rejimiga tayyor holatda!
