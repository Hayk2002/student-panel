import React from 'react';
import AppRoutes from "./routes";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import { MainContent } from "./shared/styled";
import { BrowserRouter } from "react-router-dom";

const App = () => (
    <BrowserRouter>
        <Header/>
        <MainContent>
            <AppRoutes/>
        </MainContent>
        <Footer/>
    </BrowserRouter>
);

export default App;
