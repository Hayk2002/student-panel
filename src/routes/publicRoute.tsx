import React from "react";
import { Outlet } from "react-router-dom";

import { MainContent } from "../shared/styled";
import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";

const PublicRoute = () => (
    <>
        <Header/>
        <MainContent>
            <Outlet/>
        </MainContent>
        <Footer/>
    </>
);

export default PublicRoute;
