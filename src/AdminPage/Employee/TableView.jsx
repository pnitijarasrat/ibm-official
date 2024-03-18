import React from "react";
import EmployeeTable from "./EmployeeTable";
import { isAdmin } from "../../function/role";
import { Divider } from "antd";

export default function TableView({
    employee,
    isLoading
}) {

    const renderEmployeeTable = (title, filterFn) => {
        return (
            <div>
                <h2>{title} [{employee.filter(filterFn).length}]</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : employee.length === 0 ? (
                    <div>No Employee</div>
                ) : (
                    <EmployeeTable employee={employee.filter(filterFn)} />
                )}
            </div>
        );
    };

    return (
        <>
            {renderEmployeeTable("Admin", (em) => isAdmin(em.role))}
            <Divider />
            {renderEmployeeTable("Employee", (em) => !isAdmin(em.role))}
        </>
    )
}