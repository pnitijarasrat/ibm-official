import React from "react";
import './LinkRow.css'
import { useAuth } from "../Authenticate/AuthProvider";
import { isAdmin } from "../function/role";

export default function LinkRow({
    id,
    title,
    link
}) {
    const user = useAuth()

    return (
        <div className="link-row">
            <div>{title}</div>
            <div className="gap">
                <a href={link} target="_blank" rel="noreferrer">
                    <button>Open</button>
                </a>
                {isAdmin(user.role) && <button>Delete</button>}
            </div>

        </div>
    )
}