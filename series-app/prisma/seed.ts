import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo users
  const hashedPassword = await bcrypt.hash('password', 10);

  const user = await prisma.user.upsert({
    where: { email: 'user@demo.com' },
    update: {},
    create: {
      email: 'user@demo.com',
      name: 'Demo User',
      password: hashedPassword,
      role: 'user',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Created users:', { user: user.email, admin: admin.email });

  // Create series
  const strangerThings = await prisma.series.create({
    data: {
      title: 'Stranger Things',
      titleThai: 'สเตรนเจอร์ ธิงส์',
      description:
        'เมื่อเด็กชายคนหนึ่งหายตัวไปอย่างลึกลับในเมืองเล็กๆ เพื่อนๆ ของเขาพบสาวน้อยลึกลับที่มีพลังพิเศษ',
      thumbnail: 'https://images.unsplash.com/photo-1574267432644-f95f01111a0a?w=500',
      banner: 'https://images.unsplash.com/photo-1574267432644-f95f01111a0a?w=1920',
      genre: JSON.stringify(['Sci-Fi', 'Horror', 'Mystery']),
      releaseYear: 2016,
      rating: 4.8,
      totalSeasons: 4,
      totalEpisodes: 34,
      status: 'ongoing',
      trailer: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
    },
  });

  // Create seasons and episodes for Stranger Things
  const season1 = await prisma.season.create({
    data: {
      seriesId: strangerThings.id,
      seasonNumber: 1,
      title: 'Season 1',
      description: 'การเริ่มต้นของการผจญภัยอันน่าตื่นเต้น',
      releaseDate: new Date('2016-07-15'),
      thumbnail: 'https://images.unsplash.com/photo-1574267432644-f95f01111a0a?w=500',
    },
  });

  await prisma.episode.createMany({
    data: [
      {
        seasonId: season1.id,
        episodeNumber: 1,
        title: 'The Vanishing of Will Byers',
        description: 'วิลล์ ไบเออร์สหายตัวไปอย่างลึกลับ',
        thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
        duration: 47,
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        releaseDate: new Date('2016-07-15'),
        views: 8500000,
      },
      {
        seasonId: season1.id,
        episodeNumber: 2,
        title: 'The Weirdo on Maple Street',
        description: 'เพื่อนๆ พบกับสาวน้อยลึกลับ',
        thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
        duration: 55,
        videoUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        releaseDate: new Date('2016-07-15'),
        views: 7800000,
      },
    ],
  });

  console.log('✅ Created series: Stranger Things');

  // Add to watchlist
  await prisma.watchlist.create({
    data: {
      userId: user.id,
      seriesId: strangerThings.id,
    },
  });

  // Add reviews
  await prisma.review.create({
    data: {
      userId: user.id,
      seriesId: strangerThings.id,
      rating: 5,
      comment: 'ซีรี่ย์ที่ยอดเยี่ยม! ติดตามมาตั้งแต่ต้นจนจบ',
      likes: 42,
    },
  });

  // Add comments
  await prisma.comment.create({
    data: {
      userId: user.id,
      seriesId: strangerThings.id,
      content: 'ไม่อดทนรอซีซั่นถัดไป!',
      likes: 15,
    },
  });

  // Add notification
  await prisma.notification.create({
    data: {
      userId: user.id,
      title: 'ตอนใหม่ออกแล้ว!',
      message: 'Stranger Things Season 5 Episode 1 ออกแล้ว',
      type: 'new_episode',
      data: JSON.stringify({ seriesId: strangerThings.id }),
    },
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
