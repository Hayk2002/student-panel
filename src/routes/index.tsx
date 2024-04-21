import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("pages/Home"));

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<HomePage/>} />
    </Routes>
);

export default AppRoutes;
