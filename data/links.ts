import { db } from "@/db";
import { links } from "@/db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

/**
 * Fetch all links for a specific user
 * @param userId - The Clerk user ID
 * @returns Array of links ordered by creation date (newest first)
 */
export async function getUserLinks(userId: string) {
  return await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

/**
 * Fetch a single link by ID for a specific user
 * @param linkId - The link ID
 * @param userId - The Clerk user ID
 * @returns The link if found and owned by the user, null otherwise
 */
export async function getUserLink(linkId: string, userId: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId))
    .limit(1);

  const link = result[0];

  if (!link || link.userId !== userId) {
    return null;
  }

  return link;
}

/**
 * Fetch a link by its short code
 * @param shortCode - The short code
 * @returns The link if found, null otherwise
 */
export async function getLinkByShortCode(shortCode: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  return result[0] || null;
}

/**
 * Create a new link for a user
 * @param userId - The Clerk user ID
 * @param data - Link data (originalUrl, shortCode, title)
 * @returns The created link
 */
export async function createLinkForUser(
  userId: string,
  data: {
    originalUrl: string;
    shortCode: string;
    title?: string;
  },
) {
  const result = await db
    .insert(links)
    .values({
      userId,
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      title: data.title || null,
    })
    .returning();

  return result[0];
}

/**
 * Update a link for a user
 * @param linkId - The link ID
 * @param userId - The Clerk user ID
 * @param data - Updated link data (originalUrl, title)
 * @returns The updated link if successful, null if link not found or not owned by user
 */
export async function updateLinkForUser(
  linkId: string,
  userId: string,
  data: {
    originalUrl?: string;
    title?: string;
  },
) {
  const result = await db
    .update(links)
    .set({
      ...data,
      title: data.title || null,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  return result[0] || null;
}

/**
 * Delete a link for a user
 * @param linkId - The link ID
 * @param userId - The Clerk user ID
 * @returns True if deleted, false if link not found or not owned by user
 */
export async function deleteLinkForUser(linkId: string, userId: string) {
  const result = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning();

  return result.length > 0;
}

/**
 * Increment the click count for a link
 * @param shortCode - The short code of the link
 * @returns The updated link if successful, null if link not found
 */
export async function incrementLinkClicks(shortCode: string) {
  const result = await db
    .update(links)
    .set({
      clicks: sql`${links.clicks} + 1`,
    })
    .where(eq(links.shortCode, shortCode))
    .returning();

  return result[0] || null;
}
