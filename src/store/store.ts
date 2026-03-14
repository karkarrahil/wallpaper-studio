import { configureStore } from "@reduxjs/toolkit";
import wallpaperReducer from "./reducers/wallpaperSlice";



export const store = configureStore({
    reducer:{
        wallpaper:wallpaperReducer
    }
})



export type AppDispatch = typeof store.dispatch;