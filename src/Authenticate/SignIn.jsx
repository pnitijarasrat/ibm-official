import { Form, Input } from "antd";
import React, { useState } from "react";

import './SignIn.css'
import { useAuth } from "./AuthProvider";

export default function SignIn() {
    const [logInForm] = Form.useForm()
    const auth = useAuth()

    return (
        <div className="sign-in">
            <h1>IBM&CO</h1>
            <h2>Log In</h2>
            <Form labelCol={{ span: 8 }} form={logInForm}>
                <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Required' }]}>
                    <Input.Password />
                </Form.Item>
                <div className="sign-in-action">
                    <button onClick={() => auth.logIn(logInForm)}>Log In</button>
                    <button>Sign Up</button>
                </div>
            </Form>
        </div>
    )
}