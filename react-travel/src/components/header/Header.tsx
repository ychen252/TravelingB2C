import React from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined, MoneyCollectFilled } from "@ant-design/icons"
import logo from "../../assets/logo.jpg";
import { useHistory, useLocation, useParams, useRouteMatch, Link } from "react-router-dom";
import store, { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { changeLanguageActionCreator, LanguageActionTypes } from "../../redux/language/languageActions"
import { connect, useDispatch} from "react-redux";
import { Dispatch } from "react";
import { useSelector } from "../../redux/hooks";



// const mapStateToProps = (state: RootState) => {
//   return {
//     language: state.language,
//     languageList: state.languageList
//   }
// }

// const mapDispatchToProps = (dispatch: Dispatch<LanguageActionTypes>) => {
//   return {
//     changeLanguage: (code: "zh" | "en") => {
//       const action = changeLanguageActionCreator(code);
//       dispatch(action);
//     }
//   }
// }


export const Header: React.FC = (props) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const language = useSelector((state)=>state.language.language);
  const languageList = useSelector((state)=>state.language.languageList);
  const dispatch = useDispatch();
  const menuClickHandler = (e) => {  
    dispatch(changeLanguageActionCreator(e.key));
  }

  return (
    <div className={styles['App-header']}>
      <div className={styles['top-header']}>
        <div className={styles['top-header.inner']}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ margin: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l)=>(
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
              </Menu>
            }
            icon={<GlobalOutlined />}>
            {language === "zh" ? "简体中文" : "English"}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button> <Link to="/signIn"> {t("header.signin")} </Link></Button>
            <Button> <Link to="/register"> {t("header.register")} </Link></Button>
          </Button.Group>
        </div>
      </div>

      <Layout.Header className={styles['main-header']}>
        <img src={logo} className={styles['App-logo']} alt="Logo Here" onClick={() => goHome(history)} />
        <Typography.Title level={3} className={styles['title']} onClick={() => goHome(history)}>
          {t("header.title")}
        </Typography.Title>
        <Input.Search placeholder="Where are you going?" className={styles['search-input']} />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles['main-menu']}>
        <Menu.Item key={1} onClick={() => goHome(history)}> {t("header.home_page")} </Menu.Item>
        <Menu.Item key={2}> {t("header.weekend")}  </Menu.Item>
        <Menu.Item key={3}> {t("header.group")} </Menu.Item>
        <Menu.Item key={4}> {t("header.backpack")} </Menu.Item>
        <Menu.Item key={5}> {t("header.private")} </Menu.Item>
        <Menu.Item key={6}> {t("header.cruise")} </Menu.Item>
        <Menu.Item key={7}> {t("header.hotel")}</Menu.Item>
        <Menu.Item key={8}> {t("header.local")} </Menu.Item>
        <Menu.Item key={9}> {t("header.theme")}</Menu.Item>
        <Menu.Item key={10}> {t("header.custom")} </Menu.Item>
        <Menu.Item key={11}> {t("header.study")}</Menu.Item>
        <Menu.Item key={12}> {t("header.visa")} </Menu.Item>
        <Menu.Item key={13}> {t("header.enterprise")}</Menu.Item>
        <Menu.Item key={14}> {t("header.high_end")}</Menu.Item>
        <Menu.Item key={15}> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key={16}> {t("header.insurance")}</Menu.Item>
      </Menu>
    </div>

  )
}


function goHome(history: any) {
  history.push("/");
}

// export const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderComp);
