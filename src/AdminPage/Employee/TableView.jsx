import React from "react";
import EmployeeTable from "./EmployeeTable";
import { isAdmin } from "../../function/role";
import { Divider, Tabs } from "antd";

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

  const items = [
    {
      key: '1',
      label: 'Admin',
      children: renderEmployeeTable("Admin", (em) => isAdmin(em.role))
    },
    {
      key: '2',
      label: 'Employee',
      children: renderEmployeeTable("Employee", (em) => !isAdmin(em.role))
    },
  ]

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}
