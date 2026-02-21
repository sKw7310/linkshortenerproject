import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-32">
      <SignIn signUpUrl="/sign-up" afterSignInUrl="/dashboard" />
    </div>
  );
}
