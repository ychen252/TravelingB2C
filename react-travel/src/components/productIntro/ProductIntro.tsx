import React from "react";
import styles from "./ProductIntro.module.css";
import { Typography, Carousel, Image, Rate ,Table} from "antd"
import { ColumnsType } from "antd/es/table";


interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}
interface RowType {
    title: string;
    description: string | number | JSX.Element;
    key: number;

}

const columns: ColumnsType<RowType> = [
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120,
    },
    {
        title: "description",
        dataIndex: "description",
        key: "description",
        align: "center",
    },
];

export const ProductIntro: React.FC<PropsType> = (
    {
        title,
        shortDescription,
        price,
        coupons,
        points,
        discount,
        rating,
        pictures
    }
) => {
    const tableDataSource: RowType[] = [{
        key: 0,
        title: "Routes:",
        description: title,
    },
    {
        key: 1,
        title: "Price:",
        description: (
            <>
                ${" "}
                <Typography.Text type="danger" strong>
                    {price}
                </Typography.Text>
            </>
        ),
    },
    {
        key: 2,
        title: "Book NOW:",
        description: discount ? (
            <>
                $ <Typography.Text delete>{price}</Typography.Text>{" "}
                <Typography.Text type="danger" strong>
                    $ {discount}
                </Typography.Text>
            </>
        ) : (
            "Discount not available"
        ),
    },
    {
        key: 2,
        title: "Rating:",
        description: (
            <>
                <Rate allowHalf defaultValue={+rating} />
                <Typography.Text style={{ marginLeft: 10 }}>
                    {rating} stars
                </Typography.Text>
            </>
        ),
    },
    ];


    return (
        <div className={styles["intro-container"]}>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Text> {shortDescription}</Typography.Text>
            <div className={styles["intro-detail-content"]}>
                <Typography.Text style={{ marginLeft: 20 }}>
                    from $
                    <span className={styles["intro-detail-strong-text"]}>
                        {price}
                    </span>
                </Typography.Text>
                <Typography.Text style={{ marginLeft: 50 }}>
                    Rating:{" "}
                    <span className={styles["intro-detail-strong-text"]}>
                        {rating}
                    </span>
                </Typography.Text>
            </div>
            <Carousel autoplay={true} slidesToShow={3}>
                {pictures.map(p =>
                    <Image height={150} src={p} />
                )}
            </Carousel>
            <Table<RowType> columns={columns}  dataSource={tableDataSource}
                size="small"
                bordered={false}
                pagination={false}
            />
        </div>
    )
};