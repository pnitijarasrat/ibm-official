import React, { useState, useEffect } from "react";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { isAdmin } from "../function/role";
import { Card, Statistic, Row, Col } from "antd";

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [employee, setEmployee] = useState([])
  const [currentLength, setCurrentLength] = useState(10)
  const [personal, setPersonal] = useState({})

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
  }, []);

  return (
    <div className="page-container">
      <h1>Leaderboard</h1>
      <Card title={isLoading ? 'Loading...' : `${personal.name} - ${personal.firstName} ${personal.lastName}`}>
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
      </Card>
      <br />
      <table className="styled-table">
        <colgroup>
          <col style={{ width: '15%' }} /> {/* ID column width */}
          <col style={{ width: '20%' }} /> {/* Name column width */}
          <col style={{ width: '35%' }} /> {/* Role column width */}
          <col style={{ width: '20%' }} /> {/* Region column width */}
          <col style={{ width: '10%' }} /> {/* Branch Number column width */}
        </colgroup>
        <thead>
          <tr>
            <th>Rank</th>
            <th>ID</th>
            <th>Name</th>
            <th>Project Count</th>
            <th>Score</th>
          </tr>
        </thead>
        {
          isLoading ?
            <tr>
              <td>
                Loading...
              </td>
            </tr>
            :
            employee.length !== 0 ?
              employee
                // .filter((em) => (!isAdmin(em.role)))
                .slice(0, currentLength)
                .map((em, rank) => (
                  <tr key={em.key}>
                    <td>{rank += 1}</td>
                    <td>{em.name}</td>
                    <td>{em.firstName} {em.lastName}</td>
                    <td>{em.project ? em.project : 0}</td>
                    <td>{em.score ? em.score : 0}</td>
                  </tr>
                ))
              :
              <div>No Employee</div>
        }
      </table>
      <br />
      <div className="footer">
        <button onClick={() => setCurrentLength(currentLength + 10)}>View More</button>
      </div>
    </div >
  )
}