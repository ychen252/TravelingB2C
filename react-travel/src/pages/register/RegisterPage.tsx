import React from "react";
import { UserLayout } from "../../layout";
import { RegisterForm } from ".";

export const RegisterPage : React.FC = () =>{
    return(
        <UserLayout>
            <strong style={{
                color:"red"}}
            >
                Password is NOT encrypted, please don't use your real-world password
            </strong>
            <RegisterForm/>
        </UserLayout>
    )
}