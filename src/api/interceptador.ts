import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  trigger: boolean;
  msg: string;
  status: string;
}

const initialState: ToastState = {
  trigger: false,
  msg: "",
  status: "success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    executar: (state, action: PayloadAction<Partial<ToastState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (key in state) {
          (state as any)[key] = value;
        }
      });
    },
  },
});

export const { executar } = toastSlice.actions;

export default toastSlice.reducer;
