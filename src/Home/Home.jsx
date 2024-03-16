import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Authenticate/AuthProvider'
import { isAdmin } from '../function/role'
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { Divider } from "antd";
import {
    LoadingOutlined
} from '@ant-design/icons';
import './Home.css'

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [announcement, setAnnouncement] = useState([])

    const user = useAuth()
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        setIsDeleting(true)
        try {
            const res = await fetch(`${url}announcement/${id}.json`, {
                method: 'DELETE',
                body: JSON.stringify(id),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                setIsDeleting(false)
            }
            await getAnnouncement()
        } catch (e) {
            console.log(e)
        }
    }

    const getAnnouncement = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}announcement.json`)
            const data = await res.json()
            let announcementArray = []
            if (data) {
                announcementArray = dataRemap(data)
            }
            setAnnouncement(announcementArray)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAnnouncement()
    }, [])

    return (
        <div className="page-container">
            {
                isAdmin(user.role) &&
                <div className="admin-panel">
                    <h2>Admin</h2>
                    <div className="gap">
                        <button onClick={() => navigate('/new-announcement')}>New Announcement</button>
                    </div>
                </div>
            }
            <h1>Announcement</h1>
            <Divider />
            {
                isLoading ? <div>Loading...</div> : (
                    announcement.length !== 0 ?
                        announcement.map((a) => (
                            <div key={a.key}>
                                <h2>{a.department.toUpperCase()} - {a.title}</h2>
                                <p>Description: {a.desc}</p>
                                {a.link &&
                                    <a href={a.link} target="_blank" rel="noreferrer">
                                        <button>Click</button>
                                    </a>}
                                <p>Announce Time: {a.announcedTime}</p>
                                {isAdmin(user.role) && <button onClick={() => handleDelete(a.key)}>{isDeleting && <LoadingOutlined />} Delete</button>}
                                <Divider />
                            </div>
                        ))
                        :
                        <div>No Announcement</div>
                )
            }
        </div>
    )
}