import React from "react"

export default function Job({
    name,
    desc,
    department,
    period
}) {
    return (
        <div className="job-card">
            <div style={{ width: '80%' }}>
                <div className="job-title">
                    <h2>
                        <span>{department}</span>
                        <span>{" - "}</span>
                        <span>{name}</span>
                    </h2>
                    <span>
                        {period}
                    </span>
                </div>
                <p className="job-desc">{desc}</p>
            </div>
            <div className="recruit-action">
                <a href={'/link'} target="_blank" rel="noopener noreferrer">
                    <button>Apply</button>
                </a>
            </div>
        </div>
    )
}
