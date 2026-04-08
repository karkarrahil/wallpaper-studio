import { configureStore } from "@reduxjs/toolkit";
import wallpaperReducer from "./reducers/wallpaperSlice";



export const store = configureStore({
    reducer:{
        wallpaper:wallpaperReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;