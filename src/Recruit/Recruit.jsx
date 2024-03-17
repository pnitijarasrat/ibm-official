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

    const getHistory = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}applyHistory.json`)
            const data = await res.json()
            let historyArray = []
            if (data) historyArray = dataRemap(data)
            const applied = historyArray
                .filter((his) => (his.employeeId === localStorage.getItem("user")))
                .map((a) => (a.jobId))
            await getJob(applied)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    async function getJob(applied) {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}job.json`)
            const data = await res.json()
            let jobArray = []
            if (data) {
                jobArray = dataRemap(data)
            }
            setJob(jobArray.filter((job) => !applied.includes(job.key)))
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        getHistory()
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
                            ))) :
                            <div>
                                <div>
                                    No Job Available.
                                </div>
                                <br />
                                <button onClick={() => navigate(`/${localStorage.getItem("site")}`)}>Check Pending Request</button>
                            </div>
                        :
                        <div>Loading...</div>
                }
            </div>
        </>
    )
}