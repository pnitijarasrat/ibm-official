import React, { useEffect, useState } from "react";
import { useAuth } from '../Authenticate/AuthProvider'
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../const/url";
import { Space, Divider } from "antd";
import { dataRemap } from "../function/dataRemap";
import { getDisplayRole, isAdmin } from "../function/role";

export default function Personal() {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [history, setHistory] = useState([])

    const { userId } = useParams()
    const user = useAuth()
    const navigate = useNavigate()

    const getUserData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}/account/${userId}.json`)
            const data = await res.json()
            setUserData(data)
            await getHistory(data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const getHistory = async (employee) => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}applyHistory.json`)
            const data = await res.json()
            let historyArray = []
            if (data) historyArray = dataRemap(data)
            setHistory(historyArray.filter((his) => {
                if (his.employeeId === employee.name)
                    return his
            }))
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="page-container">
            {
                isAdmin(user.role) &&
                <div className="admin-panel">
                    <h2>Admin</h2>
                    <div className="gap">
                        <button onClick={() => navigate('/admin-all-employee')}>All Employee</button>
                        <button>All Recruitment</button>
                        <button>All Announcement</button>
                    </div>
                </div>
            }
            <h2>Personal Information</h2>
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    userData ?
                        <Space direction="vertical">
                            <div>Name: {userData.firstName} {userData.lastName}</div>
                            <div>Employee ID: {userData.name}</div>
                            <div>Role: {getDisplayRole(userData.role)}</div>
                            <div>Branch: {userData.branch}</div>
                        </Space>
                        :
                        <div>No Data</div>
            }
            <Divider />
            <h2>Pending Request [{history.filter((his) => (his.status === 'pending')).length}]</h2>
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    history.filter((his) => (his.status === 'pending')).length !== 0 ?
                        <Space direction="vertical">
                            {
                                history.map((his) => (
                                    <div key={his.key}>
                                        <div>Project Name: {his.jobName}</div>
                                    </div>
                                ))
                            }
                        </Space> :
                        <div>No pending request</div>
            }
            <Divider />
            <h2>Approved Request [{history.filter((his) => (his.status === 'approve')).length}]</h2>
            {
                isLoading ?
                    <div>Loading...</div>
                    :
                    history.filter((his) => (his.status === 'approve')).length !== 0 ?
                        <Space direction="vertical">
                            {
                                history.map((his) => (
                                    <div key={his.key}>
                                        <div>Project Name: {his.jobName}</div>
                                    </div>
                                ))
                            }
                        </Space> :
                        <div>No approved project</div>
            }
            <Divider />
        </div>
    )
}