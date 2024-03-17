import { useContext, createContext, useEffect } from "react";
import React, { useState } from "react";
import { url } from '../const/url'
import { dataRemap } from '../function/dataRemap'
import { useNavigate } from "react-router-dom";
import MessageAPI from "../Message/Message";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [account, setAccount] = useState([])
    const [isLogging, setIsLogging] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(localStorage.getItem("user".name) || null)
    const [token, setToken] = useState(localStorage.getItem("site") || "")
    const [role, setRole] = useState(localStorage.getItem("role") || null)
    const { error, contextHolder } = MessageAPI()

    const navigate = useNavigate()

    const getFunction = async () => {
        try {
            const res = await fetch(`${url}account.json`)
            const data = await res.json()
            const accountArray = dataRemap(data)
            setAccount(accountArray)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setIsError('Load Fail')
        }
    }

    useEffect(() => {

        getFunction()
    }, [])

    const logIn = async (logInForm) => {
        const { username, password } = logInForm.getFieldsValue()
        try {
            setIsLogging(true)
            const tryUsername = account.filter((acc) => acc.username === username)
            if (tryUsername.length === 0) {
                setIsLogging(false)
                return error('Incorrect Username')
            }
            if (tryUsername[0].password !== password) {
                setIsLogging(false)
                return error('Incorrect Password')
            }
            if (tryUsername[0].username === username && tryUsername[0].password === password) {
                setIsLogging(false)
                setIsError(false)
                setUser(tryUsername[0].user)
                setToken(tryUsername[0].key)
                setRole(tryUsername[0].role)
                localStorage.setItem("site", tryUsername[0].key)
                localStorage.setItem("user", tryUsername[0].name)
                localStorage.setItem("fullName", `${tryUsername[0].firstName} ${tryUsername[0].lastName}`)
                localStorage.setItem("role", tryUsername[0].role)
                navigate('/')
                return
            }
        } catch (e) {
            setIsError(true)
        }
    }

    const logOut = () => {
        setUser(null);
        setToken("");
        setRole(null)
        localStorage.removeItem("site");
        localStorage.removeItem("user")
        localStorage.removeItem("role")
        localStorage.removeItem("fullName")
        navigate("/sign-in");
    };

    return (
        <>
            {contextHolder}
            <AuthContext.Provider
                value={{ token, user, logIn, logOut, role, isLogging, isLoading }}
            >
                {children}
            </AuthContext.Provider>
        </>
    )
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};  