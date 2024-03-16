import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import MessageAPI from "../Message/Message";
import { url } from "../const/url";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Authenticate/AuthProvider";
import { departmentOptions } from "../const/department";

export default function NewAnnouncement() {
    const [isAdding, setIsAdding] = useState(false)

    const [announcementForm] = Form.useForm()
    const auth = useAuth()
    const navigate = useNavigate()
    const { success, error, contextHolder } = MessageAPI()

    if (!auth.token) return <Navigate to='/' />

    const addNewAnnouncement = async (newAnnouncement) => {
        setIsAdding(true)
        try {
            const res = await fetch(`${url}/announcement.json`, {
                method: 'POST',
                body: JSON.stringify(newAnnouncement),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                success('Add')
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        } catch (e) {
            error('Add')
        }
    }

    const handleAddNewAnnouncement = () => {
        const payload = { ...announcementForm.getFieldsValue(), announcedTime: new Date().toString() }
        addNewAnnouncement(payload)
    }

    return (
        <>
            {contextHolder}
            <div className="page-container">
                <h2>New Announcement</h2>
                <Form form={announcementForm} labelCol={{ span: 4 }} onFinish={handleAddNewAnnouncement}>
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please Enter this Field.' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="desc" label="Description" rules={[{ required: true, message: 'Please Enter this Field.' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="department" label="Department" rules={[{ required: true, message: 'Please Enter this Field.' }]}>
                        <Select options={departmentOptions} />
                    </Form.Item>
                    <Form.Item name="link" label="Link (Optional)">
                        <Input />
                    </Form.Item>
                    <div className="footer">
                        <button>Announce</button>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </div>
                </Form>
            </div>
        </>
    )
}