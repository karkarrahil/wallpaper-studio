import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;
console.log("🚀 ~ UNSPLASH_ACCESS_KEY:", UNSPLASH_ACCESS_KEY)

// create async thunk for fetching wallpapers from unsplash api using axios
export const fetchWallpapers = createAsyncThunk(
  "fetchWallpapers",
  async (query: string, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            client_id: UNSPLASH_ACCESS_KEY,
          },
        },
      );
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch wallpapers");
    }
  },
);

const wallpaperSlice = createSlice({
  name: "wallpaper",
  initialState: {
    wallpapers: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWallpapers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWallpapers.fulfilled, (state, action) => {
      state.loading = false;
      state.wallpapers = action.payload;
    });
    builder.addCase(fetchWallpapers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default wallpaperSlice.reducer;
export const {} = wallpaperSlice.actions;
