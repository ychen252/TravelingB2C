import { createStore, combineReducers} from "redux";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommend/recommendReducer";



const rootReducer = combineReducers({
    language : languageReducer,
    recommend : recommendReducer
})
const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;