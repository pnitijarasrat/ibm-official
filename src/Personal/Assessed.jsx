import React, { useState } from "react";
import { url } from "../const/url";
import { dataRemap } from "../function/dataRemap";
import { Card, Statistic, Row, Col, Radio, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import { getDisplayRole, isAdmin } from "../function/role";
// import "./Personal/Assessed.css"

export default function Evaluation_person() {
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
            let payload;
        if (isAdmin(roleAssessor)) {
            payload = {
                assessor: assessor,
                assessed: assessed_person,
                jobName: jobName,
                roleAssessor: roleAssessor,
                question1: selectedValues.question1*4,
                question2: selectedValues.question2*2,
                question3: selectedValues.question3*3,
                question4: selectedValues.question4*3,
            };
        } else {
            payload = {
                assessor: assessor,
                assessed: assessed_person,
                jobName: jobName,
                roleAssessor: roleAssessor,
                ...selectedValues,
            };
        }

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

    const list_of_question = 
    ["Teamwork and cooraboration",
    "Contribution in the project",
    "Responsibilities in the assigned tasks",
    "Communication and Collaboration skills",
    "Leadership",
    "Willingness to help"]

    const questionCards = list_of_question.map((question, i) => (
        <Card key={i}>
            <Row>
                <Col xs={2} sm={4}>
                    <Statistic value={"Question :" + (i + 1)} />
                </Col>
                <Col xs={24} sm={20}>
                    <Statistic value={question} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} style={{ width: '100%' }}>
                    <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange(`question${i + 1}`, e.target.value)}>
                        <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Lowest</Radio.Button>
                        <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Low</Radio.Button>
                        <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Medium</Radio.Button>
                        <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">High</Radio.Button>
                        <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Highest</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        </Card>
    ));

    return (
        <div className="page-container">
        <h1>Assess to {assessed_person}</h1>
        {isAdmin(roleAssessor) ? (
            <Card>
                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 1" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Results meet the trageted KPI of the project" />
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question1', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Meet below that</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Meet 30-49% of KPI</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Meet 50-59% of KPI</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">Meet 60-79% of KPI</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Meet 80% of KPI</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 2" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Quality of Work (Result)" />
                    </Col>
                </Row>
      
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question2', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="1">Poor</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="2">Need Improvment</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="3">Acceptable</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="4">Good</Radio.Button> 
                            <Radio.Button style={{ width: '20%', textAlign: 'center' }} value="5">Excellent</Radio.Button> 
                        </Radio.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 3" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Efficiency (Delivered Time)" />
                    </Col>
                </Row>
      
                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question3', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="1">Miss deadlines most of the time</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="2">Frequently miss deadlines</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="3">Miss deadlines sometimes</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="4">Usually finished within deadlines</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="5">Deliver tasks on time or ahead schedules</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>

                <Row>
                    <Col xs={2} sm={4}>
                        <Statistic value="Question : 4" />
                    </Col>
                    <Col xs={24} sm={20}>
                        <Statistic value="Skills Rating (Hard or Soft skills depend on that project)" />
                    </Col>
                </Row>

                <Row>
                    <Col xs={24} style={{ width: '100%' }}>
                        <Radio.Group style={{ width: '100%' }} onChange={(e) => handleRadioChange('question4', e.target.value)}>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="1">Lack essential skills and /ndon't even try to complete</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="2">Lack essential skills to complete tasks but have some will to work</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="3">Need lots of help to complete but willing to learn</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="4">Have some struggless but show strong passion & willing ness to learn</Radio.Button>
                            <Radio.Button style={{ width: '20%', textAlign: 'center' , height: 'auto'}} value="5">Be able to apply skills very well</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>




            </Card>
        ) : (
            <>
        {questionCards}
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
            </>
        )}
            <br />
            <div className="footer">
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={handleSubmit} disabled={isEvaluating}>Submit</button>
            </div>

        </div>
    );
}
