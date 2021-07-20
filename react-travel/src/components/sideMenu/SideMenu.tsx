import React from "react";
import styles from "./SideMenu.module.css";
import { sideMenuList } from "./mockup";
import { GifOutlined, MoneyCollectFilled } from "@ant-design/icons";
import { Menu } from "antd";

export const SideMenu: React.FC = () => {
    return(
        <Menu mode="vertical" className={styles["side-menu"]}>
            {sideMenuList.map((m, mindex) => 
                <Menu.SubMenu
                    key={`side-menu-${mindex}`}
                    title={<span> <GifOutlined /> {m.title} </span>}
                >
                    {m.subMenu.map((sm, smindex) => (
                        <Menu.SubMenu
                            key={`sub-menu-${smindex}`}
                            title={<span> <GifOutlined /> {sm.title} </span>}
                        >
                            {sm.subMenu.map((sms, smsindex) => (
                                <Menu.Item
                                    key={`sub-sub-menu-${smsindex}`}
                                >
                                    <span> <GifOutlined /> {sms} </span>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu.SubMenu>
            )}
            <div style={{margin:15, color:"red",textDecoration:"underline"}}> {"Side Menu is for DISPLAY ONLY"} </div>
        </Menu>
    )
}