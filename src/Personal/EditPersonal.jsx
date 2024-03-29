import React, { useEffect, useState } from "react";
import { Input, Form, Select, Divider } from 'antd'
import { url } from "../const/url";
import { useParams } from 'react-router-dom'
import { roleOption } from "../function/role";
import { useNavigate } from 'react-router-dom'

export default function EditPersonal() {
  const [isLoading, setIsLoading] = useState()
  const [isUpdating, setIsUpdating] = useState(false)
  const [userData, setUserData] = useState()

  const [editForm] = Form.useForm()

  const { userId } = useParams()
  const navigate = useNavigate()

  // TODO
  // 1. handleSave

  const getUserData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}account/${userId}.json`)
      const data = await res.json()
      editForm.setFieldsValue(data)
      setUserData(data)
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const updateUserData = async (payload) => {
    setIsUpdating(true)
    try {
      const res = await fetch(`${url}/account/${userId}.json`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setTimeout(() => {
        navigate(`/${userId}`)
      }, 500)
    } catch (e) {
      console.log(e)
    }
    setIsUpdating(false)
  }

  const handleUpdateFinish = (value) => {
    updateUserData(value)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <div className="page-container">
        <h1>Edit Information</h1>
        {
          isLoading && !userData ?
            <div>Loading...</div>
            :
            <Form form={editForm} onFinish={handleUpdateFinish}
              labelCol={{ span: 4 }}
            >
              <div>Name: {userData?.firstName} {userData?.lastName}</div>
              <div>Employee ID: {userData?.name}</div>
              <Divider />
              <h2>New Information</h2>
              <Form.Item label="Role" name="role">
                <Select options={roleOption} />
              </Form.Item>
              <Form.Item label="Branch" name="branch">
                <Input />
              </Form.Item>
              <div className="footer">
                <button>{isUpdating ? 'Updating' : 'Update'}</button>
                <button onClick={(e) => {
                  e.preventDefault()
                  navigate(-1)
                }}>Back</button>
              </div>
            </Form>
        }
      </div>
    </>
  )
}
