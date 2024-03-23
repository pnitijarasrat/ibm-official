import React, { useEffect, useState } from "react";
import { url } from "../../const/url";
import { dataRemap } from "../../function/dataRemap";
import { Tabs } from "antd";
import TableView from "./TableView";
import Overview from "./Overview";

export default function AllRecruitment() {
  const [job, setJob] = useState([]);
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}job.json`);
      const hisRes = await (fetch(`${url}applyHistory.json`))
      const data = await res.json();
      const hisData = await hisRes.json()
      const jobArray = data ? dataRemap(data) : [];
      const hisArray = hisData ? dataRemap(hisData) : [];
      setJob(jobArray);
      setHistory(hisArray)
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <h1>Job</h1>
      {isLoading ?
        <div>Loading...</div>
        :
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'Table View',
              key: '1',
              children: <TableView job={job} isLoading={isLoading} get={fetchData} history={history} />
            },
            {
              label: 'Overview',
              key: '2',
              children: <Overview job={job} isLoading={isLoading} />,
            },

          ]}
        />
      }
    </div>
  );
}
