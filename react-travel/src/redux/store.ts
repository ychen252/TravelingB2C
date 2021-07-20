import { createStore, applyMiddleware} from "redux";
import {languageReducer} from "./language/languageReducer";
import {recommendReducer} from "./recommend/recommendReducer";
import { productDetailSlice} from "./productDetail/slice";
import {productSearchSlice} from "./productSearch/slice";
import {userSlice} from "./user/slice"
import {actionLog} from "./middleware/actionLog";
import thunk from "redux-thunk";
import { combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"


const persistConfig = {
    key: "root",
    storage: storage,
    whiteList: ["user"]
}

const rootReducer = combineReducers({
    language : languageReducer,
    recommend : recommendReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
// const store = createStore(rootReducer,applyMiddleware(thunk,actionLog));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog],
    devTools:true
})

const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export default {store, persistedStore};