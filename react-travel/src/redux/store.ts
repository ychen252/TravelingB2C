import { createStore, applyMiddleware} from "redux";
import {languageReducer} from "./language/languageReducer";
import {recommendReducer} from "./recommend/recommendReducer";
import { productDetailSlice } from "./productDetail/slice";
import {actionLog} from "./middleware/actionLog";
import thunk from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    language : languageReducer,
    recommend : recommendReducer,
    productDetail: productDetailSlice.reducer
})
const store = createStore(rootReducer,applyMiddleware(thunk,actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;