import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import type { JSX } from "react";

export default function SsoCallback(): JSX.Element {
  return <AuthenticateWithRedirectCallback signInFallbackRedirectUrl="/" />;
}
