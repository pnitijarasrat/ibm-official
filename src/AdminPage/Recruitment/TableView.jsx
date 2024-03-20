import React from "react";
import JobTable from "./JobTable";
import { Divider, } from "antd";

export default function TableView({
    job,
    isLoading,
    get
}) {

    const renderTable = (title, filterFn) => {
        return (
            <div>
                <h2>{title} [{job.filter(filterFn).length}]</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : job.length === 0 ? (
                    <div>No Recruitment</div>
                ) : (
                    <JobTable job={job.filter(filterFn)} get={get} />
                )}
            </div>
        );
    };

    return (
        <>
            {renderTable("Pending For HR", (job) => job.status === 'pending')}
            <Divider />
            {renderTable("Opening", (job) => job.status === 'open')}
            <Divider />
            {renderTable("Closed", (job) => job.status === 'close')}
            <Divider />
            {renderTable("Archived", (job) => job.status === 'done')}
        </>
    )
}