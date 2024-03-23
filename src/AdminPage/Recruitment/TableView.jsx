import React from "react";
import JobTable from "./JobTable";
import { Divider, } from "antd";

export default function TableView({
  job,
  isLoading,
  get,
  history
}) {

  const renderTable = (title, filterFn, history) => {
    return (
      <div>
        <h2>{title} [{job.filter(filterFn).length}]</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : job.length === 0 ? (
          <div>No Recruitment</div>
        ) : (
          <JobTable job={job.filter(filterFn)} get={get} history={history.filter((his) => (his.status === 'approve'))} />
        )}
      </div>
    );
  };


  return (
    <>
      {renderTable("Pending For HR", (job) => job.status === 'pending', history)}
      <Divider />
      {renderTable("Opening", (job) => job.status === 'open', history)}
      <Divider />
      {renderTable("Closed", (job) => job.status === 'close', history)}
      <Divider />
      {renderTable("Archived", (job) => job.status === 'done', history)}
    </>
  )
}
