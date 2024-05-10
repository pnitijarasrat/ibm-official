import React, { useState } from "react";
import { url } from "../../const/url";
import { dataRemap } from "../../function/dataRemap";
import { Card, Statistic, Row, Col, Radio, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate

export default function Assessed() {
    const { assessed_person, jobName, userId, assessor } = useParams();
    const navigate = useNavigate()
    const [isEvaluating, setIsEvaluating] = useState(false)
    const [roleAssessor, setRoleAssessor] = useState(null); // Initialize with null or default value

    const [selectedValues, setSelectedValues] = useState({
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        question6: '',
        question7: ''
    });

    const handleSubmit = async () => {
        setIsEvaluating(true);
        try {
            const payload = {
                assessor: assessor,
                assessed: assessed_person,
                jobName: jobName,
                roleAssessor: roleAssessor,
                ...selectedValues
            };

            const response = await fetch(`${url}evaluation.json`, {
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
                navigate(`/recruit/${jobName}/${userId}`);
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
            console.log("Account Data:", data);
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

    return (
        <div className="page-container">
        <h1>Assess to {assessed_person}</h1>
            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 1" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Teamwork and cooraboration" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question1', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 2" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Contribution in the project" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question2', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 3" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Responsibilities in the assigned tasks" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question3', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 4" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Communication and Collaboration skills" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question4', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 5" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Leadership" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question5', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 6" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Willingness to help" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question6', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 7" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="If these are other projects, I will choos this guy to be as a partner for the group" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question7', e.target.value)}>
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
            </Card>

            <Button onClick={handleSubmit} disabled={isEvaluating}>Submit</Button>
        </div>
    );
}
