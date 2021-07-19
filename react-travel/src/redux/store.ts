import { createStore, applyMiddleware} from "redux";
import {languageReducer} from "./language/languageReducer";
import {recommendReducer} from "./recommend/recommendReducer";
import { productDetailSlice} from "./productDetail/slice";
import {productSearchSlice} from "./productSearch/slice";
import {actionLog} from "./middleware/actionLog";
import thunk from "redux-thunk";
import { combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    language : languageReducer,
    recommend : recommendReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer

})
// const store = createStore(rootReducer,applyMiddleware(thunk,actionLog));
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog],
    devTools:true
})

export type RootState = ReturnType<typeof store.getState>;

export default store;