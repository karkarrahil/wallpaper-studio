import { SignIn } from "@clerk/clerk-react";
import type { JSX } from "react";

export default function Signin(): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" forceRedirectUrl="/" />
    </div>
  );
}
