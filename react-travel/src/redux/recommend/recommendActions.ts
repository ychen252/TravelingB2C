export const FETCH_RECOMMEND_START = "FETCH_RECOMMEND_START";
export const FETCH_RECOMMEND_SUCCESS = "FETCH_RECOMMEND_SUCCESS";
export const FETCH_RECOMMEND_FAIL  = "FETCH_RECOMMEND_FAIL";

interface FetchRecommendStartAction { type: typeof FETCH_RECOMMEND_START}
interface FetchRecommendSuccessAction{ type : typeof FETCH_RECOMMEND_SUCCESS, payload : any}
interface FetchRecommendFailAction{ type : typeof FETCH_RECOMMEND_FAIL, payload : any}

export type RecommendAction = FetchRecommendStartAction 
    | FetchRecommendSuccessAction 
    | FetchRecommendFailAction ;

export const fetchRecommendationStartActionCreator = () : FetchRecommendStartAction =>{
    return {type : FETCH_RECOMMEND_START}
}

export const fetchRecommendationSuccessActionCreator  = (data) : FetchRecommendSuccessAction =>(
    {type : FETCH_RECOMMEND_SUCCESS, payload:data}
) 

export const fetchRecommendationFailActionCreator = (error) : FetchRecommendFailAction=>(
    {type : FETCH_RECOMMEND_FAIL, payload : error}
)
