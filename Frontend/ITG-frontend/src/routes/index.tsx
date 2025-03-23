import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import("../pages/Home"))
const Company = React.lazy(() => import("../pages/Company"))
const About = React.lazy(() => import("../pages/About"))
const JobDescription = React.lazy(() => import("../pages/Job"))
const SignUp = React.lazy(() => import("../pages/SignUp"))
const Settings = React.lazy(() => import("../pages/Settings"))
const Login = React.lazy(() => import("../pages/Login"))
const routes: RouteObject[] = [
    { path: pathConstants.Home, element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/company", element: <Company /> },
    { path: "/settings", element: <Settings /> },
    { path: pathConstants.JobDescription, element: <JobDescription /> },
    { path: pathConstants.About, element: <About /> }
]

export const landingPageRoutes: RouteObject[] = [
    { path: pathConstants.SignUp, element: <SignUp /> },
    { path: pathConstants.Login, element: <Login /> }
]

export default routes;