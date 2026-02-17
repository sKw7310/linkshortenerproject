import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black pt-32">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center py-32 px-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50 mb-6">
          Link Shortener
        </h1>
        <p className="max-w-lg text-xl leading-8 text-zinc-600 dark:text-zinc-400 mb-10">
          Create short, memorable links and track analytics. Sign up to get started.
        </p>
        <SignUpButton mode="modal">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </SignUpButton>
      </main>
    </div>
  );
}
