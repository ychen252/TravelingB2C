import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../api-url";

export const RegisterForm: React.FC = () => {
  const history = useHistory();
  const onFinish = async (values: any) => {
    try {
      await axios.post(`${API_URL}/auth/register`, {
        email: values.username,
        password: values.password,
        confirmPassword: values.password_confirmation,
      });
      history.push("./signin");
    } catch (err) {
      alert("Failed to register, try again");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div className={styles["register-form"]}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            () => ({
              validator(_, value) {
                if (value.length >= 6) {
                  return Promise.resolve();
                } else
                  return Promise.reject(
                    "Password must be longer than 6 characters"
                  );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="password_confirmation"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password confirmation!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                } else return Promise.reject("Two inputs are not matching ");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} 
                style={{marginRight:40}}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 50 }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
