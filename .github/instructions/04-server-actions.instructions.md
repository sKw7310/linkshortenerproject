---
description: Read this before implementing or modifying any server actions or data mutations in this project.
---

# Server Actions

## Overview

All data mutations in this application **MUST** be performed using Next.js Server Actions. This ensures proper security, validation, and server-side execution.

## Core Rules

### ✅ Server Actions for All Mutations

- **ALL** data mutations (create, update, delete) must use Server Actions
- Never perform data mutations directly in Server Components
- Never expose database queries directly to the client

### 📁 File Naming and Colocation

Server action files **MUST** be named `actions.ts` and colocated with the components that use them:

```
app/
  dashboard/
    page.tsx          # Client Component that calls actions
    actions.ts        # Server Actions for dashboard
  links/
    [id]/
      edit/
        page.tsx      # Client Component
        actions.ts    # Server Actions for editing links
```

**Location Rule**: Place `actions.ts` in the **same directory** as the component that calls it.

### 🔄 Client Components Required

Server Actions **MUST** be called from Client Components (not Server Components):

```typescript
// app/dashboard/page.tsx
'use client';

import { createLink } from './actions';

export default function DashboardPage() {
  const handleSubmit = async (data: LinkFormData) => {
    const result = await createLink(data);
    // Handle result
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 🏷️ TypeScript Typing

All data passed to server actions **MUST** have appropriate TypeScript types:

```typescript
// ✅ CORRECT - Explicit types
interface CreateLinkData {
  url: string;
  slug?: string;
  title?: string;
}

export async function createLink(data: CreateLinkData) {
  // ...
}

// ❌ WRONG - Do not use FormData type
export async function createLink(formData: FormData) {
  // ...
}
```

### ✔️ Zod Validation

All input data **MUST** be validated using Zod schemas:

```typescript
// app/dashboard/actions.ts
"use server";

import { z } from "zod";

const CreateLinkSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  slug: z.string().min(3).max(50).optional(),
  title: z.string().max(200).optional(),
});

export async function createLink(data: unknown) {
  try {
    // Validate input
    const validated = CreateLinkSchema.parse(data);

    // Continue with validated data
    // ...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "An unexpected error occurred" };
  }
}
```

### 🚫 Error Handling - No Throwing Errors

Server actions **MUST NOT** throw errors. Instead, they should **ALWAYS** return an object with either an `error` or `success` property:

```typescript
// ❌ WRONG - Throwing errors
export async function createLink(data: unknown) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized"); // DON'T DO THIS
  }

  const validated = CreateLinkSchema.parse(data); // This throws
  return await createLinkForUser(userId, validated);
}

// ✅ CORRECT - Return error objects
export async function createLink(data: unknown) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" }; // Return error object
  }

  try {
    const validated = CreateLinkSchema.parse(data);
    const link = await createLinkForUser(userId, validated);
    return { success: true, link }; // Return success object
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "Failed to create link" };
  }
}
```

**Why?** Returning error objects allows client components to handle errors gracefully without needing try-catch blocks and provides a consistent API.

### 🔐 Authentication Check

All server actions **MUST** check for an authenticated user **BEFORE** any database operations:

```typescript
// app/dashboard/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export async function createLink(data: unknown) {
  // 1. Check authentication FIRST
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" }; // Return error object, don't throw
  }

  try {
    // 2. Validate input
    const validated = CreateLinkSchema.parse(data);

    // 3. Perform database operation
    // ...

    return { success: true }; // Return success object
  } catch (error) {
    return { error: "Operation failed" };
  }
}
```

### 🗄️ Database Operations via Helper Functions

Server actions **MUST NOT** contain direct Drizzle queries. Instead, use helper functions from the `/data` directory:

```typescript
// ❌ WRONG - Direct Drizzle query in server action
export async function createLink(data: unknown) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const validated = CreateLinkSchema.parse(data);

    // Don't do this - direct database query
    const result = await db
      .insert(links)
      .values({
        ...validated,
        userId,
      })
      .returning();

    return { success: true, link: result[0] };
  } catch (error) {
    return { error: "Failed to create link" };
  }
}

// ✅ CORRECT - Use helper function from /data
import { createLinkForUser } from "@/data/links";

export async function createLink(data: unknown) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" }; // Return error object
  }

  try {
    const validated = CreateLinkSchema.parse(data);
    const link = await createLinkForUser(userId, validated);
    return { success: true, link }; // Return success object
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "Failed to create link" };
  }
}
```

### 📂 Data Layer Helper Functions

Create helper functions in `/data` directory that wrap Drizzle queries:

```typescript
// data/links.ts
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createLinkForUser(
  userId: string,
  data: {
    url: string;
    slug?: string;
    title?: string;
  },
) {
  const result = await db
    .insert(links)
    .values({
      ...data,
      userId,
      createdAt: new Date(),
    })
    .returning();

  return result[0];
}

export async function getLinksByUserId(userId: string) {
  return await db.select().from(links).where(eq(links.userId, userId));
}
```

## Complete Example

Here's a complete example following all the rules:

```typescript
// app/dashboard/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createLinkForUser,
  updateLinkForUser,
  deleteLinkForUser,
} from "@/data/links";
import { revalidatePath } from "next/cache";

const CreateLinkSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  slug: z.string().min(3).max(50).optional(),
  title: z.string().max(200).optional(),
});

export async function createLink(data: unknown) {
  // 1. Check authentication
  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    // 2. Validate input
    const validated = CreateLinkSchema.parse(data);

    // 3. Call helper function
    const link = await createLinkForUser(userId, validated);

    // 4. Revalidate if needed
    revalidatePath("/dashboard");

    return { success: true, link };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "Failed to create link" };
  }
}
```

```typescript
// app/dashboard/page.tsx
'use client';

import { createLink } from './actions';
import { useState } from 'react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      url: formData.get('url') as string,
      slug: formData.get('slug') as string,
      title: formData.get('title') as string,
    };

    const result = await createLink(data);

    if (result.error) {
      // Handle error
      alert(result.error);
    } else {
      // Handle success
      alert('Link created!');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

## Key Takeaways

1. ✅ **Server Actions only** for data mutations
2. ✅ **Name files** `actions.ts` and **colocate** with components
3. ✅ **Call from Client Components** with `'use client'`
4. ✅ **TypeScript types** for all data (not FormData)
5. ✅ **Zod validation** for all inputs
6. ✅ **Auth check first** before database operations
7. ✅ **Helper functions** in `/data` directory for database queries
8. ❌ **No direct Drizzle queries** in server actions
9. ❌ **No throwing errors** - always return `{ error }` or `{ success }` objects
