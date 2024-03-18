import React, { useState } from "react";
import { Form, Input, Select, Space, Divider } from "antd";
import { useAuth } from '../Authenticate/AuthProvider'
import { Navigate, useNavigate } from "react-router-dom";
import { isAdmin } from '../function/role'
import { url } from "../const/url";

export default function NewLink() {
    const [isAdding, setIsAdding] = useState(false)

    const user = useAuth()
    const navigate = useNavigate()
    const [linkForm] = Form.useForm()

    if (!isAdmin(user.role)) return <Navigate to="/" />

    const confidentialLevelOption = [
        { label: "Admin", value: "admin" },
        { label: "Regular", value: "regular" }
    ]

    const handleAddNewLink = () => {
        addNewLink(linkForm.getFieldsValue())
    }

    const addNewLink = async (newLink) => {
        setIsAdding(true)
        try {
            const res = await fetch(`${url}/link.json`, {
                method: 'POST',
                body: JSON.stringify(newLink),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                setTimeout(() => {
                    navigate('/link-tree')
                }, 1000)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="page-container">
            <h1>New Link</h1>
            <Form labelCol={{ span: 4 }} form={linkForm} onFinish={handleAddNewLink}>
                <Form.Item name={"title"} label={"Title"} rules={[{ required: true, message: 'Please Enter this Field.' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"link"} label={"Link"} rules={[{ required: true, message: 'Please Enter this Field.' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={"confidentialLevel"} label={"Confidential Level"} rules={[{ required: true, message: 'Please Enter this Field.' }]}>
                    <Select options={confidentialLevelOption} />
                </Form.Item>
                <div className="footer ">
                    <button>Add New Link</button>
                    <button>Back</button>
                </div>
            </Form>
            <Divider />
            <h1>Confidential Hierarchy</h1>
            <Space direction="vertical">
                <div>Admin : Only <i>Super Admin</i> and <i>Admin</i> can see links.</div>
                <div>Regular : <i>Everyone</i> can see links.</div>
            </Space>
        </div>
    )
}