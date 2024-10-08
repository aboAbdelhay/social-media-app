import { Post } from "@/interfaces/postinterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState: { posts: Post[]; isLoading: boolean; post: Post} = {
  post: null,
  posts: [],
  isLoading: false,
};
let headers = { token: localStorage.getItem("token") ?? " " };
export let gitPosts = createAsyncThunk("posts/gitPosts", async () => {
  let { data } = await axios.get(
    `https://linked-posts.routemisr.com/posts?limit=50`,
    {
      headers,
    }
  );
  return data.posts;
});
export let gitSinglePost = createAsyncThunk(
  "posts/gitSinglePost",
  async (postId: string) => {
    let { data } = await axios.get(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers,
      }
    );
    return data.post;
  }
);

let postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(gitPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(gitPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });

    builder.addCase(gitSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(gitSinglePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
  },
});
export let postsReducer = postsSlice.reducer;
