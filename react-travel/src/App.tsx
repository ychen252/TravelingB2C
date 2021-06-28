import React from 'react';
import logo from './assets/logo.jpg';
import styles from './App.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined, MoneyCollectFilled } from "@ant-design/icons"

function App() {
  return (
    <div className={styles["App"]}>
      <div className={styles['App-header']}>
        <div className={styles['top-header']}>
          <div className={styles['top-header.inner']}>
            <Typography.Text>Makes Traveling Easier</Typography.Text>
            <Dropdown.Button
              style={{ margin: 15 }}
              overlay={
                <Menu>
                  <Menu.Item> English </Menu.Item>
                  <Menu.Item> 简体中文 </Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}>
              Language
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button>Sign in</Button>
              <Button>Register</Button>
            </Button.Group>
          </div>
        </div>

        <Layout.Header className={styles['main-header']}>
          <img src={logo} className={styles['App-logo']} alt="Logo Here" />
          <Typography.Title level={3} className={styles['title']}>
            AaronC. Traveling
          </Typography.Title>
          <Input.Search placeholder="Where are you going?" className={styles['search-input']} />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles['main-menu']}>
          <Menu.Item key={1}> Homepage </Menu.Item>
          <Menu.Item key={2}> Hotels  </Menu.Item>
          <Menu.Item key={3}> Flights </Menu.Item>
          <Menu.Item key={4}> Car Rentals </Menu.Item>
          <Menu.Item key={5}> Attractions </Menu.Item>
          <Menu.Item key={6}> Luxury Escape </Menu.Item>
          <Menu.Item key={7}> Last Minute Deal </Menu.Item>
          <Menu.Item key={7}> Gift Cards </Menu.Item>
          <Menu.Item key={7}> Contact us</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default App;
