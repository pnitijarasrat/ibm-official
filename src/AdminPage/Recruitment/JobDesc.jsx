import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../const/url";
import { Space, Divider, Row, Col } from "antd";
import { dataRemap } from "../../function/dataRemap";
import { isAdmin } from "../../function/role.js";
import { useAuth } from "../../Authenticate/AuthProvider.jsx";

export default function JobDesc() {
  const [isLoading, setIsLoading] = useState(false);
  const [jobData, setJobData] = useState({});
  const [history, setHistory] = useState([]);
  const [pending, setPending] = useState([]);

  const { jobId } = useParams();
  const user = useAuth();

  const getJobData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}/job/${jobId}.json`);
      const data = await res.json();
      setJobData(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const decline = async (job) => {
    try {
      const res = await fetch(`${url}applyHistory/${job.key}.json`, {
        method: "DELETE",
        body: JSON.stringify(job.key),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        await getJobData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (job) => {
    const payload = {
      ...job,
      status: "approve",
    };
    try {
      const res = await fetch(`${url}applyHistory/${job.key}.json`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (e) {
      console.log(e);
    }
  };

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}applyHistory.json`);
      const data = await res.json();
      let historyArray = [];
      if (data) historyArray = dataRemap(data);
      setHistory(
        historyArray.filter(
          (his) => his.jobId === jobId && his.status === "approve",
        ),
      );
      setPending(
        historyArray.filter(
          (his) => his.jobId === jobId && his.status === "pending",
        ),
      );
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJobData();
    getHistory();
  }, []);

  return (
    <div className="page-container">
      <h1>Project</h1>
      {!isLoading ? (
        <Space direction="vertical">
          <div>Job Title: {jobData.name}</div>
          <div>Job Description: {jobData.desc}</div>
          <div>Job Score: {jobData.score ? jobData.score : 0}</div>
          <div>
            View JD:{" "}
            <a>
              <button>JD</button>
            </a>
          </div>
          <div>
            Owner:{" "}
            {jobData.owner ? `${jobData.owner.id} - ${jobData.owner.name}` : ""}
          </div>
        </Space>
      ) : (
        <div>Loading...</div>
      )}
      <Divider />
      <Space direction="vertical" style={{ width: "100%" }}>
        <h2>
          Project Member [{history.length}/{jobData.memberRequired}]
        </h2>
        {!isLoading ? (
          history.length !== 0 ? (
            history.map((his) => (
              <Row key={his.key} gutter={16} align="middle">
                <Col span={12}>
                  {his.employeeId} - {his.employeeName}
                </Col>
                <Col span={12}>
                  <button disabled>Evaluate</button>
                </Col>
              </Row>
            ))
          ) : (
            <div>No Member</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </Space>
      <Divider />
      {isAdmin(user.role) && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <h2>Pending Request</h2>
          <Space direction="vertical">
            {!isLoading ? (
              pending.length !== 0 ? (
                pending.map((pend) => (
                  <>
                    <Row key={pend.key} gutter={16} align="middle">
                      <Col span={12}>
                        <div>
                          {pend.employeeId} - {pend.employeeName}
                        </div>
                        <div>Message: {pend.cv}</div>
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
              ) : (
                <div>No Member</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </Space>
        </Space>
      )}
    </div>
  );
}
