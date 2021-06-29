import React from "react";
import styles from "./Carousel.module.css";
import { Image, Carousel as AntC } from "antd";
import cI1 from "../../assets/images/carousel-1.webp";
import cI2 from "../../assets/images/carousel-2.webp";
import cI3 from "../../assets/images/carousel-3.webp";
import cI4 from "../../assets/images/carousel-4.webp";
import cI5 from "../../assets/images/carousel-5.webp";

export const Carousel : React.FC = () =>{
    return(
        <AntC autoplay={true} className={styles.slider}>
            <Image src={cI1}/>
            <Image src={cI2}/>
            <Image src={cI3}/>
            <Image src={cI4}/>
            <Image src={cI5}/>
        </AntC>
    )
}
