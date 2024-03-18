import React, { useState } from "react"
import { Row, Col, Form, Input } from "antd"
import { url } from "../const/url";
import MessageAPI from '../Message/Message'
import {
    LoadingOutlined
} from '@ant-design/icons';
import { isAdmin } from "../function/role";
import { useAuth } from "../Authenticate/AuthProvider";
import { getDisplayDepartment } from "../const/department";

export default function Job({
    id,
    name,
    desc,
    department,
    period,
    link,
    get
}) {

    const [isDeleting, setIsDeleting] = useState(false)
    const [isApplying, setIsApplying] = useState(false)
    const [isWriting, setIsWriting] = useState(false)

    const user = useAuth()
    const [cvForm] = Form.useForm()

    const { success, error, contextHolder } = MessageAPI()

    const deleteJob = async () => {
        setIsDeleting(true)
        try {
            const res = await fetch(`${url}job/${id}.json`, {
                method: 'DELETE',
                body: JSON.stringify(id),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                setIsDeleting(false)
            }
            await get()
        } catch (e) {
            console.log(e)
        }
    }

    const apply = async () => {
        setIsApplying(true)
        const payload = {
            jobId: id,
            jobName: name,
            department: department,
            employeeName: localStorage.getItem("fullName"),
            employeeId: localStorage.getItem("user"),
            status: 'pending',
            cv: cvForm.getFieldValue('cv')
        }
        try {
            const res = await fetch(`${url}applyHistory.json`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                setIsApplying(false)
                success("Apply")
                await get()
            }
        } catch (e) {
            error("Apply")
        }
    }

    return (
        <>
            {contextHolder}
            <div className="job-card">
                <div style={{ width: '80%' }}>
                    <h2>
                        <span>{getDisplayDepartment(department)}</span>
                        <span>{" - "}</span>
                        <span>{name}</span>
                    </h2>
                    <span>
                        Period:   {period}
                    </span>
                    <p className="job-desc">Description: {desc}</p>
                    <div className="gap">
                        <a href={link} target="_blank" rel="noreferrer">
                            <button>JD</button>
                        </a>
                        <button onClick={() => setIsWriting(true)}>Apply</button>
                        {isAdmin(user.role) &&
                            <button onClick={deleteJob}>Delete</button>
                        }
                    </div>
                    <br />
                    {
                        isWriting &&
                        <Form layout="vertical" form={cvForm}>
                            <Form.Item label="Tell me about yourself. (50 letters)" name="cv" rules={[{ required: true }]}>
                                <Input.TextArea count={{ show: true, max: 50 }} />
                            </Form.Item>
                            <div className="footer">
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    apply()
                                }}>Apply</button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    setIsWriting(false)
                                }}>Cancel</button>
                            </div>
                        </Form>
                    }
                </div>
            </div>
        </>
    )
}
