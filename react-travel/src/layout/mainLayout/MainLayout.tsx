import styles from "./MainLayout.module.css";
import React from "react";
import { Header,Footer } from "../../components";

export const MainLayout:React.FC = ({children}) =>{
    return(
        <>
        <Header/>
        <div className={styles["page-content"]}>{children}</div>
        <Footer/>
        </>
    )
}