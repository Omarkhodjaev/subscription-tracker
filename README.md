# Subscription Tracker

## Loyiha haqida

**Subscription Tracker** - bu shaxsiy obunalarni boshqarish uchun mo'ljallangan Node.js/Express asosidagi backend API loyihasi. Ushbu loyiha foydalanuvchilarga o'zlarining barcha obunalarini bir joyda kuzatish, boshqarish va nazorat qilish imkonini beradi.

### Asosiy maqsadlar:

- **Obunalarni markazlashtirilgan boshqarish** - barcha obunalarni bir joyda saqlash va boshqarish
- **Moliyaviy nazorat** - obuna xarajatlarini kuzatish va tahlil qilish
- **Avtomatik eslatmalar** - to'lov sanalarini eslatib turish
- **Kategoriyalash** - obunalarni turli kategoriyalar bo'yicha guruhlash

## Loyihaning imkoniyatlari

### 🔐 Autentifikatsiya

- Foydalanuvchi ro'yxatdan o'tishi (Sign-up)
- Tizimga kirish (Sign-in)
- Tizimdan chiqish (Sign-out)
- JWT token asosida xavfsizlik

### 👤 Foydalanuvchi boshqaruvi

- Profil ma'lumotlarini ko'rish va tahrirlash
- Parol o'zgartirish
- Hisob sozlamalari

### 📋 Obuna boshqaruvi

- Yangi obuna qo'shish
- Mavjud obunalarni ko'rish
- Obuna ma'lumotlarini tahrirlash
- Obunani o'chirish
- Obuna holatini boshqarish (active, expired, cancelled)

### 📊 Obuna kategoriyalari

- **Sports** - sport obunalari
- **Entertainment** - ko'ngilochar kontentlar
- **Education** - ta'lim platformalari
- **Health** - sog'liqni saqlash xizmatlari
- **Other** - boshqa kategoriyalar

### 💰 Moliyaviy ma'lumotlar

- **Valyutalar**: USD, EUR, GBP
- **To'lov davriyligi**: kunlik, haftalik, oylik, yillik
- **Narx kuzatuvi** va xarajatlar tahlili

### 🔄 Workflow boshqaruvi

- Avtomatik jarayonlar yaratish
- Eslatmalar va bildirishnomalar
- To'lov sanalarini kuzatish

## Texnik stack

- **Backend**: Node.js, Express.js
- **Ma'lumotlar bazasi**: MongoDB (Mongoose ODM)
- **Autentifikatsiya**: JWT, bcryptjs
- **Validatsiya**: Joi
- **Xavfsizlik**: Arcjet middleware
- **Workflow**: Upstash Workflow
- **Email**: Nodemailer
- **API Documentation**: Swagger UI, swagger-jsdoc

## O'rnatish va ishga tushirish

### 1. Loyihani klonlash

```bash
git clone https://github.com/Omarkhodjaev/subscription-tracker.git
cd subscription-tracker
```

### 2. Dependencies o'rnatish

```bash
npm install
```

### 3. Environment o'zgaruvchilarini sozlash

`.env.development.local.example` faylini `.env.development.local` ga nusxalang va kerakli ma'lumotlarni to'ldiring:

```bash
cp .env.development.local.example .env.development.local
```

Kerakli environment o'zgaruvchilar:

- `PORT` - server porti
- `MONGODB_URI` - MongoDB ulanish manzili
- `JWT_SECRET` - JWT token uchun maxfiy kalit
- `EMAIL_*` - email xizmati sozlamalari

### 4. Development rejimida ishga tushirish

```bash
npm run dev
```

### 5. Production rejimida ishga tushirish

```bash
npm start
```

### 6. Workflow development (ixtiyoriy)

Agar workflow funksiyalarini test qilmoqchi bo'lsangiz:

```bash
npx @upstash/qstash-cli dev
```

## API Documentation

### 📚 Swagger UI
Loyiha uchun to'liq API dokumentatsiyasi Swagger UI orqali mavjud:

```
http://localhost:5500/api-docs
```

**Swagger UI da quyidagilar mavjud:**
- **Barcha endpoint'lar** - to'liq API yo'llari ro'yxati
- **Request/Response schemalar** - har bir endpoint uchun kirish va chiqish ma'lumotlari
- **Interaktiv test** - to'g'ridan-to'g'ri brauzerda API'ni test qilish
- **Authentication** - JWT token bilan himoyalangan endpoint'larni test qilish
- **Model schemalar** - User va Subscription model'larining to'liq tavsifi

### 🔑 API'dan foydalanish
1. Swagger UI ga kiring: `http://localhost:5500/api-docs`
2. Authentication bo'limidan `/api/v1/auth/sign-up` yoki `/api/v1/auth/sign-in` orqali token oling
3. "Authorize" tugmasini bosing va JWT tokenni kiriting
4. Himoyalangan endpoint'larni test qiling

## API Endpoints

### Autentifikatsiya

- `POST /api/v1/auth/signup` - Ro'yxatdan o'tish
- `POST /api/v1/auth/signin` - Tizimga kirish
- `POST /api/v1/auth/signout` - Tizimdan chiqish

### Foydalanuvchi

- `GET /api/v1/users` - Barcha foydalanuvchilar
- `GET /api/v1/users/:id` - Bitta foydalanuvchi ma'lumotlari
- `PUT /api/v1/users/:id` - Foydalanuvchi ma'lumotlarini yangilash
- `DELETE /api/v1/users/:id` - Foydalanuvchi o'chirish

### Obunalar

- `GET /api/v1/subscriptions` - Barcha obunalarni ko'rish
- `GET /api/v1/subscriptions/upcoming-renewals` - Kelgusi to'lovlar ro'yxati
- `GET /api/v1/subscriptions/:id` - Bitta obuna ma'lumotlari
- `POST /api/v1/subscriptions` - Yangi obuna qo'shish
- `PUT /api/v1/subscriptions/:id` - Obuna yangilash
- `DELETE /api/v1/subscriptions/:id` - Obuna o'chirish
- `GET /api/v1/subscriptions/user/:id` - Foydalanuvchining barcha obunalari
- `PUT /api/v1/subscriptions/:id/cancel` - Obunani bekor qilish

### Workflow (Private)

- `POST /api/v1/workflows` - Yangi workflow yaratish
- `GET /api/v1/workflows` - Workflow'larni ko'rish

## Loyihadan foydalanish

1. **Ro'yxatdan o'ting** - `/api/v1/auth/signup` endpoint orqali hisob yarating
2. **Tizimga kiring** - `/api/v1/auth/signin` orqali autentifikatsiya qiling
3. **Obuna qo'shing** - `/api/v1/subscriptions` POST so'rovi bilan yangi obuna yarating
4. **Obunalarni boshqaring** - GET, PUT, DELETE so'rovlari orqali obunalaringizni nazorat qiling
5. **Workflow sozlang** - avtomatik eslatmalar va jarayonlar uchun workflow yarating

## Xavfsizlik

- JWT token asosida autentifikatsiya
- Parollar bcryptjs bilan shifrlangan
- Arcjet middleware orqali qo'shimcha himoya
- Input validatsiya Joi kutubxonasi bilan
- CORS va boshqa xavfsizlik choralarl

## Hissa qo'shish

Loyihaga hissa qo'shmoqchi bo'lsangiz:

1. Fork qiling
2. Feature branch yarating
3. O'zgarishlaringizni commit qiling
4. Pull request yuboring

## Litsenziya

Ushbu loyiha shaxsiy foydalanish uchun mo'ljallangan.

## About Developer

Umarkhon Khodjaev

- [GitHub](https://github.com/omarkhodjaev)
- [LinkedIn](https://www.linkedin.com/in/umarkhon-khodjaev-2982b2200/)
- [Email](mailto:js.with.umar@gmail.com)
