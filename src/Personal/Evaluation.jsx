import React, { useState, useEffect } from "react";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { isAdmin } from "../function/role";
import { Card, Statistic, Row, Col } from "antd";
import { useAuth } from '../Authenticate/AuthProvider'
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import { Space, Divider, QRCode } from "antd";
import { getDisplayRegion } from "../const/department";

export default function Evaluation() {
    const [isLoading, setIsLoading] = useState(false)
    const [currentLength, setCurrentLength] = useState(10)
    const [employee, setEmployee] = useState([])
    const [personal, setPersonal] = useState({})
    const [evaluation_employee, set_evaluationEmployee] = useState([])
    const [evaluation, set_evaluation] = useState([])
    const [evaluation_personal, set_evaluationPersonal] = useState({})
    const [evaluateProjectOwner, setEvaluateProjectOwner] = useState([])
    const navigate = useNavigate()
    const { jobName, userId } = useParams();
    const user = useAuth()
    const [disabledButton, setDisabledButton] = useState(false)

    const getEvaluation = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${url}evaluation.json`)
        const data = await res.json()
        const evaluationArray = data ? dataRemap(data) : [];
        set_evaluation(evaluationArray)
        set_evaluationassessed(evaluationArray.filter((eva_a) => (eva_a.jobName === `${jobName}`)).map((eva_a) => (eva_a.assessed)))
        set_evaluationassessor(evaluationArray.filter((eva_a) => (eva_a.jobName === `${jobName}`)).map((eva_a) => (eva_a.assessor)))
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
      }
    }

    const getEvaluateProjectOwnerData = async() => {
      setIsLoading(true)
      try {
          const res = await fetch(`${url}evaluateProjectOwner.json`)
          const data = await res.json()
          const evaluationArray = data ? dataRemap(data) : [];
          setEvaluateProjectOwner(evaluationArray)
          setIsLoading(false)
      } catch (e) {
          setIsLoading(false)
      }
    }
    const checkEvaluate = () => {
      // Check if the current user has already evaluated the project owner
      const isEvaluated = evaluateProjectOwner.some(element => 
        element.jobName === jobName && element.assessor === `${personal.firstName} ${personal.lastName}`
      );
      setDisabledButton(isEvaluated);
    };

    async function fetchData() {
        setIsLoading(true);
        try {
          const res = await fetch(`${url}account.json`);
          const perRes = await fetch(`${url}account/${localStorage.getItem("site")}.json`);
          const perData = await perRes.json()
          const data = await res.json();
          const employeeArray = data ? dataRemap(data) : [];
          setPersonal(perData)
          setEmployee(employeeArray);
          getCurrentRank()

          const evaluation_res = await fetch(`${url}applyHistory.json`);
          const evaluation_perRes = await fetch(`${url}applyHistory/${localStorage.getItem("site")}.json`);
          const evaluation_perData = await evaluation_perRes.json()
          const evaluation_data = await evaluation_res.json();
          const evaluationArray = evaluation_data ? dataRemap(evaluation_data) : [];
          set_evaluationPersonal(evaluation_perData)
          set_evaluationEmployee(evaluationArray);
          getCurrentRank()



        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
    
    }
    

    const getCurrentRank = () => {
        for (let i = 0; i < employee.length; i++) {
            if (personal.name === employee[i].name)
            // return console.log(i)
            return (i += 1).toString()
        }
    }

    useEffect(() => {
        fetchData();
        getEvaluation();
        getEvaluateProjectOwnerData();
    }, []);

    useEffect(() => {
      if (evaluateProjectOwner.length > 0 && Object.keys(personal).length > 0) {
        checkEvaluate();
      }
    }, [evaluateProjectOwner, personal])

    {evaluation_employee.toString()}

    const filterEvaluation = (jobName, assessor) => {
      return evaluation.filter(item => item.jobName === jobName && item.assessor === assessor);
    }

    const updateScore = async (updatedScore,job,role,assessor,assessedKey) => {
      setIsLoading(true)
      try {
        const requestBody = {
          [`${assessor}`]: updatedScore
        }

        const res = await fetch(`${url}/account/${assessedKey}/score/${job}/${role}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        })
        if (res.ok) {
          setIsLoading(false)
          // console.log('Score updated successfully.');
        } else {
          console.error('Failed to update score:', res.status);
        }
      } catch (e) {
        console.error('Error updating score:', error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      const filteredArray = filterEvaluation(jobName, `${personal.firstName} ${personal.lastName}`)
      filteredArray.forEach(item => {
        let assessed_key = ""
        employee.forEach(em => {
          if (`${em.firstName} ${em.lastName}` === item.assessed) {
            assessed_key = em.key
          }
        })
        let tempSum = 0
        for(let i = 1; i < Object.keys(item).length-4; i++){
          tempSum += parseInt(item[`question${i}`]);
        }
        updateScore(tempSum,jobName,item.roleAssessor,item.assessor,assessed_key)
      })
    }, [evaluation,personal])

    return (
      <div className="page-container">
        <h1>Evaluation for {jobName} </h1>
        {/* <Card title={isLoading ? 'Loading...' : `${personal.name} - ${personal.firstName} ${personal.lastName}`}>
          <Row>
            <Col xs={24} sm={8}>
              <Statistic title="Current Rank" value={getCurrentRank()} />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic title="Project Counted" value={personal.project ? personal.project.toLocaleString() : "0"} />
            </Col>
            <Col xs={24} sm={8}>
              <Statistic title="Current Score" value={personal.score ? personal.score : "0"} />
            </Col>
          </Row>
        </Card> */}
        <br />
        <table className="styled-table">
          <colgroup>
            <col style={{ width: '15%' }} /> {/* ID column width */}
            <col style={{ width: '25%' }} /> {/* ID column width */}
            <col style={{ width: '45%' }} /> {/* Name column width */}
            <col style={{ width: '15%' }} /> {/* Name column width */}
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Name</th>
              <th>ProjectName</th>
              <th>Evaluate</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ?
              <tr>
                <td>Loading...</td>
              </tr>
              :
              evaluation_employee.length !== 0 ?
                evaluation_employee
                  .filter(em => em.jobName === `${jobName}` && em.employeeName !== `${personal.firstName} ${personal.lastName}` && em.status === `approve`)
                  .slice(0, currentLength)
                  .map((em, rank) => {
                    const filteredEvaluation = evaluation.filter(ea =>
                      ea.jobName === `${jobName}` &&
                      ea.assessed === em.employeeName &&
                      ea.assessor === `${personal.firstName} ${personal.lastName}`
                    );
    
                    const filteredEvaluationLength = filteredEvaluation.length;
    
                    const isEveryEvaluated = filteredEvaluationLength > 0 && filteredEvaluation.every((ea) =>
                      ea.assessed === em.employeeName &&
                      ea.assessor === `${personal.firstName} ${personal.lastName}`
                    );
    
                    return (
                      <tr key={em.key}>
                        <td>{rank + 1}</td>
                        <td>{em.employeeId}</td>
                        <td>{em.employeeName}</td>
                        <td>{em.jobName}</td>
                        <td>
                          <div>
                            {isEveryEvaluated ? (
                              <button disabled>
                                Evaluated
                              </button>
                            ) : (
                              <button onClick={() => navigate(`/assessed/${em.employeeName}/${jobName}/${userId}/${personal.firstName} ${personal.lastName}`)}>
                                Evaluate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                :
                <tr>
                  <td colSpan="5">No Employee</td>
                </tr>
            }
          </tbody>
        </table>
        <br />
        <div className="footer">

          {!isAdmin(user.role) && (
            disabledButton ? (
              <button disabled>Already evaluate project owner</button>
            ) : (
              <button onClick={() => navigate(`/evaluate/${jobName}/${userId}/${personal.firstName} ${personal.lastName}`)}>Evaluate Project Owner</button>
            )
          )}


          <button onClick={() => navigate(`/${localStorage.getItem("site")}`)}>Back</button>
          {currentLength > 10 && (
            <button onClick={() => setCurrentLength(currentLength + 10)}>View More</button>
          )}
        </div>
      </div>
    ); }