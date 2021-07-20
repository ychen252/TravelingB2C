import React from "react";
import { Header, Footer, SideMenu, Carousel, ProductCollection, Sponsors } from "../../components";
import { Row, Col, Typography, Spin } from "antd";
import styles from "./HomePage.module.css";
import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { getDataActionCreator } from "../../redux/recommend/recommendActions"
import { MainLayout } from "../../layout";
// import { ThunkDispatch } from "redux-thunk";

interface State {
	loading: boolean,
	error: string | null,
	productList: any[]
}

const mapStateToProps = (state: RootState) => {
	return {
		loading: state.recommend.loading,
		error: state.recommend.error,
		productList: state.recommend.productList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getData: () => {
			dispatch(getDataActionCreator());
		}
	};
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatchToProps>;

class HomePageComp extends React.Component<PropsType> {
	componentDidMount() {
		this.props.getData();
	}
	render() {
		const t = this.props.t;
		const { loading, error, productList } = this.props;
		if (loading) {
			return <Spin />
		}
		else if (error) {
			return <div>This API has some errors, {error}</div>
		}
		else {
			return (
				<MainLayout>
					<div className={styles["page-content"]}>
						<Row style={{ marginTop: 20 }}>
							<Col span={6}>
								<SideMenu />
							</Col>
							<Col span={18}>
								<Carousel />
							</Col>
						</Row>
						<ProductCollection
							title={
								<Typography.Title level={3} type="warning">
									{t("home_page.hot_recommended")}
								</Typography.Title>}
							sideImage={sideImage1}
							products={productList[0].touristRoutes}
						/>
						<ProductCollection
							title={
								<Typography.Title level={3} type="warning">
									{t("home_page.new_arrival")}
								</Typography.Title>}
							sideImage={sideImage2}
							products={productList[1].touristRoutes}
						/>
						<ProductCollection
							title={
								<Typography.Title level={3} type="success">
									{t("home_page.domestic_travel")}
								</Typography.Title>
							}
							sideImage={sideImage3}
							products={productList[2].touristRoutes}
						/>
					</div>
					<Sponsors />
				</MainLayout>
			)
		}
	}
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComp));