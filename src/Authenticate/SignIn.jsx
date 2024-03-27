import { Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import "./SignIn.css";
import { useAuth } from "./AuthProvider";

export default function SignIn() {
  const [logInForm] = Form.useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const [logIn, setLogIn] = useState({ username: "", password: "" });

  return (
    <div className="sign-in">
      <h1>IBM&CO</h1>
      <h2>Log In</h2>
      <Spin spinning={auth.isLoading}>
        <Form
          labelCol={{ span: 8 }}
          form={logInForm}
          onFinish={() => auth.logIn(logInForm)}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.Password />
          </Form.Item>
          <div className="sign-in-action">
            <button>{auth.isLogging && <LoadingOutlined />} Log In</button>
            <button onClick={() => navigate("/register")}>Sign Up</button>
          </div>
        </Form>
      </Spin>
      <br />
      <div style={{ padding: "0 32px", color: "#aaa" }}>
        If this is your first login (after register) and encounter{" "}
        <i>Incorrect Password</i>, refresh and try again :)
      </div>
    </div>
  );
}
