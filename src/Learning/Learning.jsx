import React, { useState, useEffect } from "react";
import { isAdmin } from "../function/role";
import { useAuth } from "../Authenticate/AuthProvider";
import { useNavigate } from 'react-router-dom'
import { Tabs, Space, Row, Col, Flex } from 'antd'
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import LearnLink from './LearnLink'

export default function Learning() {
  const [lesson, setLesson] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const user = useAuth()
  const navigate = useNavigate()

  const getLesson = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}lesson.json`)
      const data = await res.json()
      const lessonArray = data ? dataRemap(data) : []
      setLesson(lessonArray)
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const renderDepartmentTab = (department, lesson) => {
    return (

      <>
        <Space>
          {lesson.length !== 0 ?

            lesson.map((l) => (
              <LearnLink lesson={l} key={l.ley} />
            ))
            :
            <div>No Lesson from {department}</div>
          }
        </Space>
      </>
    )
  }

  const items = [
    {
      key: '1',
      label: 'Marketing',
      children: renderDepartmentTab("Marketing", lesson.filter((l) => (l.department === 'marketing'))),
    },
    {
      key: '2',
      label: 'Technology',
      children: renderDepartmentTab("Technology", lesson.filter((l) => (l.department === 'technology'))),
    },
    {
      key: '3',
      label: 'Operation',
      children: renderDepartmentTab("Operation", lesson.filter((l) => (l.department === 'operation'))),
    },
    {
      key: '4',
      label: 'Human Resource',
      children: renderDepartmentTab("Human Resource", lesson.filter((l) => (l.department === 'hr'))),
    },
    {
      key: '5',
      label: 'Finance',
      children: renderDepartmentTab("Finance", lesson.filter((l) => (l.department === 'finance'))),
    }, {
      key: '6',
      label: 'Executive',
      children: renderDepartmentTab("Executive", lesson.filter((l) => (l.department === 'executive'))),
    },

  ];

  useEffect(() => {
    getLesson()
  }, [])

  return (
    <div className="page-container">
      {
        isAdmin(user.role) &&
        <div className="admin-panel">
          <h2>Admin</h2>
          <div className="gap">
            <button onClick={() => navigate('/new-learn')}>New Lesson</button>
          </div>
        </div>
      }
      <h1>Learning Center</h1>
      <Tabs items={items} />
    </div>
  )
}
