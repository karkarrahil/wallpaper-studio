import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Welcome to Wallpaper Studio</h1>
        <p className="mt-2 text-sm text-slate-600">
          Discover and organize wallpapers from your dashboard.
        </p>
      </div>
    </div>
  );
}
