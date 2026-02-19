import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/customerSlice";

// สร้าง store
export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // กัน warning RN + Date/Async
    }),
});

// Type สำหรับใช้ทั้งโปรเจค (สำคัญมาก)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
