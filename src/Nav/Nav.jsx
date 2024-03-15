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
                        <button onClick={() => auth.logOut()}>Log Out</button>
                        <span className="nav-user">{auth.user}</span>
                    </ul>
                    :
                    <ul>
                    </ul>
            }

            {/* <ul>
                <Link to={'/sign-in'}>Log In</Link>
            </ul> */}
        </nav>
    )
}