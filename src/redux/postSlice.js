import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const getPost = createAsyncThunk('users/fetchPost', async () => {
  const posts = await axios.get('post');
  return posts.data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state, action) => {
      state.posts.items = []
      state.posts.status = 'loading'
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.posts.items = []
      state.posts.status = 'error'
    });
  },
});

export default postSlice.reducer;
