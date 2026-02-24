import { useAuth } from "@clerk/clerk-react";
import type { JSX } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SsoCallback from "./pages/SsoCallback";

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

function RedirectIfAuthenticated({ children }: { children: JSX.Element }): JSX.Element {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export const browserRouter = createBrowserRouter([
  {
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <RedirectIfAuthenticated>
        <Signin />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <RedirectIfAuthenticated>
        <Signup />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/sso-callback",
    element: <SsoCallback />,
  },
]);
