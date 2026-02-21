import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-32">
      <SignUp signInUrl="/sign-in" afterSignUpUrl="/dashboard" />
    </div>
  );
}
