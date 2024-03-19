import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin, isManager } from '../function/role'
import { useAuth } from '../Authenticate/AuthProvider'
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { Divider } from "antd";
import LinkRow from "./LinkRow";

export default function LinkTree() {
    const [isLoading, setIsLoading] = useState(false)
    const [adminLink, setAdminLink] = useState([])
    const [managerLink, setManagerLink] = useState([])
    const [regLink, setRegLink] = useState([])

    const navigate = useNavigate()
    const user = useAuth()

    async function getLink() {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}link.json`)
            const data = await res.json()
            let linkArray = []
            if (data) {
                linkArray = dataRemap(data)
            }
            setAdminLink(linkArray.filter((l) => (l.confidentialLevel === 'admin')))
            setManagerLink(linkArray.filter((l) => (l.confidentialLevel === 'manager')))
            setRegLink(linkArray.filter((l) => (l.confidentialLevel === 'regular')))
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        getLink()
    }, [])

    return (
        <>
            <div className="page-container">
                {
                    isAdmin(user.role) &&
                    <div className="admin-panel">
                        <h2>Admin</h2>
                        <div className="gap">
                            <button onClick={() => navigate('/new-link')}>New Link</button>
                        </div>
                    </div>
                }
                <h1>Link Tree</h1>
                <Divider />
                {
                    isAdmin(user.role) && (
                        <>
                            <div>
                                <h2>Admin</h2>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : adminLink.length !== 0 ? (
                                    adminLink.map((l) => (
                                        <LinkRow
                                            key={l.key}
                                            id={l.key}
                                            title={l.title}
                                            link={l.link}
                                        />
                                    ))
                                ) : (
                                    <div>No Link</div>
                                )}
                            </div>
                            <Divider />
                        </>
                    )
                }
                {
                    isManager(user.role) && (
                        <>
                            <div>
                                <h2>Manager</h2>
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : managerLink.length !== 0 ? (
                                    managerLink.map((l) => (
                                        <LinkRow
                                            key={l.key}
                                            id={l.key}
                                            title={l.title}
                                            link={l.link}
                                        />
                                    ))
                                ) : (
                                    <div>No Link</div>
                                )}
                            </div>
                            <Divider />
                        </>
                    )
                }

                <h2>Regular</h2>
                {
                    isLoading ?
                        <div>Loading...</div>
                        :
                        regLink.length !== 0 ?
                            regLink.map((l) => (
                                <LinkRow
                                    key={l.key}
                                    id={l.key}
                                    title={l.title}
                                    link={l.link}
                                />
                            ))
                            :
                            <div>No Link</div>
                }
            </div>
        </>
    )
}