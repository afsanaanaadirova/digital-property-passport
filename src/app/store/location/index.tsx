import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  location:""
};

export const appealSlice = createSlice({
  name: "appeal",
  initialState,
  reducers: {
    // setAppealForm: (state, action: PayloadAction<AppealFormModel>) => {
    //   for (const key in action.payload) {
    //     if (action.payload.hasOwnProperty(key)) {
    //       state.appealForm[key as keyof AppealFormModel] =
    //         action.payload[key as keyof AppealFormModel]!;
    //     }
    //   }
    // },
    setAppealForm: (state, action: any) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setAppealForm } = appealSlice.actions;

export default appealSlice.reducer;
