# Authentication

## Overview

This application uses **Clerk** for all authentication and user management. No other authentication methods should be implemented or used.

## Core Rules

### ✅ Use Clerk Exclusively

- **ALL** authentication must go through Clerk
- Do not implement custom auth logic
- Do not use NextAuth, Passport, or any other auth libraries
- Leverage Clerk's built-in features for session management

### 🔐 Protected Routes

The `/dashboard` route is **protected** and requires authentication:

```typescript
// Use Clerk's middleware or auth helpers
import { auth } from '@clerk/nextjs/server';

// Check authentication
const { userId } = await auth();
if (!userId) {
  redirect('/sign-in');
}
```

### 🏠 Homepage Behavior

Users who are **already logged in** should be redirected to `/dashboard` when accessing the homepage:

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Show landing page for non-authenticated users
  return <LandingPage />;
}
```

### 🪟 Sign In/Sign Up Modals

Sign in and sign up flows should **always launch as modals**, not full-page routes:

```typescript
// Use Clerk's modal components
import { SignIn, SignUp } from '@clerk/nextjs';

// Modal mode
<SignIn 
  routing="modal" 
  signUpUrl="/sign-up"
/>

<SignUp 
  routing="modal" 
  signInUrl="/sign-in"
/>
```

## Implementation Patterns

### Server Components (Recommended)

```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const user = await currentUser();
  
  return <Dashboard user={user} />;
}
```

### Client Components

```typescript
'use client';

import { useUser, useAuth } from '@clerk/nextjs';

export function UserProfile() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  
  if (!isLoaded) return <Spinner />;
  if (!user) return null;
  
  return (
    <div>
      <p>{user.emailAddresses[0].emailAddress}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### Middleware Protection

Use Clerk's middleware to protect multiple routes:

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/links(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

## API Routes

Protect API routes by checking authentication:

```typescript
// app/api/links/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Process authenticated request
  // ...
}
```

## User Data

### Accessing User Information

```typescript
// Get current user
const user = await currentUser();

// Common user properties
user.id                                    // Clerk user ID
user.emailAddresses[0].emailAddress        // Primary email
user.firstName                             // First name
user.lastName                              // Last name
user.imageUrl                              // Profile image
```

### Linking Users to Database

Store Clerk's `userId` in your database to link users to their data:

```typescript
// db/schema.ts
export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  shortCode: text('short_code').notNull().unique(),
  destinationUrl: text('destination_url').notNull(),
  // ... other fields
});
```

## Best Practices

1. **Always validate authentication** on both client and server
2. **Use Server Components** for initial auth checks when possible
3. **Protect API routes** with auth checks at the handler level
4. **Never expose Clerk secret keys** in client-side code
5. **Use Clerk's built-in components** for sign in/sign up UI
6. **Handle loading states** gracefully while Clerk initializes

## Security Checklist

- [ ] All protected routes check for `userId`
- [ ] API routes validate authentication
- [ ] Homepage redirects authenticated users
- [ ] Sign in/up flows use modal mode
- [ ] No custom auth logic implemented
- [ ] Clerk middleware configured correctly
- [ ] User data linked via Clerk's `userId`

---

For more information, refer to [Clerk's Next.js documentation](https://clerk.com/docs/quickstarts/nextjs).
