import React, { useEffect, useState } from "react";
import RecruitmentTableRow from "./RecruitTableRow";
import { useAuth } from "../Authenticate/AuthProvider";
import { isAdmin } from "../function/role";
import { Divider } from "antd";
import { Navigate } from "react-router-dom";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import MessageAPI from "../Message/Message";
import "./RecruitTable.css"

export default function RecruitTable() {
    const [isLoading, setIsLoading] = useState(false)
    const [history, setHistory] = useState([])

    const { success, error, contextHolder } = MessageAPI()
    const user = useAuth()

    if (!isAdmin(user.role)) return <Navigate to={'/'} />

    const getHistory = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}applyHistory.json`)
            const data = await res.json()
            let historyArray = []
            if (data) historyArray = dataRemap(data)
            setHistory(historyArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            error("Load")
        }
    }

    useEffect(() => {
        getHistory()
    }, [])

    return (
        <>
            {contextHolder}
            <div className="page-container">
                <h2>Pending Recruitment</h2>
                <Divider />
                {
                    isLoading ? <div>Loading...</div> :
                        history.filter((his) => his.status === 'pending').length !== 0 ?
                            history.filter((his) => his.status === 'pending').map((his) => (
                                <RecruitmentTableRow
                                    key={his.key}
                                    id={his.key}
                                    jobName={his.jobName}
                                    department={his.department}
                                    employeeId={his.employeeId}
                                    employeeName={his.employeeName}
                                    jobId={his.jobId}
                                    get={getHistory}
                                />

                            )) :
                            <div>No Pending</div>
                }
            </div >
        </>
    )
}