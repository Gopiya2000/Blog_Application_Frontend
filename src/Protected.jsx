import React from 'react'
import jwtDecode from "jwt-decode";
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem("usersToken")
    if (isAuthenticated) {
        const token = jwtDecode(isAuthenticated)
        if(token.id){
        return children
        }
    }
    else {
        return <Navigate to="/" />;
    }
}

export default Protected