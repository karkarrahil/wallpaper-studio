import { UserButton } from "@clerk/clerk-react";
import type { JSX } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";

export default function Layout(): JSX.Element {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* <!-- Navigation Header --> */}
      <Navbar />
      <main className="pt-20">
        <Hero />
      </main>
    </main>
  );
}
