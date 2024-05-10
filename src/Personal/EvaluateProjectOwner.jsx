import React, { useEffect, useState } from "react";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { Card, Statistic, Row, Col, Radio, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import { isAdmin } from "../function/role";

export default function EvaluationProjectOwner() {
    const [isLoading, setIsLoading] = useState(false)
    const { jobName, userId, assessor } = useParams();
    const navigate = useNavigate()
    const [isEvaluating, setIsEvaluating] = useState(false)
    // const [evaluateProjectOwner, setEvaluateProjectOwner] = useState([])
    const [roleAssessor, setRoleAssessor] = useState(null); // Initialize with null or default value

    const [selectedValues, setSelectedValues] = useState({
        question1: '',
        question2: '',
    });

    // const getEvaluateProjectOwnerData = async() => {
    //     setIsLoading(true)
    //     try {
    //         const res = await fetch(`${url}evaluateProjectOwner.json`)
    //         const data = await res.json()
    //         const evaluationArray = data ? dataRemap(data) : [];
    //         setEvaluateProjectOwner(evaluationArray)
    //         setIsLoading(false)
    //     } catch (e) {
    //         setIsLoading(false)
    //     }
    // }

    // // console.log(evaluateProjectOwner)

    // const checkEvaluate = async () => {
    //     evaluateProjectOwner.forEach((element) => {
    //         if (element.jobName===jobName && element.assessor===assessor){

    //         }
    //     })
    // }

    const handleSubmit = async () => {
        setIsEvaluating(true);
        try {
            let payload;
            payload = {
                assessor: assessor,
                jobName: jobName,
                roleAssessor: roleAssessor,
                ...selectedValues,
            };
            const response = await fetch(`${url}evaluateProjectOwner.json`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            const responseData = await response.json();
            setIsEvaluating(false);
            if (response.ok) {
                console.log("Evaluation submitted successfully.");
                navigate(`/evaluation/${jobName}/${userId}`);
            } else {
                throw new Error(responseData.error || 'Unknown error');
            }
        } catch (error) {
            setIsEvaluating(false);
            console.error(error);
        }
    };

    const handleRadioChange = (question, value) => {
        setSelectedValues(prevState => ({
            ...prevState,
            [question]: value
        }));
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`${url}account/${userId}.json`);
            const data = await res.json();
            // console.log("Account Data:", data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRoleAssessor = async () => {
        const data = await fetchData();
        if (data && data.role) {
            setRoleAssessor(data.role);
        } else {
            console.error("Role data not found");
        }
    }

    fetchRoleAssessor();

    // useEffect(()=>{
    //     getEvaluateProjectOwnerData()
    //     checkEvaluate()
    // }, [])

    return (
        <div className="page-container">
            <h1>Evaluate Project Owner of {jobName}</h1>
            <Card>
                <Row>
                    <Col>
                        <Statistic value="Question : 1" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Statistic value="Do you feel satisfied with working with your project leader?" />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question1', e.target.value)}>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="1">1</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="2">2</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="3">3</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="4">4</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="5">5</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="6">6</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="7">7</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="8">8</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="9">9</Radio.Button>
                            <Radio.Button style={{ width: '10%', textAlign: 'center' }} value="10">10</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Statistic value="Question : 2" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Statistic value="Why do you give him/her that score?" for="commentToLeader"/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '100%' }}>
                        <textarea id="commentToLeader" name="commentToLeader" rows="4" style={{ width: '100%' }} onChange={(e) => handleRadioChange('question2', e.target.value)}></textarea>
                    </Col>
                </Row>
                <p>*This evaluation does not affect your score.</p>
            </Card>
            <br />
            <div className="footer">
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={handleSubmit} disabled={isEvaluating}>Submit</button>
            </div>
        </div>
    )
}