import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSidebarSlice = {
  isOpenDesktop: boolean;
  isOpenMobile: boolean;
};

const initialState: TSidebarSlice = {
  isOpenDesktop: false,
  isOpenMobile: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setOpenSidebar: (state: TSidebarSlice, action: PayloadAction<string>) => {
      if (action.payload === "desktop") {
        state.isOpenDesktop = !state.isOpenDesktop;
        state.isOpenMobile = false;
      } else if (action.payload === "mobile") {
        state.isOpenMobile = !state.isOpenMobile;
        state.isOpenDesktop = false;
      }
    },
  },
});

export const { setOpenSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
