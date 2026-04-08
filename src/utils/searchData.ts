import { GoogleGenAI } from "@google/genai";

const HISTORY_KEY = "wallpaper_search_history";
const TRENDING_KEY = "wallpaper_search_trending";
const MAX_HISTORY_ITEMS = 10;

const safeParse = <T>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const loadSearchHistory = (): string[] => {
  if (typeof window === "undefined") return [];
  return safeParse<string[]>(window.localStorage.getItem(HISTORY_KEY), []);
};

export const saveSearchHistory = (term: string) => {
  if (typeof window === "undefined") return;
  const normalized = term.trim();
  if (!normalized) return;

  const existing = loadSearchHistory();
  const filtered = existing.filter(
    (item) => item.toLowerCase() !== normalized.toLowerCase(),
  );
  filtered.unshift(normalized);
  window.localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(filtered.slice(0, MAX_HISTORY_ITEMS)),
  );
};

export const loadTrendingTerms = (): string[] => {
  if (typeof window === "undefined") return [];
  const counts = safeParse<Record<string, number>>(
    window.localStorage.getItem(TRENDING_KEY),
    {},
  );
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([term]) => term);
};

export const saveTrendingTerm = (term: string) => {
  if (typeof window === "undefined") return;
  const normalized = term.trim();
  if (!normalized) return;

  const counts = safeParse<Record<string, number>>(
    window.localStorage.getItem(TRENDING_KEY),
    {},
  );
  counts[normalized] = (counts[normalized] || 0) + 1;
  window.localStorage.setItem(TRENDING_KEY, JSON.stringify(counts));
};

export const fetchAiSuggestions = async (query: string): Promise<string[]> => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const apiKey = import.meta.env.VITE_GEMINI_KEY;
  if (!apiKey) return [];

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Create up to 5 wallpaper search suggestions that match the user's intent. Return only a JSON array of short search phrases, without explanation or formatting. User query: "${trimmed}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType:"application/json"
      },
    });

    console.log(response.text)

    const text = response.text?.trim() ?? "";
    if (!text) return [];

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => String(item).trim())
          .filter((item) => item.length > 0)
          .slice(0, 5);
      }
    } catch {
      // fall through to string parse
    }

    return text
      .split(/[\n,•\-]+/)
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0)
      .slice(0, 5);
  } catch {
    return [];
  }
};
