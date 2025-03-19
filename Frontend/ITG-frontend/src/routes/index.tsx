import React from "react";
import pathConstants from "./pathConstants";
import { RouteObject } from "react-router-dom";
import Settings from "@/pages/Settings";
import Company from "@/pages/Company";

const Home = React.lazy(() => import("../pages/Home"))
const About = React.lazy(() => import("../pages/About"))
const JobDescription = React.lazy(() => import("../pages/Job"))
const routes:RouteObject[] =  [
    {path: pathConstants.Home, element: <Home/>},
    {path: "/home", element: <Home/>},
    {path: "/company", element: <Company/>},
    {path: "/settings", element: <Settings/>},
    {path:pathConstants.JobDescription, element: <JobDescription/>},
    {path: pathConstants.About,  element: <About/>}
]

export default routes;