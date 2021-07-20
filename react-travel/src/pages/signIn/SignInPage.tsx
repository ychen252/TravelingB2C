import React from "react";
import { UserLayout } from "../../layout";
import {SignInForm} from "./SignInForm";

export const SignInPage : React.FC = () =>{
    return(
        <UserLayout>
            <SignInForm/>
        </UserLayout>
    )
}