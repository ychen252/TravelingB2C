import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { Footer } from "../../components";
import { Layout, Menu, Dropdown, Typography } from "antd";
import { useSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
import { useDispatch } from "react-redux";
import { GlobalOutlined } from "@ant-design/icons"

const { Header, Content } = Layout;

export const UserLayout: React.FC = (props) => {
    const { t } = useTranslation();
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const dispatch = useDispatch();
    const menuClickHandler = (e) => {
        dispatch(changeLanguageActionCreator(e.key));
    }

    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}>
                <div className={styles["lang"]}>
                    <Dropdown.Button
                        style={{ margin: 15 }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map((l) => (
                                    <Menu.Item key={l.code}>{l.name}</Menu.Item>
                                ))}
                            </Menu>
                        }
                        icon={<GlobalOutlined />}>
                        {language === "zh" ? "简体中文" : "English"}
                    </Dropdown.Button>
                </div>
            </Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <Link to="/">
                            <img alt="logo" className={styles["logo"]} src={logo} />
                            <span className={styles["title"]}>{t("header.title")}</span>
                        </Link>
                    </div>
                    <div className={styles["desc"]}>
                        <Typography.Text>{t("header.slogan")}</Typography.Text>
                    </div>
                    {props.children}
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};