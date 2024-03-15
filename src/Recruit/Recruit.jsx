import React, { useState, useEffect } from "react";
import './Recruit.css'
import Job from "./Job";
import { dataRemap } from "../function/dataRemap";
import { url } from "../const/url";

export default function Recruit() {
    const [job, setJob] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getJob() {
            const res = await fetch(`${url}job.json`)
            const data = await res.json()
            const jobArray = dataRemap(data)
            console.log(jobArray)
            setJob(jobArray)
            setIsLoading(false)
        }
        getJob()

    }, [])

    return (
        <div className="page-container" >
            <h1>Currently Recruit</h1>
            {
                !isLoading !== 0 &&
                job.map((job) => (
                    <Job
                        key={job.key}
                        name={job.name}
                        desc={job.desc}
                        period={job.period}
                        department={job.department}
                    />
                ))
            }
        </div>
    )
}