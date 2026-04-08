import React, { useEffect, useState } from "react";
import { fetchWallpapers } from "../store/reducers/wallpaperSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import Card from "./Card";
import SearchBar from "./SearchBar";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // ✅ pagination added

  const wallpapers = useSelector(
    (state: RootState) => state.wallpaper.wallpapers
  );
  const loading = useSelector(
    (state: RootState) => state.wallpaper.loading
  );

  // ✅ Fetch wallpapers when query or page changes
  useEffect(() => {
    dispatch(
      fetchWallpapers({
        query: photoQuery,
        per_page: wallpapers.length + 14,
        page: page, // ✅ proper pagination
      })
    );
  }, [photoQuery, page, dispatch]);

  // ✅ Handle typing in search bar
  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  // ✅ Handle category click
  const handleCategoryClick = (query: string) => {
    const normalized = query.toLowerCase();
    setSearchTerm(query);
    setPhotoQuery(normalized);
    setPage(1); // ✅ reset pagination
  };

  // ✅ Load more (pagination)
  const handleMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  // ✅ Handle search submit
  const handleSearch = (query: string) => {
    const searchValue = query.trim().toLowerCase() || "trending";
    setSearchTerm(searchValue);
    setPhotoQuery(searchValue);
    setPage(1); // ✅ reset pagination
  };

  return (
    <div className="max-w-400 mx-auto px-6 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center mb-16 space-y-8 text-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary via-emerald-400 to-teal-500">
            Find your next aesthetic.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg">
            High-resolution wallpapers from Unsplash, Pexels, and curated Tenor
            GIFs.
          </p>
        </div>

        {/* ✅ Search Bar */}
        <SearchBar
          value={searchTerm}
          onSearch={handleSearch}
          onChange={handleSearchTermChange}
        />

        {/* ✅ Categories */}
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

      {/* ✅ Wallpapers */}
      <Card wallpapers={wallpapers} loading={loading} />

      {/* ✅ Discover More */}
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