
import {RecommendAction,FETCH_RECOMMEND_START,FETCH_RECOMMEND_FAIL,FETCH_RECOMMEND_SUCCESS} from "./recommendActions";

export interface RecommendState{
    productList : any[] ,
    loading : boolean ,
    error : string | null
}

const defaultState: RecommendState = {
    productList : [],
    error : null,
    loading : true
}

export default (state= defaultState,action:RecommendAction):RecommendState => {
    switch(action.type){
        case FETCH_RECOMMEND_START:
            return {...state, loading:true};
        case FETCH_RECOMMEND_SUCCESS:
            return {...state, loading:false, error:null, productList:action.payload};
        case FETCH_RECOMMEND_FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}