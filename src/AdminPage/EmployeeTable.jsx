import React from "react";
import { getDisplayRole } from "../function/role";
import './EmployeeTable.css'
import { getDisplayRegion } from "../const/department";

export default function EmployeeTable({
    employee
}) {

    return (
        <table className="styled-table">
            <colgroup>
                <col style={{ width: '15%' }} /> {/* ID column width */}
                <col style={{ width: '35%' }} /> {/* Name column width */}
                <col style={{ width: '15%' }} /> {/* Role column width */}
                <col style={{ width: '20%' }} /> {/* Region column width */}
                <col style={{ width: '15%' }} /> {/* Branch Number column width */}
            </colgroup>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Region</th>
                    <th className="centered">Branch Number</th>
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
