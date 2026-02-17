import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return (
    <div className="pt-32">
      <main className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}
