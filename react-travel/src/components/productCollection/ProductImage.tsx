import React from "react";
import {Image, Typography} from "antd";
import {withRouter, RouteComponentProps, Link} from "react-router-dom"
import { useTranslation} from "react-i18next"

interface PropsType{
    id: string | number;
    size: "large" | "small";
    imageSrc : string;
    price : number | string;
    title : string;
}

export const ProductImage : React.FC<PropsType> = ({id,size,imageSrc,price,title}) => {
    const { t } = useTranslation();
    return(
        <Link to={`detail/${id}`}>
            {size === "large" ? (
                <Image src={imageSrc} height ={285} width={490} />
            ):(
                <Image src={imageSrc} height ={120} width={240} />
            )}
            <div>
                <Typography.Text type="secondary">
                    {title.slice(0,25)}
                </Typography.Text>
                <Typography.Text type="danger" strong={true}>
                    {t("home_page.start_from")} {price}
                </Typography.Text>
            </div>
        </Link>

    )
}
