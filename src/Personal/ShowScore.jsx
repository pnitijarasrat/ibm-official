import React, { useEffect, useState } from "react";
import { url } from "../const/url";
import { useNavigate, useParams } from "react-router-dom";
import { dataRemap } from "../function/dataRemap";

export default function ShowScore() {
    const [isLoading, setIsLoading] = useState(false)
    const [scoreData, setScoreData] = useState({})
    const { userId } = useParams()
    const [jobData, setJobData] = useState([]);

    const getScoreData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}/account/${userId}/score.json`)
            const data = await res.json()
            setScoreData(data)
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
            const jobArray = data ? dataRemap(data) : [];
            setJobData(jobArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    // let sumScore = new Object();
    // let head = [];
    // let coworker = [];
    // Object.keys(scoreData).forEach(job => {
    //     // console.log(job)
    //     // console.log(scoreData[job])
    //     Object.keys(scoreData[job]).forEach(role =>{
    //         // console.log(role)
    //         // console.log(scoreData[job][role])
    //         // console.log(Object.values(scoreData[job][role]))
    //         if(role === "admin"){
    //             Object.values(scoreData[job][role]).forEach(scoreArr);
    //             function scoreArr(item){
    //                 head.push(item)
    //             }
    //         }
    //         else {
    //             Object.values(scoreData[job][role]).forEach(scoreArr);
    //             function scoreArr(item){
    //                 coworker.push(item)
    //             }
    //         }
    //     })
    //     var total_head_score = 0;
    //     for(var i = 0; i< head.length; i++){
    //         total_head_score += head[i];
    //     }
    //     var avg_head_score = total_head_score / head.length;
    //     var total_co_score = 0;
    //     for(var i = 0; i< coworker.length; i++){
    //         total_co_score += coworker[i];
    //     }
    //     var avg_co_score = total_co_score / coworker.length;
    //     sumScore[job] = avg_head_score + avg_co_score;
    //     head = [];
    //     coworker = [];
    // });
    // console.log(sumScore);

    useEffect(() => {
        getScoreData();
        getJobData();
    }, [])

    const [sumScore,setSumScore] = useState({});

    useEffect(() => {
        let totalScore = new Object();
        let head = [];
        let coworker = [];
        Object.keys(scoreData).forEach(job => {
            let adminEvaluate = false
            let coEvaluate = false
            let numCoEvaluate = 0
            Object.keys(scoreData[job]).forEach(role =>{
                if(role === "admin"){
                    adminEvaluate = true
                    Object.values(scoreData[job][role]).forEach(scoreArr);
                    function scoreArr(item){
                        head.push(item)
                    }
                }
                else {
                    coEvaluate = true
                    Object.values(scoreData[job][role]).forEach(scoreArr);
                    function scoreArr(item){
                        coworker.push(item)
                        numCoEvaluate += 1
                    }
                }
            })
            const totalHeadScore = head.reduce((acc, curr) => acc + curr, 0);
            let avgHeadScore = totalHeadScore / head.length;
            const totalCoScore = coworker.reduce((acc, curr) => acc + curr, 0);
            let avgCoScore = totalCoScore / coworker.length;
            avgHeadScore = avgHeadScore || 0
            avgCoScore = avgCoScore || 0
            totalScore[job] = [avgHeadScore + avgCoScore, [adminEvaluate, numCoEvaluate]]
            jobData.forEach(jobdata => {
                if (jobdata.name === job){
                    if (jobdata.memberRequired !== "1"){
                        totalScore[job][0] *= jobdata.score*0.01
                    }
                    if (jobdata.memberRequired === "1"){
                        totalScore[job][0] *= jobdata.score/60
                    }
                }
            })
            head = [];
            coworker = [];
        });
        setSumScore(totalScore);
    }, [scoreData,jobData])

    return(
        <div>
            {Object.keys(sumScore).map(job => (
                job !== "totalScore" ?
                <p key={job}>{job} - {Object.keys(sumScore).length > 0 ? sumScore[job][0] : "Loading..."} ({sumScore[job][1][0] ? "หัวหน้าโปรเจคประเมินแล้ว" : "หัวหน้าโปรเจคยังไม่ได้ประเมิน"}, เพื่อนร่วมโปรเจคประเมินแล้ว {sumScore[job][1][1]} คน)</p>
                : null            
            ))}
        </div>
    )
}