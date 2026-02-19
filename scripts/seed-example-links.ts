import { db } from '../db';
import { links } from '../db/schema';

async function seedExampleLinks() {
  const userId = 'user_39mKH9KgwsiREDdXMthQQKUUUQL';
  
  const exampleLinks = [
    {
      userId,
      shortCode: 'gh2024',
      originalUrl: 'https://github.com',
    },
    {
      userId,
      shortCode: 'yt-vid',
      originalUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      userId,
      shortCode: 'docs',
      originalUrl: 'https://docs.google.com/document/d/1a2b3c4d5',
    },
    {
      userId,
      shortCode: 'amzn',
      originalUrl: 'https://amazon.com/products/tech-gadget-2024',
    },
    {
      userId,
      shortCode: 'blog',
      originalUrl: 'https://medium.com/@myusername/web-development-best-practices',
    },
    {
      userId,
      shortCode: 'portfolio',
      originalUrl: 'https://myportfolio.dev/projects/featured',
    },
    {
      userId,
      shortCode: 'wiki',
      originalUrl: 'https://en.wikipedia.org/wiki/Computer_science',
    },
    {
      userId,
      shortCode: 'tweet',
      originalUrl: 'https://twitter.com/user/status/1234567890',
    },
    {
      userId,
      shortCode: 'reddit',
      originalUrl: 'https://reddit.com/r/programming/comments/abc123',
    },
    {
      userId,
      shortCode: 'npm-pkg',
      originalUrl: 'https://npmjs.com/package/my-awesome-package',
    },
  ];

  try {
    const insertedLinks = await db.insert(links).values(exampleLinks).returning();
    console.log(`✅ Successfully inserted ${insertedLinks.length} example links:`);
    insertedLinks.forEach(link => {
      console.log(`  - ${link.shortCode} → ${link.originalUrl}`);
    });
    return insertedLinks;
  } catch (error) {
    console.error('❌ Error inserting links:', error);
    throw error;
  }
}

seedExampleLinks()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
