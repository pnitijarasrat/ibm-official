import React, { useState } from "react"
import { Row, Col } from "antd"
import { url } from "../const/url";
import MessageAPI from '../Message/Message'
import {
    LoadingOutlined
} from '@ant-design/icons';

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
                        <a href={link} target="_blank" rel="noreferrer">
                            <button>Apply</button>
                        </a>
                        <button onClick={deleteJob}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}
