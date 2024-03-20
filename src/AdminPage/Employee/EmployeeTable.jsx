import React from "react";
import { getDisplayRole } from "../../function/role";
import './EmployeeTable.css'
import { getDisplayRegion } from "../../const/department";
import { useNavigate } from "react-router-dom";

export default function EmployeeTable({
    employee
}) {

    const navigate = useNavigate()

    return (
        <table className="styled-table">
            <colgroup>
                <col style={{ width: '15%' }} /> {/* ID column width */}
                <col style={{ width: '35%' }} /> {/* Name column width */}
                <col style={{ width: '15%' }} /> {/* Role column width */}
                <col style={{ width: '10%' }} /> {/* Region column width */}
                <col style={{ width: '15%' }} /> {/* Branch Number column width */}
                <col style={{ width: '15%' }} /> {/* Branch Number column width */}
            </colgroup>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Region</th>
                    <th className="centered">Branch Number</th>
                    <th>Project Count</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {employee.map((em) => (
                    <tr key={em.key}>
                        <td>{em.name}</td>
                        <td>{em.firstName} {em.lastName}</td>
                        <td>{getDisplayRole(em.role)}</td>
                        <td>{getDisplayRegion(em.branch)}</td>
                        <td>{em.branch}</td>
                        <td>{em.project ? em.project.length : 0}</td>
                        <td>
                            <button onClick={() => navigate(`/${em.key}`)}>View</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
