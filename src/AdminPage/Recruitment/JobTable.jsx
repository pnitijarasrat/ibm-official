import React from "react";
import { getDisplayRole } from "../../function/role";
import { getDisplayDepartment, getDisplayRegion } from "../../const/department";

export default function JobTable({
    job
}) {

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
                    <th>Action</th>
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
                                <td>Action</td>
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
