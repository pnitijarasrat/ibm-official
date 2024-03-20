import React, { useState } from "react";
import { getDisplayDepartment } from "../../const/department";
import { Popover, Space } from "antd";
import { url } from '../../const/url'
import { useNavigate } from "react-router-dom";

export default function JobTable({
    job,
    get
}) {

    const [isDeleting, setIsDeleting] = useState(false)

    const navigate = useNavigate()

    const deleteJob = async (id) => {
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

    const updateJob = async (job, newStatus) => {
        setIsDeleting(true)
        try {
            const res = await fetch(`${url}job/${job.key}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...job,
                    status: newStatus
                }),
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
        <table className="styled-table">
            <colgroup>
                <col style={{ width: '50%' }} /> {/* ID column width */}
                <col style={{ width: '20%' }} /> {/* Name column width */}
                <col style={{ width: '20%' }} /> {/* Role column width */}
                <col style={{ width: '10%' }} /> {/* Role column width */}
            </colgroup>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    job.length !== 0 ?
                        job.map((j) => (
                            <tr key={j.key}>
                                <td>{j.name}</td>
                                <td>{getDisplayDepartment(j.department)}</td>
                                <td>{j.status}</td>
                                <td>
                                    {
                                        j.status === 'pending' ?
                                            <button onClick={() => updateJob(j, "open")}>Approve</button>
                                            :
                                            <Popover content={
                                                <Space>
                                                    <button onClick={() => updateJob(j, j.status !== 'open' ? 'open' : 'close')}>
                                                        {j.status !== 'open' ? 'Open' : 'Close'}
                                                    </button>
                                                    <button onClick={() => navigate(`/recruit/${j.key}`)}>View</button>
                                                    <button onClick={() => deleteJob(j.key)}>Delete</button>
                                                </Space>}
                                                title="Action" trigger="click" >
                                                <button>Action</button>
                                            </Popover>
                                    }
                                </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td>No Data</td>
                        </tr>
                }
            </tbody>
        </table>
    );
}
