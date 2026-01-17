# 🎬 SeriesHub - แพลตฟอร์มซีรี่ย์ออนไลน์

แอพพลิเคชั่นเว็บสำหรับดูซีรี่ย์ออนไลน์ สร้างด้วย **Next.js 15**, **TypeScript**, และ **Tailwind CSS**

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)
![React](https://img.shields.io/badge/React-19-blue)

## ✨ ฟีเจอร์หลัก

### 🎯 สำหรับผู้ใช้งาน
- **🏠 หน้าแรก** - Hero section พร้อมซีรี่ย์แนะนำและหมวดหมู่ต่างๆ
- **🔍 เรียกดูและค้นหา** - ระบบค้นหาและกรองซีรี่ย์ตามหมวดหมู่ คะแนน และสถานะ
- **📺 ดูซีรี่ย์** - Video player ที่ครบฟีเจอร์พร้อมระบบเล่นต่อตอนถัดไปอัตโนมัติ
- **📋 รายละเอียดซีรี่ย์** - ข้อมูลครบถ้วนเกี่ยวกับซีรี่ย์ ตอน นักแสดง และรีวิว
- **⭐ ระบบ Watchlist** - บันทึกซีรี่ย์ที่ชอบและติดตามความคืบหน้าการดู
- **👤 โปรไฟล์ผู้ใช้** - จัดการบัญชีและประวัติการดู

### 🛠 สำหรับ Admin
- **📊 Dashboard** - ภาพรวมสถิติระบบ
- **➕ จัดการซีรี่ย์** - เพิ่ม แก้ไข ลบซีรี่ย์และตอนต่างๆ
- **👥 จัดการผู้ใช้** - ดูและจัดการบัญชีผู้ใช้งาน
- **📈 สถิติ** - ยอดวิว คะแนน และข้อมูลเชิงลึกอื่นๆ

## 🚀 เทคโนโลยีที่ใช้

### Frontend Framework
- **Next.js 15** - React framework พร้อม App Router
- **React 19** - UI library ล่าสุด
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark mode support

### Video & Media
- **React Player** - ระบบเล่นวิดีโอที่รองรับหลายแพลตฟอร์ม

### Utilities
- **date-fns** - จัดการวันที่และเวลา
- **clsx** - ตัวช่วยจัดการ className

## 📁 โครงสร้างโปรเจค

```
series-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # Admin dashboard
│   │   ├── series/[id]/       # หน้ารายละเอียดซีรี่ย์
│   │   ├── watch/[id]/        # หน้าดูซีรี่ย์
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # หน้าแรก
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── layout/           # Layout components (Navbar, Footer)
│   │   ├── series/           # Series-related components
│   │   └── ui/               # Reusable UI components
│   ├── data/                  # Mock data
│   │   └── mockData.ts       # ข้อมูลจำลองสำหรับ demo
│   ├── lib/                   # Utility functions
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
│       └── index.ts          # Type definitions
├── public/                    # Static files
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🏗 การติดตั้งและรันโปรเจค

### ข้อกำหนดเบื้องต้น
- Node.js 18+
- npm, yarn, หรือ pnpm

### ขั้นตอนการติดตั้ง

1. **Clone repository**
```bash
cd series-app
```

2. **ติดตั้ง dependencies**
```bash
npm install
# หรือ
yarn install
# หรือ
pnpm install
```

3. **รันโปรเจคในโหมด development**
```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
```

4. **เปิดเว็บบราวเซอร์**
```
http://localhost:3000
```

### คำสั่งอื่นๆ

```bash
# Build สำหรับ production
npm run build

# รัน production server
npm run start

# Lint code
npm run lint
```

## 🎨 หน้าจอหลัก

### หน้าแรก (`/`)
- Hero section พร้อมซีรี่ย์แนะนำ
- แถวซีรี่ย์ตามหมวดหมู่: กำลังฮิต, เพิ่งออกใหม่, แอคชั่น, ดราม่า, ไซไฟ
- Responsive design สำหรับทุกอุปกรณ์

### หน้ารายละเอียดซีรี่ย์ (`/series/[id]`)
- ข้อมูลครบถ้วนของซีรี่ย์
- รายการนักแสดง
- รายการตอนทั้งหมด พร้อม thumbnail
- Trailer (ถ้ามี)

### หน้าดูซีรี่ย์ (`/watch/[id]`)
- Video player แบบ custom พร้อม:
  - Play/Pause controls
  - Progress bar
  - Volume control
  - Fullscreen mode
  - Skip forward/backward (10 วินาที)
- รายการตอนทั้งหมดด้านข้าง
- เล่นต่อตอนถัดไปอัตโนมัติ

### Admin Dashboard (`/admin`)
- สถิติภาพรวมระบบ
- จัดการซีรี่ย์ (CRUD operations)
- จัดการผู้ใช้
- ตารางข้อมูลแบบ interactive

## 📊 ข้อมูลจำลอง (Mock Data)

โปรเจคนี้ใช้ข้อมูลจำลองที่เก็บใน `src/data/mockData.ts` ประกอบด้วย:

- **6 ซีรี่ย์** พร้อมข้อมูลครบถ้วน:
  - Stranger Things
  - The Crown
  - Breaking Bad
  - Wednesday
  - The Last of Us
  - Dark

- **ซีซั่นและตอน** พร้อม:
  - รายละเอียดตอน
  - Thumbnail
  - ลิงก์วิดีโอตัวอย่าง
  - ระยะเวลา

- **ผู้ใช้งาน 2 คน** (User และ Admin)

## 🔧 การปรับแต่ง

### เพิ่มซีรี่ย์ใหม่

แก้ไขไฟล์ `src/data/mockData.ts`:

```typescript
export const mockSeries: Series[] = [
  // ซีรี่ย์เดิม...
  {
    id: '7',
    title: 'ชื่อซีรี่ย์ใหม่',
    titleThai: 'ชื่อภาษาไทย',
    description: 'เรื่องย่อ...',
    thumbnail: 'URL รูป',
    banner: 'URL แบนเนอร์',
    genre: ['Action', 'Drama'],
    releaseYear: 2024,
    rating: 4.5,
    // ... ข้อมูลอื่นๆ
  }
];
```

### เปลี่ยนสีธีม

แก้ไขไฟล์ `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#E50914',  // สีหลัก
      // เพิ่มสีอื่นๆ
    }
  }
}
```

### เปลี่ยน Layout

แก้ไขไฟล์ `src/components/layout/Navbar.tsx` และ `Footer.tsx`

## 🚀 Deployment

### Vercel (แนะนำ)

1. Push code ไป GitHub
2. เชื่อมต่อ repository กับ Vercel
3. Deploy อัตโนมัติ

```bash
npm install -g vercel
vercel
```

### อื่นๆ
- **Netlify**: รองรับ Next.js
- **Railway**: Deploy ได้ง่าย
- **DigitalOcean App Platform**: รองรับ Next.js

## 🔐 Authentication (ขั้นตอนถัดไป)

ในอนาคตสามารถเพิ่ม authentication ด้วย:
- **NextAuth.js** - Authentication สำหรับ Next.js
- **Clerk** - Authentication as a Service
- **Supabase Auth** - Open source alternative

## 💾 Database Integration (ขั้นตอนถัดไป)

แทนที่ mock data ด้วย database จริง:
- **PostgreSQL + Prisma** - Type-safe ORM
- **MongoDB + Mongoose** - NoSQL flexibility
- **Supabase** - PostgreSQL + Realtime

## 📝 TODO / ฟีเจอร์เพิ่มเติม

- [ ] ระบบ Authentication แบบเต็มรูปแบบ
- [ ] ระบบ Comment และ Review
- [ ] ระบบแจ้งเตือนตอนใหม่
- [ ] Recommendation engine
- [ ] ดาวน์โหลดสำหรับดูออฟไลน์
- [ ] Subtitle support
- [ ] Multiple video quality
- [ ] Continue watching feature
- [ ] Social sharing
- [ ] Mobile app (React Native)

## 🤝 Contributing

Pull requests are welcome! สำหรับการเปลี่ยนแปลงใหญ่ กรุณาเปิด issue ก่อนเพื่อหารือเกี่ยวกับสิ่งที่ต้องการเปลี่ยนแปลง

## 📄 License

This project is licensed under the MIT License

## 👨‍💻 Author

Created with ❤️ by Claude AI

## 🙏 Acknowledgments

- **Next.js Team** - สำหรับ framework ที่ยอดเยี่ยม
- **Vercel** - สำหรับ hosting ฟรี
- **Tailwind CSS** - สำหรับ utility CSS
- **Unsplash** - สำหรับรูปภาพตัวอย่าง

---

## 📞 Support

หากมีปัญหาหรือคำถาม กรุณาเปิด issue ใน GitHub repository

**Happy Coding! 🎉**
