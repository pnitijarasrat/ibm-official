import React from "react";
import { Link } from 'react-router-dom'
import './Nav.css'
import { useAuth } from "../Authenticate/AuthProvider";

export default function Nav() {
    const auth = useAuth()

    return (
        <nav className="Nav">
            <div className="logo">IBM&CO</div>
            {
                auth.token ?
                    <ul>
                        <Link to={'/'}>Home</Link>
                        <Link to={'/recruit'}>Recruit</Link>
                        <span onClick={() => auth.logOut()}>Log Out</span>
                    </ul>
                    :
                    <ul>
                        <Link to={'/sign-in'}>Log In</Link>
                    </ul>
            }

            {/* <ul>
                <Link to={'/sign-in'}>Log In</Link>
            </ul> */}
        </nav>
    )
}