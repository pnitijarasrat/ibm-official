import { useContext, createContext } from "react";
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
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("site") || "")
    const [role, setRole] = useState(null)
    const { error, contextHolder } = MessageAPI()

    const navigate = useNavigate()

    const logIn = async (logInForm) => {
        setIsLogging(true)
        const { username, password } = logInForm.getFieldsValue()
        try {
            const res = await fetch(`${url}account.json`)
            const data = await res.json()
            const accountArray = dataRemap(data)
            setAccount(accountArray)
            const tryUsername = account.filter((acc) => acc.username === username)
            if (tryUsername.length === 0) {
                return error('Incorrect Username')
            }
            if (tryUsername[0].password !== password) {
                return error('Incorrect Password')
            }
            if (tryUsername[0].username === username && tryUsername[0].password === password) {
                setIsError(false)
                setUser(tryUsername[0].user)
                setToken(tryUsername[0].key)
                setRole(tryUsername[0].role)
                localStorage.setItem("site", tryUsername[0].key)
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
        navigate("/sign-in");
    };

    return (
        <>
            {contextHolder}
            <AuthContext.Provider
                value={{ token, user, logIn, logOut, role }}
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