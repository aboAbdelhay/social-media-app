import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/loginSlice";
import { postsReducer } from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postsReducer
  },
});
export type storeDispath = typeof store.dispatch;
export type storeState = ReturnType<typeof store.getState>;
