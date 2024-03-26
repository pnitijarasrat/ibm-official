import React, { useState } from "react";
import { getDisplayRole } from "../../function/role";
import './EmployeeTable.css'
import { getDisplayRegion } from "../../const/department";
import { useNavigate } from "react-router-dom";
import { Popover } from 'antd'

export default function EmployeeTable({
  employee
}) {

  const navigate = useNavigate()
  const [paginator, setPaginator] = useState(0)

  const handlePaginator = (action) => {
    if (paginator === 0 && action === 'decrease') return
    if (paginator === Math.floor(employee.length / 10) && action === 'increase') return
    if (action === 'increase') return setPaginator(paginator + 1);
    if (action === 'decrease') return setPaginator(paginator - 1);
  }

  return (
    <>
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
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employee
            .slice(10 * paginator, 10 * (paginator + 1))
            .map((em) => (
              <tr key={em.key}>
                <td>{em.name}</td>
                <td>{em.firstName} {em.lastName}</td>
                <td>{getDisplayRole(em.role)}</td>
                <td>{getDisplayRegion(em.branch)}</td>
                <td>{em.branch}</td>
                <td>{em.score ? em.score : 0}</td>
                <td>
                  <Popover content={
                    <div className="gap">
                      <button onClick={() => navigate(`/${em.key}`)}>View</button>
                      <button onClick={() => navigate(`/edit/${em.key}`)}>Edit</button>
                    </div>
                  }
                    title="Action"
                  >
                    <button>Action</button>
                  </Popover>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <div className="footer">
        <button onClick={() => handlePaginator('decrease')}>Back</button>
        <span>{paginator + 1}</span>
        <button onClick={() => handlePaginator('increase')}>Next</button>
      </div>
    </>

  );
}
