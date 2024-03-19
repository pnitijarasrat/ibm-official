import React from "react";
import { Space, Card, Statistic, Row, Col } from "antd";
import { isAdmin } from "../../function/role";
import { getDisplayRegion } from "../../const/department";

export default function Overview({ employee }) {

    const renderStatistic = (title, filterFn) => {
        return (
            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <Statistic title={title} value={employee.filter(filterFn).length} />
            </Col>
        );
    };

    return (
        <div>
            <h2>By Role</h2>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card>
                        <Statistic title="Total" value={employee.length} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card>
                        <Statistic title="Admin" value={employee.filter((em) => isAdmin(em.role)).length} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Card>
                        <Statistic title="Employee" value={employee.filter((em) => !isAdmin(em.role)).length} />
                    </Card>
                </Col>
            </Row>
            <br />
            <h2>All Employee (not including Super Admin)</h2>
            <Card>
                <Row gutter={16}>
                    {renderStatistic("North", (em) => getDisplayRegion(em.branch) === 'North')}
                    {renderStatistic("North East", (em) => getDisplayRegion(em.branch) === 'North East')}
                    {renderStatistic("East", (em) => getDisplayRegion(em.branch) === 'East')}
                    {renderStatistic("Center", (em) => getDisplayRegion(em.branch) === 'Center')}
                    {renderStatistic("West", (em) => getDisplayRegion(em.branch) === 'West')}
                    {renderStatistic("South", (em) => getDisplayRegion(em.branch) === 'South')}
                </Row>
            </Card>
        </div>
    );
}
