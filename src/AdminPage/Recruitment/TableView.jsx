import React from "react";
import JobTable from "./JobTable";
import { Divider } from "antd";

export default function TableView({
    job,
    isLoading
}) {

    const renderTable = (title, filterFn) => {
        return (
            <div>
                <h2>{title} [{job.filter(filterFn).length}]</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : job.length === 0 ? (
                    <div>No Employee</div>
                ) : (
                    <JobTable job={job.filter(filterFn)} />
                )}
            </div>
        );
    };

    return (
        <>
            {renderTable("Opening", (job) => job.status === 'open')}
            <Divider />
            {renderTable("Closed", (job) => job.status === 'close')}
        </>
    )
}