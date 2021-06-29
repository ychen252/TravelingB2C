
export interface LanguageState{
    language : "en" | "zh",
    languageList : {name:string, code:string} []
}

const defaultState : LanguageState = {
    language : "zh",
    languageList : [{name:"English" , code:"en"}, {name:"简体中文", code:"en"}]
}

export default (state = defaultState,action)=>{
    switch(action.type){
        case "change_language":
            const newState = {...state, language: action.payload};
            return newState;
        default:
            return state
    }
}