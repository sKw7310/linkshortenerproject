import { pgTable, text, timestamp, integer, varchar, uuid } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
  originalUrl: text('original_url').notNull(),
  title: text('title'),
  clicks: integer('clicks').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
