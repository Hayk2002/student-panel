import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";

const PublicRoute = lazy(() => import("./publicRoute"));
const PrivateRoute = lazy(() => import("./privateRoute"));
const HomePage = lazy(() => import("pages/Home"));

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path='/' element={<PublicRoute />}>
                <Route index element={<HomePage />} />
            </Route>
            <Route path='/' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;
