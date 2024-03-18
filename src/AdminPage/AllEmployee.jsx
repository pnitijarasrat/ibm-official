import React, { useEffect, useState } from "react";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import EmployeeTable from "./EmployeeTable";
import { isAdmin } from "../function/role";
import { Divider } from "antd";

export default function AllEmployee() {
    const [employee, setEmployee] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        try {
            const res = await fetch(`${url}account.json`);
            const data = await res.json();
            const employeeArray = data ? dataRemap(data) : [];
            setEmployee(employeeArray);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderEmployeeTable = (title, filterFn) => {
        return (
            <div>
                <h2>{title}</h2>
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
        <div className="page-container">
            <h1>All Employee</h1>
            <Divider />
            {renderEmployeeTable("Admin", (em) => isAdmin(em.role))}
            <Divider />
            {renderEmployeeTable("Employee", (em) => !isAdmin(em.role))}
        </div>
    );
}
