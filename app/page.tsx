import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link, BarChart3, Shield, Zap } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black pt-32">
      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-zinc-50 mb-6">
            Shorten Links.
            <br />
            <span className="text-primary">Track Everything.</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl leading-8 text-zinc-600 dark:text-zinc-400 mb-10">
            Create short, memorable links and gain powerful insights with comprehensive analytics. 
            Perfect for marketers, developers, and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <Button size="lg" className="px-8 text-lg h-12">
                Get Started Free
              </Button>
            </SignUpButton>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-zinc-50 mb-4">
              Everything you need to manage your links
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Powerful features designed to help you create, manage, and track your shortened links with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Feature 1: URL Shortening */}
            <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Link className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Easy URL Shortening</CardTitle>
                <CardDescription className="text-base mt-2">
                  Create short, memorable links instantly. Transform long URLs into clean, shareable links.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2: Analytics */}
            <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Powerful Analytics</CardTitle>
                <CardDescription className="text-base mt-2">
                  Track clicks, referrers, and geographic data. Get insights into how your links perform.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3: Link Management */}
            <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Full Link Management</CardTitle>
                <CardDescription className="text-base mt-2">
                  Create, edit, and delete your links anytime. Complete control over all your shortened URLs.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4: Performance */}
            <Card className="border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
                <CardDescription className="text-base mt-2">
                  Instant redirects and real-time analytics. Built for speed and reliability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 md:mt-32 mb-16">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-zinc-50 mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust our platform to manage their links and track their performance.
              </p>
              <SignUpButton mode="modal">
                <Button size="lg" className="px-8 text-lg h-12">
                  Create Your Free Account
                </Button>
              </SignUpButton>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
