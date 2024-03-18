import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { isAdmin } from "../function/role";

export default function AdminRoute() {

    const user = useAuth()
    if (!isAdmin(user.role)) return <Navigate to="/" />
    return <Outlet />
}