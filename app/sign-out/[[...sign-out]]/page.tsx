import { SignOutButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function SignOutPage() {
  // Automatically redirect after sign out
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignOutButton redirectUrl="/">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}
