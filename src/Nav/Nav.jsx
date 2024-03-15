import React from "react";
import { Link } from 'react-router-dom'
import './Nav.css'

export default function Nav() {

    return (
        <nav className="Nav">
            <div className="logo">IBM&CO</div>
            <ul>
                <Link to={'/'}>Home</Link>
                <Link to={'/recruit'}>Recruit</Link>
            </ul>
        </nav>
    )
}