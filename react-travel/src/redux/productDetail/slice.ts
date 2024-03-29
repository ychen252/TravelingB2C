import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api-url";

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    // thunkAPI.dispatch(productDetailSlice.actions.fetchStart());
    // try {
    const { data } = await axios.get(
      `${API_URL}/api/touristRoutes/${touristRouteId}`
    );
    // thunkAPI.dispatch(productDetailSlice.actions.fetchSuccess(data));
    // } catch (err) {
    //     thunkAPI.dispatch(productDetailSlice.actions.fetchFail(err.message))
    // }
    return data;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return {...state, loading:true}
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      const s = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
