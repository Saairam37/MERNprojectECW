import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishlistAsync = createAsyncThunk(
    "/wishlist/add",
    async (xxx) => {
        try {
            console.log(xxx, "req in wishlist");
            const response = await axios.post(
                "https://mernprojectecw.onrender.com/api/shop/cart/wishlist/add",
                xxx,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    
                }
            );
            return await response.data;
        } catch (err) {
            console.log(err, "err in wishlist");
            if (err.response?.data?.message) {
                throw new Error(err.response.data.message);
            }
            return err.response?.data || err.message;
        }
    }
);

export const fetchWishlistAsync = createAsyncThunk(
    "wishlist/fetch",
    async (userId) => {
        try {
            const response = await axios.get(
                `https://mernprojectecw.onrender.com/api/shop/cart/wishlist/${userId}`
            );
            return response.data;
        } catch (err) {
            return err.response?.data || err.message
        }
    }
);

export const removeFromWishlistAsync = createAsyncThunk(
    "wishlist/remove",
    async (xxx) => {
        console.log(xxx, "req in removing wishlist");
        try {
            const response = await axios.delete(
                `https://mernprojectecw.onrender.com/api/shop/cart/wishlist/`,
                xxx,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    
                }
            );
            return await response.data;
        } catch (err) {
            console.log(err, "err in removing wishlist");
            if (err.response?.data?.message) {
                throw new Error(err.response.data.message);
            }
            return err.response?.data || err.message;
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
