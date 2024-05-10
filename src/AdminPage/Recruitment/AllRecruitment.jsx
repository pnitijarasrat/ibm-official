import React, { useEffect, useState } from "react";
import { url } from "../../const/url";
import { dataRemap } from "../../function/dataRemap";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import TableView from "./TableView";
import Overview from "./Overview";

export default function AllRecruitment() {
    const [job, setJob] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        setIsLoading(true);
        try {
            const res = await fetch(`${url}job.json`);
            const data = await res.json();
            const jobArray = data ? dataRemap(data) : [];
            setJob(jobArray);
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
                            children: <TableView job={job} isLoading={isLoading} get={fetchData}/>
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
