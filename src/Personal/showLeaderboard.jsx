import React, { useEffect, useState } from "react";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { Card, Statistic, Row, Col } from "antd";
import { getDisplayRole, isAdmin } from "../function/role";

export default function ShowLeaderboard() {
    const [isLoading, setIsLoading] = useState(false)
    const [accountData, setAccountData] = useState([])
    const [jobData, setJobData] = useState([])
    // const [totalScore, setTotalScore] = useState(0)
    const [totalScoreObject, setTotalScoreObject] = useState({})
    // const [everyoneTotalScoreData, setEveryoneTotalScoreData] = useState({})
    let everyoneTotalScoreData = new Object()
    const [scoreboard, setScoreboard] = useState([])

    // const [totalScoreData, setTotalScoreData] = useState({})
    // const [headScore, setHeadScore] = useState([])
    // const [coworkerScore, setCoworkerScore] = useState([])

    const getAccountData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}/account.json`)
            const data = await res.json()
            const accountArray = data ? dataRemap(data) : []
            const filteredAccountArray = accountArray.filter(user => !isAdmin(user.role))
            setAccountData(filteredAccountArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const getJobData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}job.json`)
            const data = await res.json()
            const jobArray = data ? dataRemap(data) : []
            setJobData(jobArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        accountData.forEach(user => {
            let totalScoreData = new Object()
            let headScore = []
            let coworkerScore = []
            if ("score" in user && typeof user.score === 'object' && user.score !== null){
                // console.log(user)
                Object.keys(user.score).forEach(job => {
                    // console.log(user.score)
                    Object.keys(user.score[job]).forEach(role => {
                        if(role === "admin"){
                            Object.values(user.score[job][role]).forEach(scoreArr)
                            function scoreArr(item){
                                headScore.push(item)
                            }
                        } else {
                            Object.values(user.score[job][role]).forEach(scoreArr)
                            function scoreArr(item){
                                coworkerScore.push(item)
                            }
                        }
                    })
                    // console.log(headScore)
                    // console.log(coworkerScore)
                    const totalHeadScore = headScore.reduce((acc, curr) => acc + curr, 0)
                    let avgHeadScore = totalHeadScore / headScore.length
                    const totalCoScore = coworkerScore.reduce((acc, curr) => acc + curr, 0)
                    let avgCoScore = totalCoScore / coworkerScore.length
                    avgHeadScore = avgHeadScore || 0
                    avgCoScore = avgCoScore || 0
                    totalScoreData[job] = (avgHeadScore + avgCoScore).toFixed(2)
                    jobData.forEach(jobdata => {
                        if (jobdata.name === job){
                            if (jobdata.memberRequired !== "1"){
                                totalScoreData[job] *= jobdata.score*0.01
                            }
                            if (jobdata.memberRequired === "1"){
                                totalScoreData[job] *= jobdata.score/60
                            }
                        }
                    })
                    headScore = []
                    coworkerScore = []
                })
                // console.log(totalScoreData)
                // setTotalScoreObject(totalScoreData)
                let tempSum = 0
                Object.keys(totalScoreData).map(job => (
                    tempSum += totalScoreData[job]
                ))
                // console.log(tempSum)
                // // setTotalScore(tempSum)
                // // setEveryoneTotalScoreData({...everyoneTotalScoreData, [`${user.firstName} ${user.lastName}`]: tempSum})
                everyoneTotalScoreData[`${user.firstName} ${user.lastName}`] = [tempSum, user.name]    
            } else {
            //     // setEveryoneTotalScoreData({...everyoneTotalScoreData, [`${user.firstName} ${user.lastName}`]: 0})
                everyoneTotalScoreData[`${user.firstName} ${user.lastName}`] = [0, user.name]
            }
        })
        // console.log(Object.keys(everyoneTotalScoreData).length)
        // console.log(everyoneTotalScoreData)
        setScoreboard(everyoneTotalScoreData)
    }, [accountData,jobData])

    // console.log(scoreboard)
    
    useEffect(() => {
        getAccountData()
        getJobData()
    }, [])
    
    return (
        <div className="page-container">
            <h1>Leaderboard</h1>
            <br/>
            <table className="styled-table">
                <colgroup>
                    <col style={{ width: '15%' }} /> {/* Rank column width */}
                    <col style={{ width: '25%' }} /> {/* Student ID */}
                    <col style={{ width: '45%' }} /> {/* Name column width */}
                    <col style={{ width: '15%' }} /> {/* Score column width */}
                </colgroup>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Student ID</th>
                        <th>Name</th>
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
                        Object.keys(scoreboard).length !== 0 ?
                            <tbody>
                                {Object.entries(scoreboard).map(([name, [score,id]], index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{id}</td>
                                        <td>{name.trim()}</td>
                                        <td>{score}</td>
                                    </tr>
                                ))}
                            </tbody>                           
                            :
                            <div>No Employee</div>
                }
            </table>
        </div>
    )
}