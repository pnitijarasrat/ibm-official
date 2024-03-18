import React from "react";
import { Space, Card, Statistic, Row, Col } from "antd";
import { isAdmin } from "../../function/role";
import { getDisplayDepartment } from "../../const/department";

export default function Overview({ job }) {

    const renderStatistic = (title, filterFn) => {
        return (
            <Col span={4}>
                <Statistic title={title} value={job.filter(filterFn).length} />
            </Col>
        );
    };

    return (
        <div>
            <h2>Total Recruitment</h2>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total" value={job.length} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Opening" value={job.filter((job) => job.status === 'open').length} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Closed" value={job.filter((job) => job.status === 'close').length} />
                    </Card>
                </Col>
            </Row>
            <br />
            <h2>By Department</h2>
            <Card>
                <Row gutter={16}>
                    {renderStatistic("Marketing", (job) => (getDisplayDepartment(job.department) === 'Marketing'))}
                    {renderStatistic("Technology", (job) => (getDisplayDepartment(job.department) === 'Technology'))}
                    {renderStatistic("Operation", (job) => (getDisplayDepartment(job.department) === 'Operation'))}
                    {renderStatistic("Finance", (job) => (getDisplayDepartment(job.department) === 'Finance'))}
                    {renderStatistic("Human Resource", (job) => (getDisplayDepartment(job.department) === 'Human Resource'))}
                    {renderStatistic("Executive", (job) => (getDisplayDepartment(job.department) === 'Executive'))}
                    {renderStatistic("Area", (job) => (getDisplayDepartment(job.department) === 'Area'))}
                </Row>
            </Card>
        </div>
    );
}
