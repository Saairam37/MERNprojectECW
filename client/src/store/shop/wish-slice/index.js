import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/add",
  async ({ userId, product }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://mernprojectecw.onrender.com/api/cart/wishlist/" + userId + "/" + product,
        { userId, product }
      );
      return response.data; // adjust based on your API response
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchWishlistAsync = createAsyncThunk(
  "wishlist/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://mernprojectecw.onrender.com/api/cart/wishlist/${userId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/remove",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://mernprojectecw.onrender.com/api/wishlist/${userId}/${productId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Wishlist
      .addCase(addToWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Fetch Wishlist
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Remove from Wishlist
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
