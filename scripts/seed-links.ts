import 'dotenv/config';
import { db } from '../db';
import { links } from '../db/schema';

const userId = 'user_39mKH9KgwsiREDdXMthQQKUUUQL';

const exampleLinks = [
  {
    userId,
    shortCode: 'gh-repo',
    originalUrl: 'https://github.com/vercel/next.js',
    title: 'Next.js GitHub Repository',
    clicks: 42,
  },
  {
    userId,
    shortCode: 'docs',
    originalUrl: 'https://nextjs.org/docs',
    title: 'Next.js Documentation',
    clicks: 128,
  },
  {
    userId,
    shortCode: 'blog',
    originalUrl: 'https://example.com/my-awesome-blog',
    title: 'My Personal Blog',
    clicks: 37,
  },
  {
    userId,
    shortCode: 'video',
    originalUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Favorite Video Tutorial',
    clicks: 215,
  },
  {
    userId,
    shortCode: 'portfolio',
    originalUrl: 'https://myportfolio.dev',
    title: 'Portfolio Website',
    clicks: 89,
  },
  {
    userId,
    shortCode: 'twitter',
    originalUrl: 'https://twitter.com/vercel',
    title: 'Vercel Twitter',
    clicks: 64,
  },
  {
    userId,
    shortCode: 'product',
    originalUrl: 'https://products.example.com/new-launch',
    title: 'Product Launch Page',
    clicks: 156,
  },
  {
    userId,
    shortCode: 'api-docs',
    originalUrl: 'https://api.example.com/v2/documentation',
    title: 'API Documentation v2',
    clicks: 73,
  },
  {
    userId,
    shortCode: 'linkedin',
    originalUrl: 'https://linkedin.com/in/johndoe',
    title: 'LinkedIn Profile',
    clicks: 52,
  },
  {
    userId,
    shortCode: 'demo',
    originalUrl: 'https://demo.project.com',
    title: 'Demo Project',
    clicks: 98,
  },
];

async function seed() {
  try {
    console.log('Seeding database with example links...');
    
    for (const link of exampleLinks) {
      await db.insert(links).values(link);
      console.log(`✓ Inserted: ${link.shortCode} -> ${link.originalUrl}`);
    }
    
    console.log('\n✅ Successfully inserted 10 example links!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
