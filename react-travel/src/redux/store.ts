import { createStore, combineReducers, applyMiddleware} from "redux";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommend/recommendReducer";
import {actionLog} from "./middleware/actionLog"
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    language : languageReducer,
    recommend : recommendReducer
})
const store = createStore(rootReducer,applyMiddleware(thunk,actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;