import React from "react";
import { Form, Input, Button, Checkbox } from 'antd';
import styles from "./SignInForm.module.css"
import { signIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from "react";

export const SignInForm: React.FC = () => {

    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const jwt = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = error ? <strong style={{color:"red"}}>User Info Error! Please check your password or username</strong> 
    : <></>
    useEffect(()=>{
        if(jwt !== null){
            history.push("/");
        }
    },[jwt,error])

    const onFinish = async (values: any) => {
        dispatch(signIn({
            email: values.username,
            password: values.password
        }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className={styles["register-form"]}>
            {alert}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                    style={{marginRight:20}} loading={loading}>
                        Sign in
                    </Button>
                    Or <a href="/register">Register Now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};