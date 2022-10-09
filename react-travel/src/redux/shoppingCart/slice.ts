import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api-url";

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  "ShoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(`${API_URL}/api/shoppingCart/`, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    return data.shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  "ShoppingCart/addShoppingCartItem",
  async (
    parameters: {
      jwt: string;
      touristRouteId: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(
      `${API_URL}/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId,
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const clearShoppingCart = createAsyncThunk(
  "ShoppingCart/clearShoppingCart",
  async (
    parameters: {
      jwt: string;
      itemIds: number[];
    },
    thunkAPI
  ) =>
    await axios.delete(
      `${API_URL}/api/shoppingCart/items/(${parameters.itemIds.join(",")})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    )
);

export const checkOut = createAsyncThunk(
  "shoppingCart/checkout",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(
      `${API_URL}/api/shoppingCart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getShoppingCart.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    [addShoppingCartItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    [clearShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCart.fulfilled.type]: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [clearShoppingCart.rejected.type]: (state, action) => {
      const s = action.payload;
      state.loading = false;
      state.error = action.error;
    },

    [checkOut.pending.type]: (state) => {
      state.loading = true;
    },
    [checkOut.fulfilled.type]: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    [checkOut.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});
