import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import sidebarReducer from "@/app/store/root/sidebarControllSlice";
import reducer from "@/app/store/location";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    loc: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
