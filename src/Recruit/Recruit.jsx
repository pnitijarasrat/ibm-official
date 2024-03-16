import React, { useState, useEffect } from "react";
import './Recruit.css'
import Job from "./Job";
import { dataRemap } from "../function/dataRemap";
import { useNavigate } from "react-router-dom";
import { url } from "../const/url";
import { useAuth } from '../Authenticate/AuthProvider'
import { isAdmin } from "../function/role";
import { Divider } from "antd";

export default function Recruit() {
    const [job, setJob] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const user = useAuth()
    const navigate = useNavigate()

    async function getJob() {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}job.json`)
            const data = await res.json()
            let jobArray = []
            if (data) {
                jobArray = dataRemap(data)
            }
            setJob(jobArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        getJob()
    }, [])

    return (
        <>
            <div className="page-container" >
                {
                    isAdmin(user.role) &&
                    <div className="admin-panel">
                        <h2>Admin</h2>
                        <div className="gap">
                            <button onClick={() => navigate('/new-recruit')}>New Recruitment</button>
                            <button onClick={() => navigate('/recruit-table')}>Recruitment Progress</button>
                        </div>
                    </div>
                }
                <h1>Currently Recruit</h1>
                <Divider />
                {
                    !isLoading ?
                        job.length !== 0 ?
                            (job.map((job) => (
                                <Job
                                    id={job.key}
                                    key={job.key}
                                    name={job.name}
                                    desc={job.desc}
                                    period={job.period}
                                    department={job.department}
                                    get={getJob}
                                    link={job.link}
                                />
                            ))) : <div>No Job Available.</div>
                        :
                        <div>Loading...</div>
                }
            </div>
        </>
    )
}