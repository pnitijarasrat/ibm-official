import React, { useState } from "react"
import { Row, Col } from "antd"
import { url } from "../const/url";
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
            <div className="job-card">
                <div style={{ width: '80%' }}>
                    <Row align="middle" gutter={16}>
                        <Col span={12}>
                            <h2>
                                <span>{department}</span>
                                <span>{" - "}</span>
                                <span>{name}</span>
                            </h2>
                        </Col>
                        <Col span={24}>
                            <span>
                                {period}
                            </span>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <p className="job-desc">{desc}</p>
                        </Col>
                        <Col span={12} push={14}>
                            <a href={link} target="_blank" rel="noreferrer">
                                <button>Apply</button>
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
