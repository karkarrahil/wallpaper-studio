import React from 'react';

const CATEGORIES = ['Trending', 'Nature', 'Abstract', 'Minimalist', 'GIFs', 'Architecture'];

const Hero: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-10">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center mb-16 space-y-8 text-center">
        
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-400 to-teal-500">
            Find your next aesthetic.
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg">
            High-resolution wallpapers from Unsplash, Pexels, and curated Tenor GIFs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl relative">
          <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-2xl">
            search
          </span>

          <input 
            type="text" 
            className="w-full bg-slate-200/50 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-5 pl-14 pr-16 text-lg outline-none transition-all placeholder:text-slate-500"
            placeholder="Search for 4K backgrounds, nature, cyberpunk..."
          />

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all"
          >
            <span className="material-icons-round">
              auto_awesome
            </span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-slate-200/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700 text-slate-500 hover:border-primary/50 hover:text-primary"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Section (Static Demo Cards) */}
      <div className="masonry-grid">
        <div className="bg-slate-300 dark:bg-slate-800 rounded-xl h-64"></div>
        <div className="bg-slate-300 dark:bg-slate-800 rounded-xl h-80"></div>
        <div className="bg-slate-300 dark:bg-slate-800 rounded-xl h-72"></div>
        <div className="bg-slate-300 dark:bg-slate-800 rounded-xl h-96"></div>
        <div className="bg-slate-300 dark:bg-slate-800 rounded-xl h-60"></div>
        <div className="bg-slate-300 dark:bg-slate-800 rounded-xl h-88"></div>
      </div>

      {/* Discover Button */}
      <div className="mt-16 flex justify-center">
        <button className="flex items-center gap-3 px-8 py-3.5 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl font-semibold text-sm hover:border-primary/50 transition-all group shadow-sm">
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