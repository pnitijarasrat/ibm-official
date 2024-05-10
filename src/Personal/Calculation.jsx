import React, { useEffect, useState } from "react";
import { useAuth } from '../Authenticate/AuthProvider'
import { getDisplayRole, isAdmin } from "../function/role";
import { getDisplayRegion } from "../const/department";
import { url } from "../const/url";
import { useNavigate, useParams } from "react-router-dom";
import { dataRemap } from "../function/dataRemap";

export default function Calculation () {
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const { userId } = useParams()
    const user = useAuth()
    const navigate = useNavigate()

    const getUserData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}/account/${userId}.json`)
            const data = await res.json()
            setUserData(data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const [evaluationData, setEvaluationData] = useState([])
    const [sum, setSum] = useState(0);

    const getEvaluationData = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`${url}evaluation.json`)
            const data = await res.json()
            const evaluationArray = data ? dataRemap(data) : [];
            setEvaluationData(evaluationArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
        }
    }

    const [jobData, setJobData] = useState([]);

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

    // const updateScoreStatus = async (key) => {
    //     setIsLoading(true)
    //     try {
    //         const res = await fetch(`${url}evaluation/${key}.json`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 isUpdateToAssessed: true
    //             })
    //         })
    //         setIsLoading(false)
    //     } catch (e) {
    //         setIsLoading(false);
    //     }
    // };

    const updateScore = async (updatedScore,job,role,assessor) => {
        setIsLoading(true)
        try {
            const requestBody = {
                [`${assessor}`]: updatedScore
            }

            const res = await fetch(`${url}/account/${userId}/score/${job}/${role}.json`, {
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

    // const updateScore = async (updatedScore, isUpdated) => {
    //     setIsLoading(true);
    //     try {
    //         // Fetch the existing score data
    //         const res = await fetch(`${url}/account/${userId}/score/Web Developer.json`);
    //         if (res.ok) {
    //             const existingScoreData = await res.json();
    
    //             // Check if the data already exists
    //             if (existingScoreData && Array.isArray(existingScoreData["project-co-members"]) && !isUpdated) {
    //                 // If the data exists, add the updated score to the existing array
    //                 existingScoreData["project-co-members"].push(updatedScore);
    //             } else if (existingScoreData && Array.isArray(existingScoreData["project-co-members"]) && isUpdated) {

    //             } else {
    //                 // If the data doesn't exist, create a new array with the updated score
    //                 existingScoreData["project-co-members"] = [updatedScore];
    //             }
    
    //             // Update the score data in the database
    //             const updateRes = await fetch(`${url}/account/${userId}/score/Web Developer.json`, {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(existingScoreData)
    //             });
    
    //             if (updateRes.ok) {
    //                 setIsLoading(false);
    //                 console.log('Score updated successfully.');
    //             } else {
    //                 console.error('Failed to update score:', updateRes.status);
    //             }
    //         } else {
    //             console.error('Failed to fetch existing score data:', res.status);
    //         }
    //     } catch (error) {
    //         console.error('Error updating score:', error);
    //         setIsLoading(false);
    //     }
    // };

    // const updateScore = async (updatedScore) => {
    //     setIsLoading(true);
    //     try {
    //         const res = await fetch(`${url}/account/${userId}/score/Web Developer.json`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 "project-co-members": [...userData.score["Web Developer"].project-co-members, updatedScore]
    //             })
    //         });
    //         if (res.ok) {
    //             setIsLoading(false);
    //             console.log('Score updated successfully.');
    //         } else {
    //             console.error('Failed to update score:', res.status);
    //         }
    //     } catch (error) {
    //         console.error('Error updating score:', error);
    //         setIsLoading(false);
    //     }
    // };    

    useEffect(() => {
        getUserData();
        getEvaluationData();
        getJobData();
    }, [])

    useEffect(() => {
        // Calculate the sum of evaluation scores
        let tempSum = 0;
        evaluationData.forEach(item => {
            // console.log(item)
            if(item && item.assessed === `${userData.firstName} ${userData.lastName}`) {
                // jobData.forEach(item2 => {
                //     if(item.jobName === item2.name) {
                        for(let i = 1; i < Object.keys(item).length-4; i++){
                            tempSum += parseInt(item[`question${i}`]);
                        }
                        updateScore(tempSum,item.jobName,item.roleAssessor,item.assessor);
                        // updateScoreStatus(item.key);
                        tempSum = 0;
                //     }
                // })
            }
        });
        setSum(tempSum);
        // Update the score in the database
    }, [evaluationData, userData])

    return(
        <div></div>
    )
}