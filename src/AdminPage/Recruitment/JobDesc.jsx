import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../const/url";
import { Space, Divider, Row, Col } from "antd";
import { dataRemap } from "../../function/dataRemap";

export default function JobDesc() {
    const [isLoading, setIsLoading] = useState(false)
    const [jobData, setJobData] = useState({})
    const [history, setHistory] = useState([])

    const { jobId } = useParams()

    const getJobData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}/job/${jobId}.json`)
            const data = await res.json()
            setJobData(data)
            // await getHistory(data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const getHistory = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}applyHistory.json`)
            const data = await res.json()
            let historyArray = []
            if (data) historyArray = dataRemap(data)
            console.log(historyArray)
            setHistory(historyArray.filter((his) => (his.jobId === jobId && his.status === 'approve')))
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getJobData()
        getHistory()
    }, [])

    return (
        <div className="page-container">
            <h1>Project</h1>
            {
                !isLoading ?
                    <Space direction="vertical">
                        <div>Job Title: {jobData.name}</div>
                        <div>Job Description: {jobData.desc}</div>
                        <div>
                            View JD:{" "}
                            <a>
                                <button>JD</button>
                            </a>
                        </div>
                        <div>Owner: {jobData.owner ? `${jobData.owner.id} - ${jobData.owner.name}` : ''}</div>
                    </Space>
                    :
                    <div>Loading...</div>
            }
            <Divider />
            <Space direction="vertical" style={{ width: '100%' }}>
                <h2>Project Member</h2>
                {
                    !isLoading ?
                        history.length !== 0 ?
                            history.map((his) => (
                                <Row key={his.key} gutter={16} align="middle">
                                    <Col span={12}>
                                        {his.employeeId} - {his.employeeName}
                                    </Col>
                                    <Col span={12}>
                                        <button disabled>Evaluate</button>
                                    </Col>
                                </Row>
                            ))
                            :
                            <div>No Member</div>
                        :
                        <div>Loading...</div>
                }
            </Space>
            {/* <br />
            <div className="footer">
                <button disabled>Evaluate</button>
            </div> */}
        </div>
    )
}