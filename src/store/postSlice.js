import { createSlice } from '@reduxjs/toolkit';
import appwriteService from  '../appwrite/configuration'

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setLoading, setError } = postSlice.actions;

export const fetchPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await appwriteService.getAllPosts();
    console.log(response.documents)
    dispatch(setPosts(response.documents));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default postSlice.reducer;