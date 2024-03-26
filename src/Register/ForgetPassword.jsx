import React, { useEffect, useState } from "react";
import { Form, Input, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState([])
  const [result, setResult] = useState('')

  const [passwordForm] = Form.useForm()
  const navigate = useNavigate()

  const requestPassword = () => {
    const payload = passwordForm.getFieldsValue()
    console.log(payload)
    for (let i = 0; i < account.length; i++) {
      if (payload.username === account[i].username && payload.studentId === account[i].studentId) {
        return setResult(account[i].password)
      }
    }
    return setResult("Username and Student ID don't match")
  }

  const getAccount = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}account.json`)
      const data = await res.json()
      const accountArray = dataRemap(data)
      setAccount(accountArray.map((data) => ({
        username: data.username,
        studentId: data.name,
        password: data.password
      })))
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAccount()
  }, [])

  return (
    <div className="register">
      <h1>Forget Password</h1>
      <Spin spinning={isLoading}>
        <Form form={passwordForm} onFinish={requestPassword}>
          <Form.Item name="studentId" label="Student ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <div className="register-action">
            <button>Request</button>
            <button onClick={(e) => {
              e.preventDefault()
              setResult('จำเหี้ยไรได้บ้างครับ')
            }}>Forget Username</button>
            <button onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}>
              Back
            </button>
          </div>
        </Form>
        <br />
        {
          result && <div style={{ textAlign: 'center' }}>{result}</div>
        }
      </Spin>
    </div >
  )
}
