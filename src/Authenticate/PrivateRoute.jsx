import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoute() {

    const user = useAuth()
    if (!user.token) return <Navigate to="/sign-in" />
    return <Outlet />
}