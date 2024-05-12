import React, { useEffect, useState } from "react";
import { useAuth } from '../Authenticate/AuthProvider'
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../const/url";
import { Space, Divider, QRCode } from "antd";
import { dataRemap } from "../function/dataRemap";
import { getDisplayRole, isAdmin } from "../function/role";
import { getDisplayRegion } from "../const/department";
import ShowScore from "./ShowScore";

export default function Personal() {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [history, setHistory] = useState([])
  const [historyadmin, setHistoryadmin] = useState([])
  const [currentJob, setCurrentJob] = useState([])

  const { userId } = useParams()
  const user = useAuth()
  const navigate = useNavigate()

  const getUserData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/account/${userId}.json`)
      const jobRes = await fetch(`${url}/job.json`)
      const data = await res.json()
      const jobData = await jobRes.json()
      const jobArray = jobData ? dataRemap(jobData) : []
      setCurrentJob(jobArray.map((job) => (job.key)))
      setUserData(data)
      {isAdmin(user.role) ? (
        <>
        {getHistoryAdmin(data)}
        </>
      ) : (
      <>
      {await getHistory(data)}
      </>
      )}
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }



  const updateProject = async (projectCounted) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/account/${userId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...userData,
          project: projectCounted
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        setIsLoading(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getHistory = async (employee) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}applyHistory.json`)
      const data = await res.json()
      let historyArray = []
      if (data) historyArray = dataRemap(data)
      setHistory(historyArray.filter((his) => {
        if (his.employeeId === employee.name)
          return his
      }))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  const getHistoryAdmin = async (employee) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}job.json`)
      const data = await res.json()
      let historyArray = []
      if (data) historyArray = dataRemap(data)
        // console.log(historyArray)
      setHistoryadmin(historyArray.filter((his) => {
        if (his.owner.id === employee.name)
          return his
      }))
      console.log(historyArray.filter((his) => {
        if (his.owner.id === employee.name)
          return his
      }))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  const ProjectListpending = ({ projects }) => (

    <Space direction="vertical">

      {projects.map((project) => (

        <>

          <div key={project.key}>

          {isAdmin(user.role) ? (

            <>

              <div>

                Project Name: {project.name} 

              </div>

          

            </>

          ) : (

            <>

              <div>

                Project Name: {project.jobName}

                {currentJob.includes(project.jobId) ? "" : "[This project has been deleted.]"}

              </div>

              <div>

                Line Group: {project.lineLink !== '-' ? <QRCode value={project.lineLink} /> : "No Line Group Link"}

              </div>

      

            </>

          )}

          </div>

          <Divider />

        </>

      ))}

    </Space>

  );

  const ProjectList = ({ projects }) => (
    <Space direction="vertical">
      {projects.map((project) => (
        <>
          <div key={project.key}>
          {isAdmin(user.role) ? (
            <>
              <div>
                Project Name: {project.name}
              </div>
              <div>
                <button onClick={() => navigate(`/evaluation/${project.name}/${userId}`)}>Evaluation: {project.name}</button>
              </div>
            </>
          ) : (
            <>
              <div>
                Project Name: {project.jobName}
                {currentJob.includes(project.jobId) ? "" : "[This project has been deleted.]"}
              </div>
              <div>
                Line Group: {project.lineLink !== '-' ? <QRCode value={project.lineLink} /> : "No Line Group Link"}
              </div>
              <div>
                <button onClick={() => navigate(`/evaluation/${project.jobName}/${userId}`)}>Evaluation: {project.jobName}</button>
              </div>
            </>
          )}
          </div>
          <Divider />
        </>
      ))}
    </Space>
  );


  const StatusSection = ({ title, status, projects }) => (

    <div>

      <h2>

        {title} [{projects.filter((project) => project.status === status).length}]

      </h2>

      {status === "pending" ? (

        projects.filter((project) => project.status === status).length !== 0 ? (

          <ProjectListpending

            projects={projects.filter((project) => project.status === status)}

          />

        ) : (

          <div>No {status} projects</div>

        )

      ) : (

        projects.filter((project) => project.status === status).length !== 0 ? (

          <ProjectList

            projects={projects.filter((project) => project.status === status)}

          />

        ) : (

          <div>No {status} projects</div>

        )

      )}

      <Divider />

    </div>

  );


  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="page-container">
      {
        isAdmin(user.role) &&
        <div className="admin-panel">
          <h2>Admin</h2>
          <div className="gap">
            <button onClick={() => navigate('/admin-all-employee')}>All Employee</button>
            <button onClick={() => navigate('/admin-all-recruitment')}>All Recruitment</button>
            <button disabled>All Announcement</button>
            <button disabled>All Link</button>
          </div>
        </div>
      }
      <h2>Personal Information</h2>
      {
        isLoading ?
          <div>Loading...</div>
          :
          userData ?
            <Space direction="vertical">
              <div>Name: {userData.firstName} {userData.lastName}</div>
              <div>Employee ID: {userData.name}</div>
              <div>Role: {getDisplayRole(userData.role)}</div>
              <div>Region: {getDisplayRegion(userData.branch)}</div>
              <div>Branch: {userData.branch}</div>
              <div>All Approved Project: {history.filter((his) => (his.status === 'approve')).length}</div>
              {/* <div>Score: {userData.score || 0}</div> */}
              {isAdmin(user.role) ? (
                <></>
              ):(
                <div>
                <button onClick={toggle}>{isOpen ? "Hide Score" : "Show Score"}</button>
                {isOpen && <ShowScore />}
              </div>  
              )}

              <div><button onClick={() => updateProject(history.filter((his) => (his.status === 'approve')).length)}>Sync Change</button></div>
              {isAdmin(user.role) && 
                <div><button onClick={() => navigate('/leaderboard')}>View Leaderboard</button></div>
              }            
              </Space>
            :
            <div>No Data</div>
      }
      <Divider />
      { isAdmin(user.role) ?(
      <>
        <StatusSection title="All open projects" status="done" projects={historyadmin} />
      </>
      )
      :(
        <>
        <StatusSection title="Pending Request" status="pending" projects={history} />
        <StatusSection title="Approved Request" status="approve" projects={history} />
        </>
      )

      }
    </div>
  )
}
