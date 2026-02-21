"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import {
  createLinkForUser,
  getLinkByShortCode,
  updateLinkForUser,
  deleteLinkForUser,
} from "@/data/links";
import { revalidatePath } from "next/cache";

const CreateLinkSchema = z.object({
  originalUrl: z.string().url("Must be a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores",
    )
    .optional(),
  title: z.string().max(200, "Title must be at most 200 characters").optional(),
});

const UpdateLinkSchema = z.object({
  linkId: z.string().uuid("Invalid link ID"),
  originalUrl: z.string().url("Must be a valid URL"),
  title: z.string().max(200, "Title must be at most 200 characters").optional(),
});

const DeleteLinkSchema = z.object({
  linkId: z.string().uuid("Invalid link ID"),
});

export async function createLink(data: unknown) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized. Please sign in to create links." };
  }

  try {
    // 2. Validate input
    const validated = CreateLinkSchema.parse(data);

    // 3. Generate or use provided short code
    let shortCode = validated.shortCode;

    if (shortCode) {
      // Check if custom short code already exists
      const existingLink = await getLinkByShortCode(shortCode);
      if (existingLink) {
        return {
          error: `Short code "${shortCode}" is already taken. Please choose another.`,
        };
      }
    } else {
      // Generate a unique short code
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        shortCode = nanoid(8); // Generate 8-character code
        const existingLink = await getLinkByShortCode(shortCode);

        if (!existingLink) {
          break; // Found a unique code
        }

        attempts++;
      }

      if (attempts === maxAttempts) {
        return {
          error: "Failed to generate a unique short code. Please try again.",
        };
      }
    }

    // 4. Create the link
    const link = await createLinkForUser(userId, {
      originalUrl: validated.originalUrl,
      shortCode: shortCode!,
      title: validated.title,
    });

    // 5. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true, link };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.issues.map((issue) => issue.message).join(", "),
      };
    }

    console.error("Error creating link:", error);
    return { error: "Failed to create link. Please try again." };
  }
}

export async function updateLink(data: unknown) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized. Please sign in to update links." };
  }

  try {
    // 2. Validate input
    const validated = UpdateLinkSchema.parse(data);

    // 3. Update the link
    const link = await updateLinkForUser(validated.linkId, userId, {
      originalUrl: validated.originalUrl,
      title: validated.title,
    });

    if (!link) {
      return {
        error: "Link not found or you do not have permission to update it.",
      };
    }

    // 4. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true, link };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.issues.map((issue) => issue.message).join(", "),
      };
    }

    console.error("Error updating link:", error);
    return { error: "Failed to update link. Please try again." };
  }
}

export async function deleteLink(data: unknown) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized. Please sign in to delete links." };
  }

  try {
    // 2. Validate input
    const validated = DeleteLinkSchema.parse(data);

    // 3. Delete the link
    const deleted = await deleteLinkForUser(validated.linkId, userId);

    if (!deleted) {
      return {
        error: "Link not found or you do not have permission to delete it.",
      };
    }

    // 4. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "Validation failed",
        details: error.issues.map((issue) => issue.message).join(", "),
      };
    }

    console.error("Error deleting link:", error);
    return { error: "Failed to delete link. Please try again." };
  }
}
