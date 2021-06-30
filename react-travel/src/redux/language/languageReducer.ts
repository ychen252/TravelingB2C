import i18n from "i18next";
import { CHANGE_LANGUAGE,LanguageActionTypes} from "./languageActions";

export interface LanguageState{
    language : "en" | "zh",
    languageList : {name:string, code:string} []
}

const defaultState : LanguageState = {
    language : "en",
    languageList : [{name:"English" , code:"en"}, {name:"简体中文", code:"zh"}]
}

export default (state : LanguageState = defaultState ,action:LanguageActionTypes)=>{
    switch(action.type){
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            const newState = {...state, language: action.payload};
            return newState;
        default:
            return state
    }
}