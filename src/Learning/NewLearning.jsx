import React, { useState } from "react";
import { Form, Input, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import MessageAPI from '../Message/Message'
import { url } from "../const/url";
import { departmentOptions } from '../const/department'

export default function NewLearn() {

  const [lessonForm] = Form.useForm()
  const navigate = useNavigate()
  const { success, contextHolder, error } = MessageAPI()
  const [isAdding, setIsAdding] = useState(false)

  const addLesson = async (newLesson) => {
    setIsAdding(true)
    try {
      const res = await fetch(`${url}/lesson.json`, {
        method: 'POST',
        body: JSON.stringify(newLesson),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        success('Add')
        setTimeout(() => {
          navigate('/learning')
        }, 1000)
      }
    } catch (e) {
      error('Add')
      console.log(e)
    }
  }
  const handleAddLesson = () => {
    const payload = lessonForm.getFieldsValue()
    addLesson(payload)
  }

  return (
    <>
      {contextHolder}
      <div className="page-container">
        <h2>New Lesson</h2>
        <Form labelCol={{ span: 4 }} form={lessonForm} onFinish={handleAddLesson}>
          <Form.Item label="Lesson" name="lesson" rules={[{ required: true }, { message: 'Please Enter this Field' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Department" name="department" rules={[{ required: true }, { message: 'Please Enter this Field' }]}>
            <Select options={departmentOptions} />
          </Form.Item>
          <Form.Item label="Link" name="link" rules={[{ required: true }, { message: 'Please Enter this Field' }]}>
            <Input />
          </Form.Item>
          <div className="footer">
            <button>{isAdding ? 'Adding' : 'Add'}</button>
            <button onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}>Back</button>
          </div>
        </Form>
      </div>
    </>
  )
}
