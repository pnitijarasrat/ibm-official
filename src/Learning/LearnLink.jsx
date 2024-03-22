import React from "react";
import { Row, Col } from 'antd'

export default function LearnLink({
  lesson
}) {

  return (
    <Row gutter={16} align="middle">
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <h2>
          {lesson.lesson}
        </h2>
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <a href={lesson.link} target="_blank" rel="noreferrer">
          <button>Learn</button>
        </a>
      </Col>
    </Row>
  )
}
