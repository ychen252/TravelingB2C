import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Row, Col, Divider, Typography, Anchor, Menu } from "antd";
import styles from "./DetailPage.module.css";
import { Header, Footer, ProductIntro, ProductComments } from "../../components";
import { DatePicker, Space } from 'antd';
import { mockCommentsData } from "./mockComments";
import {productDetailSlice} from "../../redux/productDetail/slice";
import {useSelector} from "../../redux/hooks";
import { useDispatch } from "react-redux";


const { RangePicker } = DatePicker;
interface MatchProps {
    touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchProps>> = (props) => {
    const { touristRouteId } = useParams<MatchProps>();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [product, setProduct] = useState<any>(null);
    // const [error, setError] = useState<string | null>(null);
    const loading = useSelector((state)=>state.productDetail.loading);
    const product = useSelector((state)=>state.productDetail.data);
    const error = useSelector((state)=>state.productDetail.error);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(productDetailSlice.actions.fetchStart());
            try {
                const { data } = await axios.get(
                    `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
                );
                dispatch(productDetailSlice.actions.fetchSuccess(data));
            } catch (err) {
                dispatch(productDetailSlice.actions.fetchFail(err.message))
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return <Spin />
    }
    else if (error) {
        return <div>This API has some errors, {error}</div>
    }
    return (
        <>
            <Header />
            <div className={styles["page-content"]}>
                <div className={styles["product-intro-container"]}>
                    <Row>
                        <Col span={13}><ProductIntro
                            title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map((p) => p.url)} /></Col>
                        <Col span={11}><RangePicker open={true} style={{ marginTop: 20 }} /></Col>
                    </Row>
                </div>
                {/* ANCHORS MENU COMP HERE */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Menu mode="horizontal">
                        <Menu.Item key="1">
                            <Anchor.Link href="#feature" title="Features"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Anchor.Link href="#fees" title="Fees"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Anchor.Link href="#notes" title="Notes"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Anchor.Link href="#comments" title="User Comments"></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>
                <div id="feature" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Features
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }}
                        style={{ margin: 50 }}>
                    </div>
                </div>
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Fees
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }}
                        style={{ margin: 50 }}>
                    </div>
                </div>
                <div id="notes" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            Notes
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }}
                        style={{ margin: 50 }}>
                    </div>
                </div>
                <div id="comments" className={styles["product-detail-container"]}>
                    <Divider>
                        <Typography.Title level={3}>
                            User Comments
                        </Typography.Title>
                    </Divider>
                    <ProductComments data={mockCommentsData} />
                </div>
            </div>
            <Footer />
        </>
    )
}