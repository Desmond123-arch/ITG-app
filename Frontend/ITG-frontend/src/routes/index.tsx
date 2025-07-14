import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import JobListings from "@/pages/JobListings";

const Home = React.lazy(() => import("../pages/Home"))
const Company = React.lazy(() => import("../pages/Company"))
const About = React.lazy(() => import("../pages/About"))
const JobDescription = React.lazy(() => import("../pages/Job"))
const SignUp = React.lazy(() => import("../pages/SignUp"))
const Settings = React.lazy(() => import("../pages/Settings"))
const Login = React.lazy(() => import("../pages/Login"))
const Profile = React.lazy(() => import("../pages/Profile"))
const CompanyAbout = React.lazy(() => import("../pages/CompanyAbout"))
const PostJob = React.lazy(() => import("../pages/PostJob"))
const AdminVerify = React.lazy(() => import("../pages/AdminVerify"))
const protectedRoutes: RouteObject[] = [
    { path: pathConstants.Home, element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: pathConstants.CompanyAbout, element: <CompanyAbout /> },
    { path: `${pathConstants.Company}/`, element: <Company /> },
    { path: pathConstants.Company, element: <Company /> },
    { path: "/settings", element: <Settings /> },
    { path: "/profile", element: <Profile /> },
    { path: "/job_listings", element: <JobListings /> },
    { path: pathConstants.JobDescription, element: <JobDescription /> },
    { path: pathConstants.About, element: <About /> },
    { path: pathConstants.PostJob, element: <PostJob/>},
    { path: pathConstants.AdminVerify, element: <AdminVerify/>}
];

const routes: RouteObject[] = protectedRoutes.map(route => ({
    ...route,
    element: <ProtectedRoute>{route.element as JSX.Element}</ProtectedRoute>
}));

export const landingPageRoutes: RouteObject[] = [
    { path: pathConstants.SignUp, element: <SignUp /> },
    { path: pathConstants.Login, element: <Login /> }
];

export default routes;
