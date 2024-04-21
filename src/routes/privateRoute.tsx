import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import AuthUserLayout from "../shared/layouts/AuthUserLayout";

const PrivateRoute = () => {
    const isUserAuthenticated = localStorage.getItem('isUserAuthenticated');

    return isUserAuthenticated ? (
        <>
            <AuthUserLayout>
                <Outlet/>
            </AuthUserLayout>
        </>
    ) : (
        <Navigate to='/'/>
    )
};

export default PrivateRoute;
