import React, { useEffect, useState } from "react";
import { Form, Input, Select, Spin } from "antd";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";
import { url } from "../const/url";
import MessageAPI from "../Message/Message";
import { dataRemap } from "../function/dataRemap";

export default function Register() {
  const [error, setIsError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState([]);

  const navigate = useNavigate();
  const [registerForm] = Form.useForm();
  const { success, contextHolder } = MessageAPI();

  const roleOption = [
    { label: "Area Manager", value: "areaManager" },
    { label: "Area Assist Manager", value: "areaAssistManager" },
    { label: "Manager", value: "manager" },
    { label: "Assist Manager", value: "assistManager" },
    { label: "Operator", value: "operator" },
  ];

  const getAccount = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}account.json`);
      const data = await res.json();
      const accountArray = dataRemap(data);
      setAccount(accountArray.map((data) => data.username));
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const register = async () => {
    setIsRegistering(true);
    const registerData = registerForm.getFieldsValue(true);
    const payload = {
      name: registerData.user,
      username: registerData.username,
      password: registerData.password,
      role: registerData.position,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      branch: registerData.branch,
      score: 0,
      project: [],
    };
    if (account.includes(registerData.username))
      return setIsError("This username is taken.");
    if (registerData.password !== registerData.confirmPassword)
      return setIsError("Password and Confirm Password do not match.");
    try {
      const res = await fetch(`${url}account.json`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsRegistering(false);
      if (res.ok) {
        success("Register Successfully");
        navigate("/sign-in");
      }
    } catch (e) {
      setIsRegistering(false);
      setIsError("Cannot Register.");
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="register">
        <h1>Register</h1>
        <Spin spinning={isLoading}>
          {error && <div className="error-text">{error}</div>}
          <br />
          <Form form={registerForm} onFinish={register} layout="vertical">
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
              <Input />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user"
              label="Student ID"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="branch"
              label="Branch Number"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select options={roleOption} />
            </Form.Item>
            <div className="register-action">
              <button>Register</button>
              <button onClick={() => navigate(-1)}>Back</button>
            </div>
          </Form>
        </Spin>
      </div>
    </>
  );
}
