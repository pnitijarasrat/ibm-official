import React, { useEffect, useState } from "react";
import { url } from "../../const/url";
import { dataRemap } from "../../function/dataRemap";
import EmployeeTable from "./EmployeeTable";
import { isAdmin } from "../../function/role";
import { Tabs } from "antd";
import TableView from "./TableView";
import Overview from "./Overview";

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

    return (
        <div className="page-container">
            <h1>Employee</h1>
            {isLoading ?
                <div>Loading...</div>
                :
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 'Overview',
                            key: '1',
                            children: <Overview employee={employee} isLoading={isLoading} />,
                        },
                        {
                            label: 'Table View',
                            key: '2',
                            children: <TableView employee={employee} isLoading={isLoading} />
                        },

                    ]}
                />
            }
        </div>
    );
}
