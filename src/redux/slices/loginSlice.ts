import { LoginData } from "@/interfaces/login";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  error: "",
  isSuccess: false,
};
export const login = createAsyncThunk(
  "auth/login",
  async (values: LoginData) => {
    try {
      const { data } = await axios.post(
        `https://linked-posts.routemisr.com/users/signin`,
        values
      );
      return data;
    } catch (err: any) {
      return err.response.data.error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
      } else {
        state.error = action.payload;
      }
    });
  },
});
export const authReducer = authSlice.reducer;
