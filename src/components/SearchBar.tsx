import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchAiSuggestions,
  loadSearchHistory,
  loadTrendingTerms,
  saveSearchHistory,
  saveTrendingTerm,
} from "../utils/searchData";

type SearchBarProps = {
  value: string;
  onSearch: (query: string) => void;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onSearch,
  onChange,
}) => {
  const [history, setHistory] = useState<string[]>([]);
  const [trending, setTrending] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ✅ FIX: proper debounce type
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load initial data
  useEffect(() => {
    setHistory(loadSearchHistory());
    setTrending(loadTrendingTerms());
  }, []);

  // ✅ AI Suggestions (debounced)
  useEffect(() => {
    if (!value.trim()) {
      setAiSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoadingAi(true);
      try {
        const suggestions = await fetchAiSuggestions(value.trim());
        setAiSuggestions(suggestions);
      } catch (err) {
        console.error("AI suggestion error:", err);
      } finally {
        setLoadingAi(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  // ✅ Filtered Results
  const historyMatches = useMemo(() => {
    const term = value.trim().toLowerCase();
    return history
      .filter((item) => item.toLowerCase().includes(term))
      .slice(0, 5);
  }, [history, value]);

  const trendingMatches = useMemo(() => {
    const term = value.trim().toLowerCase();
    return trending
      .filter(
        (item) =>
          item.toLowerCase().includes(term) &&
          !historyMatches.some(
            (h) => h.toLowerCase() === item.toLowerCase()
          )
      )
      .slice(0, 5);
  }, [trending, historyMatches, value]);

  const aiMatches = useMemo(() => {
    return aiSuggestions
      .filter(
        (item) =>
          !historyMatches.some(
            (h) => h.toLowerCase() === item.toLowerCase()
          ) &&
          !trendingMatches.some(
            (t) => t.toLowerCase() === item.toLowerCase()
          )
      )
      .slice(0, 5);
  }, [aiSuggestions, historyMatches, trendingMatches]);

  // ✅ Centralized search handler
  const handleSearch = (query = value) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    saveSearchHistory(trimmed);
    saveTrendingTerm(trimmed);

    setHistory(loadSearchHistory());
    setTrending(loadTrendingTerms());

    onSearch(trimmed);
    setShowSuggestions(false);
  };

  // ✅ FIX: use handleSearch (not onSearch directly)
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="w-full max-w-3xl relative">
      {/* Icon */}
      <span className="material-icons-round absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-2xl">
        search
      </span>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(value); // ✅ use internal handler
          }
        }}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 150);
        }}
        className="w-full bg-slate-200/50 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary rounded-2xl py-5 pl-14 pr-16 text-lg outline-none transition-all placeholder:text-slate-500"
        placeholder="Search for 4K backgrounds, nature, cyberpunk..."
      />

      {/* Button */}
      <button
        onClick={() => handleSearch(value)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all"
        type="button"
      >
        <span className="material-icons-round">search</span>
      </button>

      {/* Suggestions Dropdown */}
      {showSuggestions &&
        (historyMatches.length > 0 ||
          trendingMatches.length > 0 ||
          aiMatches.length > 0 ||
          loadingAi) && (
          <div className="absolute left-0 right-0 z-20 mt-2 rounded-3xl border border-slate-200 bg-white dark:bg-slate-950 dark:border-slate-800 shadow-xl text-left overflow-hidden">
            <div className="space-y-3 p-4">
              {/* History */}
              {historyMatches.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Recent history
                  </div>
                  <div className="space-y-2">
                    {historyMatches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={() =>
                          handleSuggestionClick(item)
                        } // ✅ FIX blur issue
                        className="w-full text-left rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending */}
              {trendingMatches.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Trending now
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {trendingMatches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={() =>
                          handleSuggestionClick(item)
                        }
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-400"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading */}
              {loadingAi && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  Generating AI-powered suggestions...
                </div>
              )}

              {/* AI Suggestions */}
              {!loadingAi && aiMatches.length > 0 && (
                <div>
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    AI suggestions
                  </div>
                  <div className="space-y-2">
                    {aiMatches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={() =>
                          handleSuggestionClick(item)
                        }
                        className="w-full text-left rounded-2xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchBar;