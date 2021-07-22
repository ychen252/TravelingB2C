import React from "react";
import styles from "./ShoppingCartPage.module.css";
import { MainLayout } from "../../layout";
import { Row, Col, Affix } from "antd";
import { ProductList, Payment } from "../../components";
import { useSelector } from "../../redux/hooks";
import {clearShoppingCart, checkOut} from "../../redux/shoppingCart/slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


export const ShoppingCartPage: React.FC = (props) => {
    const shoppingCartLoading = useSelector(state=>state.shoppingCart.loading);
    const shoppingCartItems = useSelector(state=>state.shoppingCart.items);
    const jwt = useSelector(state=>state.user.token) as string;
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        <ProductList 
                            data={shoppingCartItems.map(s=>s.touristRoute)}
                        />
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            <Payment 
                                loading={shoppingCartLoading}

                                originalPrice = 
                                {shoppingCartItems.map(s=>s.originalPrice).
                                reduce((a,b)=> a+b,0)}

                                price = {shoppingCartItems.map(s=>s.originalPrice
                                    * (s.discountPresent? s.discountPresent : 1)).
                                reduce((a,b)=> a+b,0)}

                                onShoppingCartClear = {
                                    ()=>{dispatch(clearShoppingCart({
                                        jwt: jwt,
                                        itemIds: shoppingCartItems.map(s=>s.id)
                                    }))}
                                }
                                onCheckout ={
                                    ()=>{
                                        if(shoppingCartItems.length>0){
                                            dispatch(checkOut(jwt));
                                            history.push("/placeOrder")
                                        }
                                    }
                                }
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}