import { Form, Input, Select } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import { url } from "../const/url";
import React, { useState } from "react";
import MessageAPI from "../Message/Message";
import { useAuth } from "../Authenticate/AuthProvider";
import { isAdmin } from "../function/role";
import { departmentOptions } from '../const/department'
import {
    LoadingOutlined
} from '@ant-design/icons';

export default function NewRecruitment() {
    const [isAdding, setIsAdding] = useState(false)

    const [recruitmentForm] = Form.useForm()
    const navigate = useNavigate()
    const user = useAuth()

    const rule = [{ required: true, message: 'Please Enter this Field' }]
    const { success, error, contextHolder } = MessageAPI()

    if (!isAdmin(user.role)) return <Navigate to={'/'} />

    // Handle add function
    const addNewRecruitment = async (newRecruitment) => {
        setIsAdding(true)
        try {
            const res = await fetch(`${url}/job.json`, {
                method: 'POST',
                body: JSON.stringify(newRecruitment),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                success('Add')
                setTimeout(() => {
                    navigate('/recruit')
                }, 1000)
            }
        } catch (e) {
            error('Add')
        }
    }

    const handleAddNewRecruitment = () => {
        const payload = {
            ...recruitmentForm.getFieldsValue(),
            status: 'open'
        }
        addNewRecruitment(payload)
    }

    return (
        <>
            {contextHolder}
            <div className="page-container">
                <h1>New Project</h1>
                <Form
                    form={recruitmentForm}
                    labelCol={{ span: 4 }}
                    onFinish={handleAddNewRecruitment}
                >
                    <Form.Item label="Project Name" name="name" rules={rule}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Department" name="department" rules={rule}>
                        <Select options={departmentOptions} />
                    </Form.Item >
                    <Form.Item label="Period" name="period" rules={rule}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Summary Description" name="desc" rules={rule}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="JD Link" name="link" rules={rule}>
                        <Input />
                    </Form.Item>
                    <div className="footer">
                        <button>{isAdding && <LoadingOutlined />} Add New Project</button>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </div>
                </Form>
            </div>
        </>
    )
}