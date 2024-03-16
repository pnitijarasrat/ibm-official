import React, { useState } from "react"
import { Row, Col } from "antd"
import { url } from "../const/url";
import MessageAPI from '../Message/Message'
import {
    LoadingOutlined
} from '@ant-design/icons';
import { isAdmin } from "../function/role";
import { useAuth } from "../Authenticate/AuthProvider";

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

    const user = useAuth()

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
            status: 'pending'
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
                        <span>{department}</span>
                        <span>{" - "}</span>
                        <span>{name}</span>
                    </h2>
                    <span>
                        Period:   {period}
                    </span>
                    <p className="job-desc">Description: {desc}</p>
                    <div className="gap">
                        <button onClick={apply}>Apply</button>
                        {isAdmin(user.role) &&
                            <button onClick={deleteJob}>Delete</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
