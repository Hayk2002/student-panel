import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const PublicRoute = lazy(() => import("./publicRoute"));
const PrivateRoute = lazy(() => import("./privateRoute"));
const HomePage = lazy(() => import("pages/Home"));
const AboutUsPage = lazy(() => import("pages/AboutUs"));
const ApplicantPage = lazy(() => import("pages/Applicant"));
const ProfilePage = lazy(() => import("pages/Profile"));
const StudentsListPage = lazy(() => import("pages/StudentsList"));
const TeachersListPage = lazy(() => import("pages/TeachersList"));
const ApplicantsListPage = lazy(() => import("pages/ApplicantsList"));
const GradeBookPage = lazy(() => import("pages/GradeBook"));
const DiaryPage = lazy(() => import("pages/Diary"));

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path='/' element={<PublicRoute />}>
                <Route index element={<HomePage />} />
                <Route path='about-us' element={<AboutUsPage />} />
                <Route path='applicant' element={<ApplicantPage />} />
            </Route>
            <Route path='/' element={<PrivateRoute />}>
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/students' element={<StudentsListPage />} />
                <Route path='/teachers' element={<TeachersListPage />} />
                <Route path='/applicants' element={<ApplicantsListPage />} />
                <Route path='/gradeBook' element={<GradeBookPage />} />
                <Route path='/diary' element={<DiaryPage />} />
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;
