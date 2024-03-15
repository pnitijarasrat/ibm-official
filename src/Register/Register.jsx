import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import './Register.css'
import { useNavigate } from "react-router-dom";
import { url } from '../const/url'
import MessageAPI from "../Message/Message";

export default function Register() {
    const [error, setIsError] = useState(null)
    const [isRegistering, setIsRegistering] = useState(false)

    const navigate = useNavigate()
    const [registerForm] = Form.useForm()
    const { success, contextHolder } = MessageAPI()

    const roleOption = [
        { label: 'Manager', value: 'manager' },
        { label: 'Area Manager', value: 'areaManager' },
        { label: 'Assist Manager', value: 'assistManager' },
        { label: 'Operator', value: 'operator' },
    ]

    const register = async () => {
        setIsRegistering(true)
        const registerData = registerForm.getFieldsValue(true)
        const payload = {
            name: registerData.user,
            username: registerData.username,
            password: registerData.password,
            role: registerData.position,
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            branch: registerData.branch
        }
        if (registerData.password !== registerData.confirmPassword) return setIsError('Password and Confirm Password do not match.')
        try {
            const res = await fetch(`${url}account.json`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setIsRegistering(false)
            if (res.ok) {
                success("Register Successfully")
                navigate('/sign-in')
            }
        } catch (e) {
            setIsRegistering(false)
            setIsError('Cannot Register.')
        }
    }

    return (
        <>
            {contextHolder}
            <div className="register">
                <h1>Register</h1>
                {error && <div className="error-text">{error}</div>}
                <br />
                <Form labelCol={{ flex: '150px' }} form={registerForm}>
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="user" label="Student ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="branch" label="Branch Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Position" rules={[{ required: true }]}>
                        <Select options={roleOption} />
                    </Form.Item>
                </Form>
                <div className="register-action">
                    <button onClick={register}>Register</button>
                    <button onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </>
    )
}