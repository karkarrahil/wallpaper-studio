import React, { useEffect, useState } from "react";
import { fetchWallpapers } from "../store/reducers/wallpaperSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import Card from "./Card";

const CATEGORIES = [
  "Trending",
  "Nature",
  "Abstract",
  "Minimalist",
  "GIFs",
  "Architecture",
];

const Hero: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [photoQuery, setPhotoQuery] = useState("trending");
  const wallpapers = useSelector((state) => state.wallpaper.wallpapers);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchWallpapers({ query: photoQuery, per_page: 14 }));
  }, [photoQuery, dispatch]);

  const handleCategoryClick = (query: string) => {
    setPhotoQuery(query);
  };

  const handleMoreClick = () => {
    dispatch(
      fetchWallpapers({ query: photoQuery, per_page: wallpapers.length + 14 }),
    );
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      setPhotoQuery(searchTerm);
    } else {
      setPhotoQuery("trending");
    }
    console.log("Search Term:", searchTerm);
  }
  return (
    <div className="max-w-400 mx-auto px-6 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center mb-16 space-y-8 text-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-teal-500">
            Find your next aesthetic.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg">
            High-resolution wallpapers from Unsplash, Pexels, and curated Tenor
            GIFs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl relative">
          <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-2xl">
            search
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full bg-slate-200/50 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-5 pl-14 pr-16 text-lg outline-none transition-all placeholder:text-slate-500"
            placeholder="Search for 4K backgrounds, nature, cyberpunk..."
          />

          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all">
            <span className="material-icons-round">auto_awesome</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="px-6 cursor-pointer py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-slate-200/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-500 hover:border-primary/50 hover:text-primary"
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <Card wallpapers={wallpapers} />

      {/* Discover Button */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={handleMoreClick}
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 cursor-pointer text-primary hover:bg-primary hover:text-background-dark transition-all"
        >
          <span>Discover More</span>
          <span className="material-icons-round text-primary group-hover:translate-y-1 transition-transform">
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
