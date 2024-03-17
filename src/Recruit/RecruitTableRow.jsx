import React from "react";
import { Divider } from "antd";
import { url } from "../const/url";
import MessageAPI from "../Message/Message";
import { getDisplayDepartment } from "../const/department";

export default function RecruitmentTableRow(
    {
        id,
        jobName,
        department,
        employeeId,
        employeeName,
        jobId,
        get
    }
) {

    const { success, error, contextHolder } = MessageAPI()
    const approve = async () => {
        const payload = {
            jobName: jobName,
            department: department,
            employeeId: employeeId,
            employeeName: employeeName,
            jobId: jobId,
            status: 'approve'
        }
        try {
            const res = await fetch(`${url}applyHistory/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                success("Approve")
                await get()
            }
        } catch (e) {
            error("Approve")
        }
    }

    const decline = async () => {
        try {
            const res = await fetch(`${url}applyHistory/${id}.json`, {
                method: 'DELETE',
                body: JSON.stringify(id),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                success("Delete")
                await get()
            }
        } catch (e) {
            error("Delete")
        }
    }

    return (
        <>
            {contextHolder}
            <div key={id} className="recruit-card">
                <div>Job Title: {jobName}</div>
                <div>Department: {getDisplayDepartment(department)}</div>
                <div>Applicant: {employeeId} {employeeName}</div>
                <br />
                <div className="gap">
                    <button onClick={approve}>Approve</button>
                    <button onClick={decline}>Decline</button>
                </div>
                <Divider />
            </div>
        </>
    )
}