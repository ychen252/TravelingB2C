import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkOut } from "../shoppingCart/slice";
import { API_URL } from "../../api-url";

interface OrderState {
  loading: boolean;
  error: string | null;
  currentOrder: any;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (
    parameters: {
      jwt: string;
      orderId: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(
      `${API_URL}/api/orders/${parameters.orderId}/placeOrder`,
      null,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true;
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    [placeOrder.rejected.type]: (state, action) => {
      const s = action.payload;
      state.loading = false;
      state.error = action.error;
    },
    [checkOut.pending.type]: (state) => {
      state.loading = true;
    },
    [checkOut.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    [checkOut.rejected.type]: (state, action) => {
      const s = action.payload;
      state.loading = false;
      state.error = action.error;
    },
  },
});
