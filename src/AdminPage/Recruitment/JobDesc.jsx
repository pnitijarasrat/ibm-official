import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { url } from "../../const/url";
import { Space, Divider, Row, Col } from "antd";
import { dataRemap } from "../../function/dataRemap";
import createRefresh from "react-auth-kit/createRefresh";

export default function JobDesc(
) {
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState([])
  const [jobData, setJobData] = useState({})
  const [history, setHistory] = useState([])
  const [pending, setPending] = useState([])
  const navigate = useNavigate()

  const { jobId } = useParams()

  const getUserData = async () => {
    setIsLoading(true)
    try {
        const res = await fetch(`${url}/account.json`)
        const data = await res.json()
        const accountArray = data ? dataRemap(data) : []
        setUserData(accountArray)
        setIsLoading(false)
    } catch (e) {
        setIsLoading(false)
    }
  }

  const getJobData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/job/${jobId}.json`)
      const data = await res.json()
      setJobData(data)
      // await getHistory(data)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  const decline = async (job) => {
    try {
      // Delete the job application
      const res = await fetch(`${url}applyHistory/${job.key}.json`, {
        method: 'DELETE',
        body: JSON.stringify(job.key),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (res.ok) {
        // Fetch all evaluations
        const evalRes = await fetch(`${url}evaluation.json`);
        const evalData = await evalRes.json();
        
        // Find evaluations matching the employeeName and jobName
        const evaluationKeys = Object.keys(evalData).filter(key => 
          (evalData[key].assessed === job.employeeName || evalData[key].assessor === job.employeeName) && evalData[key].jobName === job.jobName
        );
  
        // Delete each matching evaluation
        for (const key of evaluationKeys) {
          await fetch(`${url}evaluation/${key}.json`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }

        let assessedKey = ""
        userData.forEach(user => {
          if (`${user.firstName} ${user.lastName}` === job.employeeName){
            assessedKey = user.key
          }
        })

        // Delete score from account
        await fetch(`${url}account/${assessedKey}/score/${jobData.name}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // let countUserKeysLeft = 0
        // userData.forEach(user => {
        //   if (`${user.firstName} ${user.lastName}` === job.employeeName){
        //     countUserKeysLeft = Object.keys(user).length
        //   }
        // })

        // if (countUserKeysLeft == 9) {
        //   await fetch(`${url}account/${assessedKey}.json`, {
        //     method: 'PATCH',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({score: 0})
        //   })
        // }
  
        // Refresh job data
        await getJobData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editscore = async (job, newscore) => {
      setIsLoading(true);
      try {
        const res = await fetch(`${url}job/${job.key}.json`, {
          method: "PATCH",
          body: JSON.stringify({
            ...job,
            score: newscore,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          setIsLoading(false);
          await getJobData();
        }
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };


  const approve = async (job) => {
    // console.log(job)
    const payload = {
      ...job,
      status: 'approve'
    }
    try {
      const res = await fetch(`${url}applyHistory/${job.key}.json`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (e) {
      console.log(e)
    }
  }

  const getHistory = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}applyHistory.json`)
      const data = await res.json()
      let historyArray = []
      if (data) historyArray = dataRemap(data)
      setHistory(historyArray.filter((his) => (his.jobId === jobId && his.status === 'approve')))
      setPending(historyArray.filter((his) => (his.jobId === jobId && his.status === 'pending')))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
    getJobData()
    getHistory()
  }, [])

  const handleEditScore = () => {
    const score = prompt("Enter new score:", jobData.score);
    if (score !== null) {
      editscore(jobData, score);
    }
  };

  return (
    <div className="page-container">
      <h1>Project</h1>
      {
        !isLoading ?
          <Space direction="vertical">
       
            <div>Job Title: {jobData.name}</div>
            <div>Job Description: {jobData.desc}</div>
            <div>
              View JD:{" "}
              <a>
                <button>JD</button>
              </a>
            </div>
            <div>Owner: {jobData.owner ? `${jobData.owner.id} - ${jobData.owner.name}` : ''} </div>
            <div>
              Current score: {jobData.score}
            </div>
            <div>
              <button onClick={handleEditScore}>Edit score</button>
            </div>
          </Space>
          :
          <div>Loading...</div>
      }
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <h2>Project Member [{history.length}/{jobData.memberRequired}]</h2>
        {
          !isLoading ?
            history.length !== 0 ?
              history.map((his) => (
                <Row key={his.key} gutter={16} align="middle">
                  <Col span={12}>
                    {his.employeeId} - {his.employeeName} 
                  </Col>
                  <Col>
                  <button onClick={() => decline(his)}>Delete</button>
                  </Col>
                </Row>
              ))
              :
              <div>No Member</div>
            :
            <div>Loading...</div>
        }
      </Space>
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <h2>Pending Request</h2>
        <Space direction="vertical">
          {
            !isLoading ? 
              pending.length !== 0 ?
                pending.map((pend) => (
                  <>
                    <Row key={pend.key} gutter={16} align="middle">
                      <Col span={12}>
                        <div>
                          {pend.employeeId} - {pend.employeeName}
                        </div>
                        <div>
                          Message: {pend.cv}
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="gap">
                          <button onClick={() => approve(pend)}>Approve</button>
                          <button onClick={() => decline(pend)}>Delete</button>
                        </div>
                      </Col>
                    </Row>
                    <Divider />
                  </>
                ))
                :
                <div>No Member</div>
              :
              <div>Loading...</div>
          }
        </Space>
      </Space>
    </div>
  )
}
