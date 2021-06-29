import React from "react";
import { RouteComponentProps } from "react-router";

interface MatchProps{
    touristRouteId: string;
}

export const DetailPage : React.FC<RouteComponentProps<MatchProps>> = (props) =>{
    return(
        <h1> ProductID: {props.match.params.touristRouteId}</h1>

    )
}