import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

interface UserState {
    loading: boolean;
    error: string | null;
    token: string|null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null
}

export const signIn = createAsyncThunk(
    "user/signIn",
    async (parameters:{
        email: string;
        password: string;
    }, thunkAPI) => {
        const res = await axios.post(
            `http://123.56.149.216:8080/auth/login`,
            {
               email: parameters.email,
               password: parameters.password
            }
        );
        return res.data.token;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers:{
        logOut: (state)=>{
            state.error = null;
            state.token = null;
            state.loading = false;
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.error = null;
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }

})