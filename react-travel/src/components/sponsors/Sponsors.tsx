import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import styles from "./Sponsors.module.css";

import image1 from '../../assets/images/sponsor-hilton-international-2.svg';
import image2 from '../../assets/images/sponsor-mandarin-oriental.svg';
import image3 from '../../assets/images/sponsor-marriott.svg';
import image4 from '../../assets/images/sponsor-starwood-hotels-1.svg';
import image5 from '../../assets/images/sponsor-american-airlines-4.svg';
import image6 from '../../assets/images/sponsor-united-airlines-7.svg';
import image7 from '../../assets/images/sponsor-virgin-1.svg';
import image8 from '../../assets/images/sponsor-visa-5.svg';

const companies = [
    { src: image1, title: "Hilton"},
    { src: image2, title: "Mandarin Oriental"},
    { src: image3, title: "Marriott"},
    { src: image4, title: "Starwood"},
    { src: image5, title: "AA"},
    { src: image6, title: "UA"},
    { src: image7, title: "Virgin"},
    { src: image8, title: "Visa"}

]

export const Sponsors: React.FC = (props) => {
  return (
    <div className={styles.content} style={{height:"200px"}}>
      <Divider orientation="left" >
        <Typography.Title level={4} >Business Partners:</Typography.Title>
      </Divider>
      <Row>
        {companies.map((c, index) => (
          <Col span={3} key={"business-partner-" + index}>
            <img
              alt="business-partner"
              src={c.src}
              style={{
                height: "100px",
                width: "60%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};


