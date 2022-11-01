import React, { useEffect } from "react";
import { PaymentCard, PaymentForm } from "../../components";
import { MainLayout } from "../../layout";
import { Row, Col } from "antd";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../redux/order/slice";

export const PlaceOrderPage: React.FC = (props) => {
  const jwt = useSelector((state) => state.user.token) as string;
  const order = useSelector((state) => state.order.currentOrder);
  const loading = useSelector((state) => state.order.loading);
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <PaymentCard
            loading={loading}
            order={order}
            //   onCheckout={()=>{
            //       dispatch(placeOrder({
            //           jwt: jwt,
            //           orderId: order.id
            //       }))
            //   }}
            onCheckout={() => {
              dispatch(placeOrder({ jwt: jwt, orderId: order.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};
