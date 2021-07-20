import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import logo from "../../assets/logo.jpg";
import { useHistory, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { changeLanguageActionCreator } from "../../redux/language/languageActions"
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import {userSlice} from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string
}

export const Header: React.FC = (props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const menuClickHandler = (e) => {
    dispatch(changeLanguageActionCreator(e.key));
  }
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt])
  function onLogOut(){
    dispatch(userSlice.actions.logOut());
    goHome();
  }
  function goHome() {
    history.push("/");
  }
  
  function search(keyword: any) {
    history.push(`/search/${keyword}`);
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
                {languageList.map((l) => (
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
              </Menu>
            }
            icon={<GlobalOutlined />}>
            {language === "zh" ? "简体中文" : "English"}
          </Dropdown.Button>

          {jwt ?
            <Button.Group className={styles['button-group']}>
              <span>{t("header.welcome")}</span>
              <Typography.Text strong style={{marginLeft:10,marginRight:10}}>
                {username}
              </Typography.Text>
              <Button><ShoppingCartOutlined />{t("header.shoppingCart")}</Button>
              <Button onClick={onLogOut}>{t("header.signOut")}</Button>
            </Button.Group>
            :
            <Button.Group className={styles['button-group']}>
              <Button> <Link to="/signIn"> {t("header.signin")} </Link></Button>
              <Button> <Link to="/register"> {t("header.register")} </Link></Button>
            </Button.Group>
          }
        </div>
      </div>

      <Layout.Header className={styles['main-header']}>
        <img src={logo} className={styles['App-logo']} alt="Logo Here" onClick={goHome} />
        <Typography.Title level={3} className={styles['title']} onClick={goHome}>
          {t("header.title")}
        </Typography.Title>
        <Input.Search placeholder="Where are you going?" className={styles['search-input']}
          onSearch={(keyword) => {
            if (keyword) search(keyword);
            else search("all")
          }
          } />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles['main-menu']}>
        <Menu.Item key={1} onClick={() => goHome()}> {t("header.home_page")} </Menu.Item>
        <Menu.Item key={2} onClick={() => search( t("header.weekend"))}> {t("header.weekend")}  </Menu.Item>
        <Menu.Item key={3} onClick={() => search(t("header.group"))}> {t("header.group")} </Menu.Item>
        <Menu.Item key={4} onClick={() => search( t("header.backpack"))}> {t("header.backpack")} </Menu.Item>
        <Menu.Item key={5} onClick={() => search( t("header.private"))}> {t("header.private")} </Menu.Item>
        <Menu.Item key={6} onClick={() => search(t("header.cruise"))}> {t("header.cruise")} </Menu.Item>
        <Menu.Item key={7} onClick={() => search( t("header.hotel"))}> {t("header.hotel")}</Menu.Item>
        <Menu.Item key={8} onClick={() => search(t("header.local"))}> {t("header.local")} </Menu.Item>
        <Menu.Item key={9} onClick={() => search(t("header.theme"))}> {t("header.theme")}</Menu.Item>
        <Menu.Item key={10} onClick={() => search(t("header.custom"))}> {t("header.custom")} </Menu.Item>
        <Menu.Item key={11} onClick={() => search(t("header.study"))}> {t("header.study")}</Menu.Item>
        <Menu.Item key={12} onClick={() => search(t("header.visa"))}> {t("header.visa")} </Menu.Item>
        <Menu.Item key={13} onClick={() => search(t("header.high_end"))}> {t("header.high_end")}</Menu.Item>
      </Menu>
    </div>

  )
}




