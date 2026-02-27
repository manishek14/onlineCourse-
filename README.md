# 🎓 پلتفرم آموزش آنلاین

یک پلتفرم آموزشی مدرن با Node.js، Express، MongoDB و React

## ✨ ویژگی‌ها

### بک‌اند
- 🔐 سیستم احراز هویت کامل با JWT و Refresh Token
- 👥 مدیریت کاربران و نقش‌ها (Admin/User)
- 📚 مدیریت دوره‌ها و مقالات
- 💬 سیستم کامنت و نظرات
- 🎫 سیستم تیکتینگ
- 📧 ارسال OTP با SMS
- 🔔 سیستم نوتیفیکیشن
- 📊 Swagger API Documentation
- 🛡️ امنیت بالا با bcrypt و httpOnly cookies

### فرانت‌اند
- ✨ طراحی Liquid Glassy با افکت‌های شیشه‌ای
- 🌓 تم روشن و تاریک
- 📱 طراحی ریسپانسیو
- ⚡ سریع و بهینه با Vite
- 🎨 انیمیشن‌های روان
- 🔄 مدیریت state با Context API

## 🚀 نصب و راه‌اندازی

### روش 1: استفاده از Docker (توصیه می‌شود) 🐳

```bash
# کلون کردن پروژه
git clone https://github.com/manishek14/onlineCourse-.git
cd N303-

# کپی کردن فایل محیطی
cp .env.example .env

# ویرایش .env و تنظیم مقادیر
nano .env

# اجرای با Docker Compose
docker-compose up -d

# مشاهده لاگ‌ها
docker-compose logs -f
```

**دسترسی به برنامه:**
- Frontend: http://localhost
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api-docs
- Mongo Express: http://localhost:8081 (dev mode)

برای اطلاعات بیشتر: [راهنمای Docker](./DOCKER_GUIDE.md)

### روش 2: نصب دستی

### پیش‌نیازها
- Node.js (v16 یا بالاتر)
- MongoDB
- npm یا yarn

### نصب بک‌اند

```bash
# نصب وابستگی‌ها
npm install

# تنظیم متغیرهای محیطی
cp .env.example .env
# فایل .env را ویرایش کنید

# اجرای سرور
npm start

# یا در حالت توسعه
npm run dev
```

### نصب فرانت‌اند

```bash
cd frontend

# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# بیلد برای پروداکشن
npm run build
```

## 📁 ساختار پروژه

```
N303-/
├── configs/           # تنظیمات دیتابیس و Swagger
├── controllers/       # کنترلرهای API
│   └── v1/           # نسخه 1 API
├── middleware/        # میدلورهای احراز هویت
├── models/           # مدل‌های MongoDB
├── routes/           # مسیرهای API
├── utils/            # توابع کمکی
├── validators/       # اعتبارسنجی ورودی‌ها
├── public/           # فایل‌های استاتیک
├── frontend/         # اپلیکیشن React
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   └── index.html
└── server.js         # نقطه ورود برنامه
```

## 🔧 تنظیمات

فایل `.env` را با مقادیر زیر پر کنید:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/courseOnline
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
SMS_IR_API_KEY=your-sms-api-key
NODE_ENV=development
```

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - ثبت‌نام کاربر جدید
- `POST /api/v1/auth/login` - ورود کاربر
- `POST /api/v1/auth/logout` - خروج کاربر
- `GET /api/v1/auth/me` - دریافت اطلاعات کاربر
- `POST /api/v1/auth/refreshToken` - تازه‌سازی توکن
- `POST /api/v1/auth/sms/code` - ارسال کد OTP
- `POST /api/v1/auth/sms/verify` - تایید کد OTP

### Courses
- `GET /api/v1/courses` - لیست دوره‌ها
- `POST /api/v1/courses` - ایجاد دوره جدید (Admin)
- `GET /api/v1/courses/:id` - جزئیات دوره
- `PUT /api/v1/courses/:id` - ویرایش دوره (Admin)
- `DELETE /api/v1/courses/:id` - حذف دوره (Admin)

مستندات کامل API در `/api-docs` موجود است.

## 🛠️ تکنولوژی‌ها

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (Access & Refresh Tokens)
- Bcrypt
- Swagger UI
- Axios (SMS Integration)

### Frontend
- React 18
- React Router v6
- Axios
- Vite
- CSS3 (Backdrop Filter, Animations)

## 🔒 امنیت

- رمزهای عبور با bcrypt هش می‌شوند
- توکن‌ها در httpOnly cookies ذخیره می‌شوند
- CORS و Security Headers
- اعتبارسنجی ورودی‌ها
- محافظت در برابر NoSQL Injection

## 📝 لایسنس

MIT

## 👨‍💻 توسعه‌دهنده

توسعه داده شده با ❤️ برای یادگیری بهتر

## 🤝 مشارکت

Pull Request ها و Issue ها خوش‌آمدید!

1. Fork کنید
2. برنچ جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید
