import React from "react";
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div className="page-container">
            <h1>Announcement</h1>
            <p>We are recruiting! <Link to={'/recruit'}>CLICK!</Link></p>
        </div>
    )
}