import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const DEFAULT_PER_PAGE = 20;

type UnsplashPhoto = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
};

type FetchWallpapersArgs = {
  query: string;
  page?: number;
  per_page?: number;
};

// create async thunk for fetching wallpapers from unsplash api using axios
export const fetchWallpapers = createAsyncThunk(
  "fetchWallpapers",
  async (
    { query, page = 1, per_page = DEFAULT_PER_PAGE }: FetchWallpapersArgs,
    thunkAPI,
  ) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            client_id: UNSPLASH_ACCESS_KEY,
            page,
            per_page,
          },
        },
      );
      return {
        query,
        page,
        results: response.data.results as UnsplashPhoto[],
        totalPages: response.data.total_pages as number,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch wallpapers");
    }
  },
);

type WallpaperState = {
  wallpapers: UnsplashPhoto[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentQuery: string;
};

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState: {
    wallpapers: [],
    loading: false,
    error: null as string | null,
    hasMore: true,
    currentQuery: "trending",
  } as WallpaperState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWallpapers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWallpapers.fulfilled, (state, action) => {
      state.loading = false;
      const { query, page, results, totalPages } = action.payload;

      if (page === 1 || query !== state.currentQuery) {
        state.wallpapers = results;
      } else if (results.length > 0) {
        const existingIds = new Set(state.wallpapers.map((item) => item.id));
        const newItems = results.filter((item) => !existingIds.has(item.id));
        state.wallpapers = [...state.wallpapers, ...newItems];
      }

      state.currentQuery = query;
      state.hasMore = page < totalPages && results.length > 0;
    });
    builder.addCase(fetchWallpapers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default wallpaperSlice.reducer;
export const {} = wallpaperSlice.actions;
